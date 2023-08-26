import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings={
    databaseURL: "https://testplayground-68150-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSettings)
const database=getDatabase(app)
const shoplistInDB=ref(database,"shopping-list")

const input_field = document.getElementById("input-field")
const btn_add = document.getElementById("add-button")
const ul= document.getElementById("shopping_list")

btn_add.addEventListener("click",function(){
    let input=input_field.value
    push(shoplistInDB,input)
    clearInputField()
})

//ambil data dari database
onValue(shoplistInDB,function(snapshot){
    //object.value -> ubah object jadi array
    if(snapshot.exists()){
        let lists=Object.entries(snapshot.val())
        clearShoppingList()
        for(let i=0;i<lists.length;i++){
            let currentList=lists[i]
            let currentListID=currentList[0]
            let currentListValue=currentList[1]
            renderShoppingList(currentList)
        }
    }else{
        ul.innerHTML="No items here.. yet"
    }
})

function clearShoppingList(){
    ul.innerHTML=""
}

function clearInputField(){
    input_field.value=""
}

function renderShoppingList(list){
    let listID=list[0]
    let listValue=list[1]
    let li=document.createElement("li")
    li.textContent=listValue

    li.addEventListener("dblclick",function(){
        let exactLocationItemInDB = ref(database,`shopping-list/${listID}`)
        remove(exactLocationItemInDB)
    })
    ul.append(li)
}