var API = "https://www.lingq.com/api", API_V2 = API + '/v2/', API_V3 = API + '/v3/', BETA;
var locale = (navigator.language || navigator.userLanguage).split('-')[0],
    i18n = new Lang();

chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  var articleURL = tabs[0].url,
      articleTitle = tabs[0].title,
      articleDescr = null,
      articleImage = null,
      isNetflix = articleURL.match(/^https:\/\/www\.netflix\.com\/watch\/([0-9]+)/),
      isYoutube = articleURL.match(/^https:\/\/www\.youtube\.com\/watch/);

  var cur = $('<span/>').addClass('cursor').text('|'), cur_shown = true;

  $('.title').text(articleTitle.substring(0, 120)).append(cur).focus(
    function(){cur.remove()}).blur(function(){$(this).append(cur)});

  setInterval(() => {
    if (cur_shown) {
      cur.css('opacity', 0);
      cur_shown = false;
    } else {
      cur.css('opacity', 1);
      cur_shown = true;
    }
  }, 220);

  /* Disable internal links */
  $('a').attr('target', '_blank').on('click', function(){
    window.setTimeout(function(){window.close()}, 200);
  });

  /* Localization */
  var r = $.ajax({url: 'i18n.json', dataType: 'json', async: false});
  for (const [l, d] of Object.entries(r.responseJSON)) i18n.pack[l] = {token: d};

  function doit(selectedText = null) {
    /* Identify user */
    $.getJSON(API_V2 + 'profiles/', function(data){
      chrome.cookies.get({url: API_V2, name: 'csrftoken'}, function(cookie){
        var profile = data.results[0],
          languages = $('select[name=language]'),
          courses = $('select[name=course]');

        /* Personalize */
        if (!(profile.locale in i18n.pack)) profile.locale = 'en';
        var dir = ['ar', 'fa', 'he'].includes(profile.locale) ? 'rtl' : 'ltr';
        $('h2').data('lang-default-data', {'name': profile.username});
        $('html').attr('dir', dir);
        i18n.init({defaultLang: 'en', currentLang: profile.locale, disableLog: true});

        var tags = $('select[name=tags]').select2({
            dir: dir,
            placeholder: i18n.translate('import_tags_add', profile.locale),
            tags: true,
            ajax: {
              url: API_V2 + 'lesson-tags/',
              dataType: 'json',
              delay: 250,
              data: function (params) {
                return {
                  q: params.term,
                  page: params.page,
                  page_size: 10,
                };
              },
              processResults: function (data, params) {
                var items = [];
                $.map(data.results, function(item){ items.push({id: item.title, text: item.title}) });

                return {
                  results: items,
                  pagination: {more: data.next != null}
                };
              },
              cache: true
            }
          });

        BETA = profile.is_beta_tester;
        // if (BETA) $('.beta').removeClass('hidden');

        if (selectedText && selectedText.text) $('.warning').removeClass("hidden");

        /* AJAX settings */
        $.ajaxSetup({
          beforeSend: function(xhr, settings) {
            if (/^(POST|PUT|PATCH)$/.test(settings.type) && settings.url.indexOf(API) === 0)
              xhr.setRequestHeader("X-CSRFToken", cookie.value);
          },
          error: function(xhr) {
            if (xhr.status > 0) {
              var errors = [];
              $.map(xhr.responseJSON, function(val, key){ errors.push((key ? key + ': ' : '') + val) });
              showError(errors.join('<br/>'));
            }
          }
        });

        var store = function(params) {
            $.ajax({
              url: API_V3 + languages.val() + '/lessons/import/',
              data: JSON.stringify(params),
              type: 'POST',
              dataType: 'json',
              contentType: 'application/json',
              success: showSuccess
            });
        };

        /* Import */
        $('button[name="import"]').on('click', function(){
          $('#import_start').addClass("hidden");
          $('#import_progress').removeClass("hidden");

          cur.remove();
          var params = {
                url: articleURL,
                title: $('.title').text(),
                tags: tags.val(),
                source: "Chrome",
                save: true
              },
              course = parseInt(courses.val(), 10);

          if (selectedText && selectedText.text && $('input[name="seltext"]:checked').val() === 'yes') {
            params['text'] = selectedText.text;
            params['image'] = selectedText.image;
          }

          if (course && course > 0) params.collection = course
          else if (course) params.collection_title = $('input[name=course_new]').val();

          if (isNetflix) {
            /* Download netflix subs and push to LingQ */
            let lang = languages.val();
            switch(lang) {
              case 'hk':
                lang = 'zh-t';
                break;
              case 'hrv':
                lang = 'hr';
                break;
              case 'srp':
                lang = 'sr';
                break;
              case 'tl':
                lang = 'fil';
                break;
            }
            chrome.tabs.sendMessage(tabs[0].id, {act: "GetNetflixSubs", lang: lang},
              function(data) {
                if (data === undefined || !data.success) {
                  let error = i18n.translate('error_no_captions', profile.locale) + " ";
                  if (data && data.langs)
                    error += i18n.translate('error_languages', profile.locale) + " " + data.langs;
                  return showError(error);
                }
                let form_data = new FormData();
                params['file'] = new File([data.subs], "subs.vtt", {type: "text/vtt"});
                params['title'] = $('.title').text();
                if (articleDescr) params['description'] = articleDescr;
                if (articleImage) params['external_image'] = articleImage;
                for (let key in params) form_data.append(key, params[key]);
                $.ajax({
                  url: API_V3 + languages.val() + '/lessons/import/',
                  data: form_data,
                  type: 'POST',
                  processData: false,
                  contentType: false,
                  success: showSuccess
                });
            });

          } else if (isYoutube) {
            /* Download Youtube source page */
            $.get(articleURL, function(data) {
              params['extra'] = {ytpage: data, ytdebug: false};
              store(params);
            });

          } else {
            /* Import lesson from URL */
            store(params);
          }

          return false;
        });

        chrome.storage.local.get('language', function(opts){
          /* Fetch languages */
          $.getJSON(API_V2 + 'contexts/', function(data){
            $.map(data.results, function(obj){
              var lang = i18n.translate(obj.language.title, profile.locale);
              languages.append(
                $('<option class="language-'+obj.language.code+'"></option>')
                .attr('value', obj.language.code)
                .prop('selected', opts.hasOwnProperty('language') && opts.language === obj.language.code)
                .text(lang + (obj.language.knownWords ? ' (' + obj.language.knownWords + ')' : '')))
            });
            /* Fetch language courses */
            languages.on('change', function(){
              var lang = $(this).val(),
                sDef = i18n.translate('default', profile.locale),
                sNew = i18n.translate('new_course', profile.locale);
              courses.empty().append('<option value="">Loading...</option>');
              chrome.storage.local.set({'language': lang});
              $(':input').prop('disabled', true);
              $('.flag').attr('class', 'flag').addClass(lang);
              $.getJSON(API_V2 + this.value + '/collections/recent/', function(data){
                var ckey = 'course_' + languages.val();
                chrome.storage.local.get(ckey, function(opts){
                  courses.empty().append('<option value="">' + sDef + '</option>');
                  $.map(data.results, function(obj){
                    courses.append($
                      ('<option/>')
                      .attr('value', obj.id)
                      .prop('selected', opts.hasOwnProperty(ckey) && opts[ckey] === obj.id)
                      .text(obj.title));
                  });
                  courses.append('<option value="-1">' + sNew + '</option>');
                  $(':input').prop('disabled', false);
                  $('#import_start').removeClass("hidden");
                  $('#info').addClass("hidden");
                });
              });
            }).trigger('change');
            courses.on('change', function(){
              var obj = {}
                  cid = parseInt($(this).val(), 10);
              if (cid == -1) {
                $('#course_new').slideDown(200).focus();
              } else if (isNaN(cid)) {
                chrome.storage.local.remove('course_' + languages.val());
              } else {
                obj['course_' + languages.val()] = parseInt($(this).val(), 10)
                chrome.storage.local.set(obj);
                $('#course_new').slideUp(200).val('');
              }
            });
          });
        });

      });

    }).fail(function(xhr){
      /* Unauthorized or API error */
      $('#info').hide();
      if (xhr.status == 401) $('#login').removeClass("hidden");
      else showError(xhr.statusText);
    });
  }

  if (isNetflix)
    chrome.tabs.sendMessage(tabs[0].id, {act: "GetNetflixInfo"}, function(data) {
      /* Update netflix properties */
      if (data) {
        if (data.url) articleURL = data.url;
        if (data.image) articleImage = data.image;
        if (data.descr) articleDescr = data.descr;
        if (data.title) {
          articleTitle = data.title;
          $('.title').text(articleTitle);
        }
      }
      doit();
    });
  else
    chrome.scripting.executeScript({
      target: {tabId: tabs[0].id},
      func: getSelectionText
    }).then(res => doit(res[0].result));

});

function showSuccess(data){
  $('#import_progress').addClass("hidden");
  $('#import_done').removeClass("hidden");
  if (data.lessonURL) {
    $('.lesson_url').attr('href', data.lessonURL);
  }
}

function showError(message){
  $('body>div').addClass("hidden");
  $('#error').removeClass("hidden").find('.error').text(message);
}

function getSelectionText() {
    let text = null, image = null;
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    try {
      image = document.querySelectorAll('meta[property="og:image"]')[0].content
    } catch(e) {}
    return {text: text, image: image};
}
