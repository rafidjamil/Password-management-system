const Users = [
    { name: "Rafid Jamil", id: "865678865445", password: "rafid123" },
    { name: "Ahmed Alam", id: "098778865445", password: "ahmed123" }
];


if (localStorage.getItem("allusers") === null) {
    localStorage.setItem("allusers", JSON.stringify(Users));
}

// localStorage.setItem("loggedInUser", JSON.stringify(Users));

document.querySelectorAll(".icon-eye").forEach(eye => {
    eye.addEventListener("click", () => {
        const pwField = eye.closest(".field").querySelector(".value");


        if (pwField.classList.contains("pw-hidden")) {
            pwField.textContent = "ahmed123";
            pwField.classList.remove("pw-hidden");
            eye.classList.remove("fa-eye");
            eye.classList.add("fa-eye-slash");
        } else {
            const hiddenText = "•".repeat(pwField.textContent.length);
            pwField.textContent = hiddenText;
            pwField.classList.add("pw-hidden");
            eye.classList.remove("fa-eye-slash");
            eye.classList.add("fa-eye");
        }
    });
});


window.addEventListener("DOMContentLoaded", () => {
    AuthSystem.renderCards();

});


window.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        document.getElementById("user-name").textContent += loggedInUser.name;
    }

});




document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("openModalBtn");
    const closeModalBtn = document.getElementById("closeModalBtn");
    const modal = document.getElementById("myModal");



    openModalBtn.onclick = () => {
        modal.classList.add("show");
    };


    closeModalBtn.onclick = () => {
        modal.classList.remove("show");
    };

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.classList.remove("show");
        }
    };
});
// document.addEventListener("DOMContentLoaded", () => {
//     document.getElementById("login-btn").onclick = registerUser;
// });


// function gt4w4ed(card) {
//     window.onclick = (event) => {
//         if (event.target === modal2) {
//             modal2.classList.remove("show");
//         }
//     };
// }



class UserSystem {
    constructor() {
        this.allUsers = JSON.parse(localStorage.getItem("allusers")) || [];
        this.loggedInUser = null;
    }



    login() {
        const idInput = document.getElementById("atm-id");
        const passInput = document.getElementById("atm-password");

        const enteredId = idInput.value;
        const enteredPass = passInput.value;

        if (!enteredId || !enteredPass) {
            alert("Please fill in both ID and Password fields.");
            return;
        }

        const foundUser = this.allUsers.find(user => user.id === enteredId);

        if (foundUser && foundUser.password === enteredPass) {
            this.loggedInUser = foundUser;
            localStorage.setItem("loggedInUser", JSON.stringify(foundUser));

            window.location.href = "userportal.html";
            // window.addEventListener("DOMContentLoaded", () => {
            //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
            //     if (loggedInUser) {
            //         document.getElementById("user-name").textContent = loggedInUser.name;
            //     }
            // });
        } else {
            alert("Invalid ID or Password. Please try again.");
        }


    }
    logout() {
        // if (confirm("Confirm to logout?")) {
        //     alert("logout!");
        //     localStorage.removeItem("loggedInUser");
        //     window.location.href = "passlogin.html";
        // } else {
        //     alert("Cancel!");
        // }
        if (!confirm("Confirm to logout")) {

            return
        }
        localStorage.removeItem("loggedInUser");
        window.location.href = "passlogin.html";
    }


    decline() {
        document.getElementById("atm-name").value = "";

        document.getElementById("atm-id").value = "";
        document.getElementById("atm-password").value = "";
    }
    registerUser() {
        let r_name = document.getElementById("reg-name").value;
        let r_id = document.getElementById("reg-id").value;
        let r_pass = document.getElementById("reg-password").value;

        if (r_name === "" || r_id === "" || r_pass === "") {
            alert("Fill the complete form before register!");
            return;
        }


        let users = JSON.parse(localStorage.getItem("allusers")) || [];


        let exist = users.find(u => u.id === r_id);
        if (exist) {
            alert("This id already exists!");
            return;
        }


        let newUser = {
            name: r_name,
            id: r_id,
            password: r_pass,

        };


        users.push(newUser);


        localStorage.setItem("allusers", JSON.stringify(users));

        alert("User registered successfully!");
        document.getElementById("reg-name").value = "";
        document.getElementById("reg-id").value = "";
        document.getElementById("reg-password").value = "";
    }


