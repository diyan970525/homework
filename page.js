//退出事件
$(".quit").on("click", function () {
  if (confirm("是否退出")) {
    window.location.href = "./login.html";
  }
});
/* 添加用户 */
$("#affire").on("click", function () {
  $("#affire").attr("data-dismiss", "modal");
  $.get(
    "http://localhost:6060/add",
    {
      username: $("#username").val(),
      password: $("#password").val(),
      age: $("#age").val(),
      sex: $("#sex").val(),
      identity: $("#identity").val(),
      natives: $("#natives").val(),
      mailbox: $("#mailbox").val(),
      phone: $("#phone").val(),
    },
    function (res) {
      if (res.status == 1) {
        show();
      }
    }
  );
});
//shou函数 页面渲染
function show() {
  $("tbody").empty();
  $.get("http:localhost:6060/show", {}, function (res) {
    res.forEach((item) => {
      $("<tr/>")
        .html(
          `
          <td>${item.username}</td>
          <td>${item.sex}</td>
          <td>${item.age}</td>
          <td>${item.natives}</td>
          <td>${item.identity}</td>
          <td>${item.mailbox}</td>
          <td>${item.phone}</td>
          <td>
            <button
              class="modification"
              data-toggle="modal"
              data-target="#myModal1"
              id="${item._id}"
              onclick="xiu(this)"
            >
              <span class="glyphicon glyphicon-pencil"></span>
            </button>
            <button
              class="deletes"
              id="${item._id}"
              onclick="del(this)"
            >
              <span class="glyphicon glyphicon-trash"></span>
            </button>
          </td>

          `
        )
        .appendTo($("tbody"));
    });
  });
  $("#username").val("");
  $("#password").val("");
  $("#age").val("");
  $("#sex").val("");
  $("#identity").val("");
  $("#natives").val("");
  $("#mailbox").val("");
  $("#phone").val("");
}
show();
/* 删除事件 */
function del(ele) {
  let id = $(ele).attr("id");
  $.get("http://localhost:6060/del", {id}, function (res) {
    if (res.status == 1) {
      show();
    }
  });
}
/* 修改反显 */
function xiu(ele) {
  let id = $(ele).attr("id");
  localStorage.setItem("id", id);
  $.get("http://localhost:6060/xiu", {id}, function (res) {
    $("#username1").val(res[0].username);
    $("#sex1").val(res[0].sex);
    $("#age1").val(res[0].age);
    $("#natives1").val(res[0].natives);
    $("#identity1").val(res[0].identity);
    $("#mailbox1").val(res[0].mailbox);
    $("#phone1").val(res[0].phone);
  });
}
/* 确认修改 */
$("#affire1").on("click", function () {
  let id = localStorage.getItem("id");
  $.get(
    "http://localhost:6060/gai",
    {
      id,

      age: $("#age1").val(),
      natives: $("#natives1").val(),
      mailbox: $("#mailbox1").val(),
      phone: $("#phone1").val(),
    },
    function (res) {
      if (res.status == 1) {
        show();
      }
    }
  );
});
