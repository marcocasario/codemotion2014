/* Main functions */

//check if is not null
function isNotNull( value ){
    return ( typeof value !== 'undefined' && value !== null );
}

//show element
function show( dom ){
  if( isNotNull(dom) && typeof dom === 'object'){
    dom.removeClass('hide');
  }
}

//hide element
function hide( dom ){
  if( isNotNull(dom) && typeof dom === 'object'){
    dom.addClass('hide');
  }  
}