    save() {
        const siteURL = document.getElementById("m-site").value;
        const userName = document.getElementById("m-username").value;
        const userEmail = document.getElementById("m-email").value;
        const userPassword = document.getElementById("m-password").value;

        if (!siteURL || !userName || !userEmail || !userPassword) return;

        const userData = { siteURL, username: userName, email: userEmail, password: userPassword };

        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) return;

        const storageKey = `credentials_${loggedInUser.id}`;
        const existingData = JSON.parse(localStorage.getItem(storageKey)) || [];
        existingData.push(userData);
        localStorage.setItem(storageKey, JSON.stringify(existingData));


        const modal = document.getElementById("myModal");
        modal.classList.remove("show");


        document.getElementById("m-site").value = "";
        document.getElementById("m-username").value = "";
        document.getElementById("m-email").value = "";
        document.getElementById("m-password").value = "";


        renderCards();
    }



    // renderCards() {
    //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    //     if (!loggedInUser) return;

    //     const storageKey = `credentials_${loggedInUser.id}`;
    //     const data = JSON.parse(localStorage.getItem(storageKey)) || [];

    //     const container = document.getElementById("cardContainer");
    //     const template = document.querySelector(".card-item.template");
    //     container.innerHTML = "";

    //     const modal2 = document.getElementById("myModal2");
    //     const siteInput = document.getElementById("m-site2");
    //     const usernameInput = document.getElementById("m-username2");
    //     const emailInput = document.getElementById("m-email2");
    //     const passwordInput = document.getElementById("m-password2");
    //     const saveBtn = document.getElementById("m-save2");
    //     const closeBtn = document.getElementById("closeModalBtn2");

    //     data.forEach((item, index) => {
    //         const card = template.cloneNode(true);
    //         card.classList.remove("template");
    //         card.style.display = "block";

    //         const siteNameEl = card.querySelector(".site-name");
    //         const usernameEl = card.querySelector(".username");
    //         const emailEl = card.querySelector(".email");
    //         const passwordEl = card.querySelector(".password");

    //         siteNameEl.textContent = item.siteURL;
    //         usernameEl.textContent = item.username;
    //         emailEl.textContent = item.email;
    //         passwordEl.setAttribute("data-password", item.password);
    //         passwordEl.textContent = "••••••••";

    //         const eyeIcon = card.querySelector(".icon-eye");
    //         if (eyeIcon) {
    //             eyeIcon.onclick = () => this.togglePassword(eyeIcon);
    //         }

    //         const editBtn = card.querySelector("#openModalBtn2");
    //         if (editBtn) {
    //             editBtn.addEventListener("click", () => {
    //                 modal2.classList.add("show");


    //                 siteInput.value = item.siteURL;
    //                 usernameInput.value = item.username;
    //                 emailInput.value = item.email;
    //                 passwordInput.value = item.password;


    //                 saveBtn.setAttribute("data-index", index);


    //                 saveBtn.onclick = () => {
    //                     const editIndex = parseInt(saveBtn.getAttribute("data-index"));
    //                     if (isNaN(editIndex)) return;


    //                     data[editIndex].siteURL = siteInput.value;
    //                     data[editIndex].username = usernameInput.value;
    //                     data[editIndex].email = emailInput.value;
    //                     data[editIndex].password = passwordInput.value;


    //                     localStorage.setItem(storageKey, JSON.stringify(data));


    //                     siteNameEl.textContent = siteInput.value;
    //                     usernameEl.textContent = usernameInput.value;
    //                     emailEl.textContent = emailInput.value;
    //                     passwordEl.setAttribute("data-password", passwordInput.value);
    //                     passwordEl.textContent = "••••••••";


    //                     modal2.classList.remove("show");


    //                 };
    //             });
    //         }


    //         const deleteBtn = card.querySelector(".icon-delete");
    //         if (deleteBtn) {
    //             deleteBtn.onclick = () => this.delete(index);
    //         }

    //         container.appendChild(card);
    //     });


    //     closeBtn.onclick = () => {
    //         modal2.classList.remove("show");
    //     };
    // }





    // renderCards() {
    //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    //     if (!loggedInUser) return;

    //     const storageKey = `credentials_${loggedInUser.id}`;
    //     const data = JSON.parse(localStorage.getItem(storageKey)) || [];

    //     const container = document.getElementById("cardContainer");
    //     const template = document.querySelector(".card-item.template");

    //     container.innerHTML = "";

    //     data.forEach((item, index) => {
    //         const card = template.cloneNode(true);
    //         card.classList.remove("template");
    //         card.style.display = "block";

    //         card.querySelector(".site-name").textContent = item.siteURL;
    //         card.querySelector(".username").textContent = item.username;
    //         card.querySelector(".email").textContent = item.email;
    //         card.querySelector(".password").setAttribute("data-password", item.password);
    //         card.querySelector(".password").textContent = "••••••••";

    //         const eyeIcon = card.querySelector(".icon-eye");
    //         eyeIcon.onclick = () => this.togglePassword(eyeIcon);







    //         const modal2 = document.getElementById("myModal2");
    //         card.querySelector("#openModalBtn2").addEventListener("click", () => {
    //             modal2.classList.add("show");
    //             document.getElementById("m-site2").value = item.siteURL;
    //             document.getElementById("m-username2").value = item.username;
    //             document.getElementById("m-email2").value = item.email;
    //             document.getElementById("m-password2").value = item.password;

    //             modal.classList.add("#m-save2").addEventListener("click ", () => {
    //                 const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    //                 if (!loggedInUser) return;

    //                 const storageKey = `credentials_${loggedInUser.id}`;
    //                 const data = JSON.parse(localStorage.getItem(storageKey)) || [];

    //                 const item = data[indexToUpdate];

    //                 item.siteURL = document.getElementById("m-site2").value;
    //                 item.username = document.getElementById("m-username2").value;
    //                 item.email = document.getElementById("m-email2").value;
    //                 item.password = document.getElementById("m-password2").value;


    //                 localStorage.setItem(storageKey, JSON.stringify(data));




    //                 this.renderCards();



    //             })

    //         })
    //         document.querySelector("#m-save2").addEventListener("click", () => {
    //             modal2.classList.remove("show");
    //         });

    //         document.querySelector("#closeModalBtn2").addEventListener("click", () => {
    //             modal2.classList.remove("show");
    //         });
    //         // document.querySelector("#closeModalBtn2").addEventListener("click", () => {
    //         //     window.onclick = (event) => {
    //         //         if (event.target === modal2) {
    //         //             modal2.classList.remove("show");
    //         //         }
    //         //     };
    //         // });
    //         const deleteBtn = card.querySelector(".icon-delete");
    //         if (deleteBtn) {
    //             deleteBtn.onclick = () => this.delete(index);
    //         }


    //         container.appendChild(card);
    //     });
    // }
    save2() {

        const saveButton = document.getElementById("m-save2");
        const indexToUpdate = saveButton.getAttribute("data-index");
    }
    renderCards() {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) return;

        const storageKey = `credentials_${loggedInUser.id}`;
        const data = JSON.parse(localStorage.getItem(storageKey)) || [];

        const container = document.getElementById("cardContainer");
        container.innerHTML = "";


        const modal2 = document.getElementById("myModal2");
        const siteInput = document.getElementById("m-site2");
        const usernameInput = document.getElementById("m-username2");
        const emailInput = document.getElementById("m-email2");
        const passwordInput = document.getElementById("m-password2");
        const saveBtn = document.getElementById("m-save2");
        const cancelBtn = document.getElementById("closeModalBtn2");


        if (cancelBtn) {
            cancelBtn.onclick = () => {
                modal2.classList.remove("show");
            };
        }

        data.forEach((item, index) => {
            const card = document.createElement("div");
            card.className = "card-item";
            card.style.width = "32.2%";

            card.innerHTML = `
            <div class="card-head">
                <div class="site-name">${item.siteURL}</div>
                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                    <div class="icons">
                        <i class="fa-solid fa-pen-to-square icon-edit" id="openModalBtn2"></i>
                        <div class="icons">
                            <i class="fa-solid fa-trash icon-edit icon-delete" style="cursor: pointer;"></i>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">
                <div class="field">
                    <span class="label">Username:</span>
                    <span class="value username">${item.username}</span>
                </div>
                <div class="field">
                    <span class="label">Email/Number:</span>
                    <span class="value email">${item.email}</span>
                </div>
                <div class="field">
                    <span class="label">Password:</span>
                    <span class="value pw-hidden password" data-password="${item.password}">••••••••</span>
                    <div class="icons">
                        <i class="fa-solid fa-eye icon-eye" style="cursor: pointer;"></i>
                    </div>
                </div>
            </div>
        `;


            const siteNameEl = card.querySelector(".site-name");
            const usernameEl = card.querySelector(".username");
            const emailEl = card.querySelector(".email");
            const passwordEl = card.querySelector(".password");


            const eyeIcon = card.querySelector(".icon-eye");
            eyeIcon.addEventListener("click", () => this.togglePassword(eyeIcon));


            const deleteBtn = card.querySelector(".icon-delete");
            deleteBtn.addEventListener("click", () => {
                this.delete(index);
            });


            const editBtn = card.querySelector("#openModalBtn2");
            if (editBtn) {
                editBtn.addEventListener("click", () => {
                    modal2.classList.add("show");


                    siteInput.value = item.siteURL;
                    usernameInput.value = item.username;
                    emailInput.value = item.email;
                    passwordInput.value = item.password;

                    saveBtn.setAttribute("data-index", index);


                    saveBtn.onclick = () => {
                        const editIndex = parseInt(saveBtn.getAttribute("data-index"));
                        if (isNaN(editIndex)) return;

                        data[editIndex].siteURL = siteInput.value;
                        data[editIndex].username = usernameInput.value;
                        data[editIndex].email = emailInput.value;
                        data[editIndex].password = passwordInput.value;

                        localStorage.setItem(storageKey, JSON.stringify(data));

                        siteNameEl.textContent = siteInput.value;
                        usernameEl.textContent = usernameInput.value;
                        emailEl.textContent = emailInput.value;
                        passwordEl.setAttribute("data-password", passwordInput.value);
                        passwordEl.textContent = "••••••••";

                        modal2.classList.remove("show");
                    };
                });
            }

            container.appendChild(card);
        });
    }



    delete(index) {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        if (!loggedInUser) {
            alert("Login First!");
            return;
        }

        if (!confirm("Confirm to Delete")) return;

        const storageKey = `credentials_${loggedInUser.id}`;
        const data = JSON.parse(localStorage.getItem(storageKey)) || [];

        data.splice(index, 1);
        localStorage.setItem(storageKey, JSON.stringify(data));
        this.renderCards();
    }



    togglePassword(icon) {
        const passwordEl = icon.closest(".field").querySelector(".password");
        const isHidden = passwordEl.textContent === "••••••••";
        passwordEl.textContent = isHidden ? passwordEl.dataset.password : "••••••••";
    }




    // delete(index) {
    //     const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    //     if (!loggedInUser) {
    //         alert("Login First!");
    //         return;
    //     }

    //     if (!confirm("Confirm to Delete")) {
    //         return


    //     }
    //     const storageKey = `credentials_${loggedInUser.id}`;
    //     const data = JSON.parse(localStorage.getItem(storageKey)) || [];


    //     data.splice(index, 1);


    //     localStorage.setItem(storageKey, JSON.stringify(data));


    //     this.renderCards();
    // }


    // togglePassword(icon) {
    //     const pwSpan = icon.closest(".field").querySelector(".value");
    //     const actualPassword = pwSpan.getAttribute("data-password");

    //     if (pwSpan.textContent === "••••••••") {
    //         pwSpan.textContent = actualPassword;
    //         icon.classList.remove("fa-eye");
    //         icon.classList.add("fa-eye-slash");
    //     } else {
    //         pwSpan.textContent = "••••••••";
    //         icon.classList.remove("fa-eye-slash");
    //         icon.classList.add("fa-eye");
    //     }
    //     eyeIcon.onclick = () => this.togglePassword(eyeIcon);
    // }

}

const AuthSystem = new UserSystem();