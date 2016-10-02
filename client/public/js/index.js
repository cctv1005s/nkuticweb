new paneSwitch('.left-page');

$('[data-nk-article]').click(function(e) {
   var id = $(e.currentTarget).attr('data-article-id');
   window.location.href = "/blog?action=show&articleid="+id;
});