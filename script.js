// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase,ref,set,onChildAdded } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyDF-t6uQ4nljN2x60rhwQI16uiJ35RRgqI",
    authDomain: "todoapp-5679e.firebaseapp.com",
    projectId: "todoapp-5679e",
    storageBucket: "todoapp-5679e.appspot.com",
    messagingSenderId: "670198012355",
    appId: "1:670198012355:web:a9b7ba28e1c6ece3b64576",
    measurementId: "G-QCCQWY7NJV"
};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const database = getDatabase();



var inp = document.getElementById('user-Inp')
var table = document.getElementById("content");

var obj = {};

window.add = function () {


    var tr = document.createElement('tr');
    var td_1 = document.createElement('th');
    var td_2 = document.createElement('td');
    // var td_3 = document.createElement('td');
    var edit_btn = document.createElement('button');
    var delet_btn = document.createElement('button');
    edit_btn.setAttribute("onClick", "edit(this)")
    delet_btn.setAttribute("onclick", "delet(this)")
    // edit_btn.className = "edit-btn1"
    // delet_btn.className = "delet_btn2"
    // console.log(edit_btn)
    var inp_text = document.createTextNode(inp.value)
    var edit_text = document.createTextNode('Edit');
    var delet_text = document.createTextNode('Delete');
    // td_1.className = "user_text";
    // td_2.className = "edit-btn";
    edit_btn.setAttribute("class","edit-btn1");
    delet_btn.setAttribute("class","delet_btn2");
    // td_3.className = "delet-btn";
    if (inp_text.length > 0) {
        td_1.appendChild(inp_text);
        edit_btn.appendChild(edit_text)
        delet_btn.appendChild(delet_text)
        td_2.appendChild(edit_btn);
        td_2.appendChild(delet_btn);
        // td_3.appendChild(delet_btn);
        tr.appendChild(td_1);
        tr.appendChild(td_2);
        // tr.appendChild(td_3);
        table.appendChild(tr);
        obj.item=inp.value;
        inp.value = ""
        obj.id = Math.random().toString().slice(2);
        let reference = ref(database, `list/${obj.id}/`);
        set(reference, obj);
    }
    else {
        alert('please enter data')
    }


}

window.delet_All = function () {
    table.innerHTML = ""
}
window.delet = function (d) {
    var text_del = d.parentNode.previousSibling.innerHTML;
    let reference = ref(database,"list/")
    let arr = [];
    onChildAdded(reference,function(data){
        arr.push(data.val())
        for(var i =0;i<arr.length;i++){
            if(arr[i].item==text_del){
                console.log(arr[i].item)
                let position = ref(database,`list/${d}/`);
                remove(position)
            }
            console.log(arr[i].id)
        }
    })
    d.parentNode.parentNode.remove()
    
}
window.edit = function (d) {
    var x = d.parentNode.previousSibling.innerHTML

    // console.log(x)
    edit_User_text = prompt("enter a data", x);

    if (edit_User_text == "") {
        alert("please enter a data");
    }
    else {
        d.parentNode.previousSibling.innerHTML = edit_User_text
    }


}