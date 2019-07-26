/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/



//global variables that are used in multiple functions
const listItem = document.querySelectorAll('li.student-item');
const itemPerPage = 10;
let input;

//showPage function calculates the index of the list to display depending on the page number
function showPage( list, page )
{
  let startIndex = (page * itemPerPage) - itemPerPage;
  let endIndex = page * itemPerPage;
  for( let i = 0; i < list.length; i++ )
  {
    if( i < startIndex || i >= endIndex)
    {
      list[i].style.display = "none";
    }
    else
    {
      list[i].style.display = "list-item";
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
  let pageNumber = document.querySelector("div.pagination");
  pageNumber.addEventListener("click" ,  function()
  {
    showPage( list, event.target.textContent );
    let link = document.querySelectorAll ("div.pagination > ul > li > a");
    for( i = 0; i < link.length; i++)
        {
          link[i].className = "";
        }
    event.target.className = "active";
  });
}

//function that creates a search bar at the top of the list
function searchBar(){
  let searchBar = document.createElement('input');
  let div = document.createElement('div');
  let studentList = document.querySelector('div.page-header');
  let addDiv = studentList.insertBefore(div, studentList.firstChild);
  input = addDiv.insertBefore(searchBar, addDiv.firstChild);
  div.className = "student-search";
  input.type = "text";
  input.placeholder = "Search";
  input.onkeyup = search;
}

//the search function which hides all student names not meeting the search query and running appendPageLinks and showPage with the new list of students meeting the search criteria
function search(){
  let searchResult = [];
  for( var i = 0; i < listItem.length; i++)
  {
    let names = listItem[i].querySelector('h3');
    if( names.textContent.indexOf(input.value) > -1)
  {
    searchResult.push(listItem[i]);
  }
    else
    {
    listItem[i].style.display = "none";
    }
  }
  let noticeCheck = document.querySelector('ul.student-list > p');
  if(noticeCheck !== null)
  {
    noticeCheck.remove();
  }
  if(searchResult === undefined || searchResult.length == 0)
  {
    let notice = document.querySelector('ul.student-list');
    let p = document.createElement('p');
    notice.appendChild(p);
    p.textContent = "There are no results!";
  }
  let div = document.querySelector('div.pagination');
  div.remove();
  appendPageLinks( searchResult );
  showPage( searchResult, 1 );

}

//running the function for the first time.
showPage( listItem, 1 );
appendPageLinks(listItem);
searchBar();
