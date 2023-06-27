const content_blog = document.getElementById("Export-blog");
fetch('/data/data.json').then(response => response.json()).then(data =>{
    data.details.forEach(haha =>{
            content_blog.innerHTML += "<li>" + haha.name +"<ul><li>"
            +"type:  "+ haha.type +"</li>"
            +"<li> ingredientts: "+ haha.descript.ingredientts + "</li>"
            +"<li> allergens: " + haha.descript.allergens +"</li>"
            +"<li> weight: " + haha.descript.weight + "</li>"
            +"<li> dimensions: " + haha.descript.dimensions + "</li>"
            +"</ul>"
            + "</li>"
    })
})

const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    var com =document.getElementById("Comment");
    var name=document.getElementById("name*");
    var getcomment = document.getElementById("textcomment");
    var email = document.getElementById("email*");
    com.style.display="block";
    var check = document.getElementById("check--box");
    var savename =document.getElementById("SaveName");

    if (check.checked){
       name.style.display ="none";
       email.style.display= "none";
       document.getElementById("HidenName").style.display = "none";
       document.getElementById("HidenEmail").style.display = "none";
       savename.style.display ="none";
       check.style.display = "none";
    }
    localStorage.GetName = name.value;
    localStorage.GetEmail = email.value;
     // Ngăn chặn trình duyệt gửi form đến một trang khác
    event.preventDefault();
    // Tạo một phần tử comment mới
    var comment = document.createElement("p");
    var BinhLuan = getcomment.value;
    comment.textContent =  localStorage.GetName +"-"+ localStorage.GetEmail+": " + BinhLuan;
  
    // Thêm comment vào phần tử chứa các comment
    com.appendChild(comment);

    BinhLuan="";
    getcomment.value="";
  });