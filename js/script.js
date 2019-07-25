/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/



//global variables that are used in multiple functions
const listItem = document.querySelectorAll('li.student-item');
const itemPerPage = 10;

//showPage function calculates the index of the list to display depending on the page number
function showPage( list, page ){
  let startIndex = (page * itemPerPage) - itemPerPage;
  let endIndex = page * itemPerPage;
  for( let i = 0; i < list.length; i++ ){
    if( i < startIndex || i > endIndex){
      listItem[i].style.display = "none";
    }
    else{
      listItem[i].style.display = "list-item";
    }
  }
}

//the appendChildLinks function creates page buttons based on the number of items in the list and then uses addEventListener to change pages when a number is clicked
function appendPageLinks(list)
{
  let numberOfPages = Math.ceil( list.length / itemPerPage );
  let parentDiv = document.querySelector('div.page');
  let div = document.createElement('div');
  let ul = document.createElement('ul');

  parentDiv.appendChild(div);
  div.className = "pagination";
  div.appendChild(ul);
  for( let i = 1; i <= numberOfPages; i ++ )
  {
    let li = document.createElement('li');
    let a = document.createElement('a');
    ul.appendChild(li);
    li.appendChild(a);
    a.href = "#";
    a.textContent = i;
    if( i == 1 )
    {
      a.className = "active";
    }
  }
  let pageNumber = document.querySelectorAll("div.pagination > ul > li > a")
  for( i = 0; i < pageNumber.length; i++)
  {
    pageNumber[i].addEventListener("click" ,  function()
    {
      for( i = 0; i < pageNumber.length; i++)
      {
        pageNumber[i].className = "";
      }
      event.target.className = "active";
      showPage( listItem, event.target.textContent );
    });
  }
}

//running the function for the first time.
showPage( listItem, 1 );
appendPageLinks(listItem);
