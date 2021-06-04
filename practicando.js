tippy('#myButton', {
    content: `<div>
                <div class = "thumb">
                    <img src = ""./src/img/soul.jpeg>
                </div>
                <div class = "informacion-tooltip">
                    <h2> Soul</h2>
                    <p>Hola</p>
                </div>
            </div>`,
    allowHTML: true,
    placement: 'right-end',
  });

  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
 var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})