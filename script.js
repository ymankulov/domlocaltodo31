// setItem(key, value) – сохранить пару ключ/значение.
// getItem(key) – получить данные по ключу key.
// removeItem(key) – удалить данные с ключом key.
// clear() – удалить всё.
// key(index) – получить ключ на заданной позиции.
// length – количество элементов в хранилище.
// JSON.stringify() - баардык тип данныйды срока турундо жуктоп берет
// JSON.parse() - Баштапкы кылыбына алып келет
// const addUser = document.querySelector("button")
// const text = document.querySelector("h1")
// localStorage.setItem("task", JSON.stringify({ id: 1, name: "Bill" }));
// addUser.addEventListener("click", () => {
//     let user = JSON.parse(localStorage.getItem("task"))
//     text.innerHTML = user.name
// })

//////////////////////
const inputUrl = document.querySelector(".inputUrl");
const inputName = document.querySelector(".inputName");
const inputPrice = document.querySelector(".inputPrice");
const add = document.querySelector(".add");
const list = document.querySelector(".list");
const table = document.querySelector(".table");
const info = document.querySelector(".info");

function addProduct() {
  let product = document.querySelectorAll(".product");
  let name = Array.from(product).some((el) => el.innerText === inputName.value);

  if (
    inputName.value.trim() === "" ||
    inputUrl.value.trim() === "" ||
    inputPrice.value.trim() === ""
  ) {
    alert("error!");
  } else if (name) {
    alert("404");
    inputName.value = "";
    inputPrice.value = "";
    inputUrl.value = "";
  } else {
    let result = JSON.parse(localStorage.getItem("product")) || [];
    let newProduct = {
      id: result.length ? result[result.length - 1].id + 1 : 1,
      //   id: new Date(),
      url: inputUrl.value,
      name: inputName.value,
      price: inputPrice.value,
    };
    let res = [...result, newProduct];
    console.log(res);
    localStorage.setItem("product", JSON.stringify(res));
    readProduct();
  }
}

function readProduct() {
  list.innerHTML = "";
  let result = JSON.parse(localStorage.getItem("product")) || [];

  if (result.length) {
    table.style.opacity = "1";
    info.innerHTML = ""
    result
      .sort((a, b) => a.price - b.price)
      .map((el, idx, arr) => {
        list.innerHTML += `
         <tr>
      <th scope="row">${idx + 1}</th>
      <td>
      <img src="${el.url}" alt="img" width="40"/>
      </td>
      <td class="product">${el.name}</td>
      <td>${el.price} $</td>
      <td>
      <button class="btn btn-danger" onClick="deleteProduct(${
        el.id
      })" >Delete</button>
      </td>
    </tr>`;
      });
  } else {
    table.style.opacity = "0";
    info.innerHTML = `
    <div class="alert alert-success" role="alert">
  This is a success alert—check it out!
</div>  
    `;
  }
  inputUrl.value = "";
  inputName.value = "";
  inputPrice.value = "";
}
function deleteProduct(productId) {
  let result = JSON.parse(localStorage.getItem("product")) || [];
  let deleteRes = result.filter((el) => el.id !== productId);
  localStorage.setItem("product", JSON.stringify(deleteRes));
  readProduct();
}
readProduct();

add.addEventListener("click", () => addProduct());

inputPrice.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addProduct();
  }
});
