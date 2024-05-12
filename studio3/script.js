
  'use strict';

 
  $('#clear').click(function() {
    clearCanvas();
  });
  
  $('#save').click(function(){
    saveImage();
  });

  let colors = ['#000000', '#FFFFFF', '#FF392E', '#2BE389', '#814AFF', '#FFFF00', '#FF8B03', '#1DC1FE'];

  colors.forEach(function(color) {
      let colorBox = $('<div class="colorbox"></div>');
      colorBox.css('background-color', color);
      colorBox.click(function() {
          selectedColor = color;
          $('#selectcolor').val(color);
      });
      $('#colorpalette').append(colorBox);
  });

   function clearCanvas(){
    background(255);
   }

   function saveImage(){
    saveCanvas('myPainting.jpg');
   }


