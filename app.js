function makeWords() {

  var words = [
    {
      text: "html5",
      weight: 12.3
    }, {
      text: "css3",
      weight: 12.5
    }, {
        text: "javascript",
        weight: 13
      }, {
        text: "react.js",
        weight: 9
      }, {
        text: "programming",
        weight: 11
      }, {
        text: "responsive design",
        weight: 10.2
      }, {
        text: "bootstrap",
        weight: 10
      }, {
        text: "es6",
        weight: 9.6
      }, {
        text: "web development",
        weight: 9.7
      }, {
        text: "front-end development",
        weight: 10
      }, {
        text: "vue.js",
        weight: 8
      },  {
        text: "REST API",
        weight: 8
      }, {
        text: "redux",
        weight: 7
      }

  ];
  return words;
}

function makeWordCloud(words) {
  $('.learning-domains').jQCloud(words, {delay: 120});
}

function displayWordCloud() {
  var count = 1;
  $(window).on('scroll', function() {
    var y_scroll_pos = window.pageYOffset;
    var scroll_pos_test = 2700;
    var words = makeWords();
		if (y_scroll_pos > scroll_pos_test && count <= 1) {
			makeWordCloud(words);
			count++;
		}
  });
}

function designForm() {
	$("#my-modal form").addClass("my-form");
}

// $(document).ready(function() {
// 	Typed.new("#writing-text", {
// 		strings: [
// 			"am a Full-Stack Web Developer.", "love everything about code.", "also teach programming to people.", "solve problems."
// 		],
// 		// Optionally use an HTML element to grab strings from (must wrap each string in a <p>)
// 		stringsElement: null,
// 		// typing speed
// 		typeSpeed: 1,
// 		contentType: 'text',
// 		callback: function() {
// 			$("#writing-text").css({"color": "#fff", "background-color": "#C8412B"});
// 		},
// 		preStringTyped: function() {},
// 		onStringTyped: function() {}
// 	});

// 	displayWordCloud();
// })

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false; 
  }

  type() {
    //Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];
    // Check if deleting
    if(this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    // Initial Type Speed
    let typeSpeed = 100;
    if(this.isDeleting) {
      typeSpeed /= 2;
    } 
    
    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make a pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      // Move to the next word
      this.wordIndex++;
      // Pause before typing 
      typeSpeed = 500;
    }
    
    
    
    
    setTimeout(() => this.type(), typeSpeed) 
  }
}

// Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Initiliaze TypeWriter
  new TypeWriter(txtElement, words, wait);
}



displayWordCloud();