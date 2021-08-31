// to get the parent element of the task to inject the html code in DOM

const taskContainer = document.querySelector(".task_container");    //can also select the id by #id_name

const taskModal = document.querySelector(".task_modal_body");

//  while retrieving the data we'll required a collection of data, therefore will use array

let globalTaskData = [];

// const generateHTMLCode = (newCardData) => `<div id=${newCardData.id} class="col-md-6 col-lg-4">
// <div class="card ">

//     <div class="card-header gap-2 d-flex justify-content-end">
//         <button class="btn btn-outline-info" name="${newCardData.id}" onclick="editTask.apply(this, arguments)"><i class="fal fa-pencil" name="${newCardData.id}" ></i></button>
//         <button class="btn btn-outline-danger " name="${newCardData.id}" onclick="deleteTask.apply(this, arguments)">
//             <i class="fal fa-trash-alt" name="${newCardData.id}"></i>
//         </button>
//     </div>

//     <div class="card-body">
//         <img src=${newCardData.image} alt="image" class="card-img" />
//         <h5 class="card-title my-2">${newCardData.title}</h5>
//         <p class="card-text">${newCardData.description}</p>
//         <span class="badge bg-primary">${newCardData.type}</span>
//     </div>
        
//     <div class="card-footer">
//         <button class="btn btn-outline-primary" name="${newCardData.id}">Open Task</button>
//     </div>

// </div>
// </div>`;

const generateHTMLCode = ({
    id,
    title,
    description,
    type,
    image,
  }) => `<div id=${id} class="col-md-6 col-lg-4">
  <div class="card ">
  
      <div class="card-header gap-2 d-flex justify-content-end">
          <button class="btn btn-outline-info" name="${id}" onclick="editTask.apply(this, arguments)">
          <i class="fal fa-pencil" name="${id}" ></i>
          </button>
          <button class="btn btn-outline-danger " name="${id}" onclick="deleteTask.apply(this, arguments)">
              <i class="fal fa-trash-alt" name="${id}"></i>
          </button>
      </div>
  
      <div class="card-body">
          <img src=${image} alt="image" class="card-img" />
          <h5 class="card-title my-2">${title}</h5>
          <p class="card-text">${description}</p>
          <span class="badge bg-primary">${type}</span>
      </div>
          
      <div class="card-footer">
          <button class="btn btn-outline-primary" name="${id}" data-bs-toggle="modal" data-bs-target="#openTask" onclick="openTask.apply(this, arguments)">Open Task </button>
      </div>
  
  </div>
  </div>`;

const injectToDOM = (content) => taskContainer.insertAdjacentHTML("beforeend", content);

 // update the local storage.

    // key can be anything but must be a string.
    // 2nd parameter nust be a JSON.
    // JSON is javascript object notation. It is a javascript object but it must be a string.
    // JON is a standard communication language , taht can be understand by any server of any language.
    // it must be string because every priogramminglanguage supports String. 
    // stringify => javascript object to Json

//                                                       key     collection of data converted to JSON in String
const saveToLocalStorage = () => localStorage.setItem("taskyCA", JSON.stringify({cards: globalTaskData}));
//                                              JSON required a object, thats why we define a object named card 

const addNewCard = () => {

    const newCardData = {

        id: `${Date.now()}`,
        image: document.getElementById("imageURL").value,
        title: document.getElementById("taskTitle").value,
        type: document.getElementById("taskType").value,
        description: document.getElementById("taskDescription").value,

    };
    
    // will push the data to array, the best time for pushing is when we get our data.
    globalTaskData.push(newCardData);
    
    saveToLocalStorage();

    // step1: insert/ generate a html code

    const newCard = generateHTMLCode(newCardData);//we can write this instead of `<div id=${newCardData.id} class="col-md-6 col-lg-4">
    //                     <div class="card">

    //                         <div class="card-header gap-2 d-flex justify-content-end">
    //                             <button class="btn btn-outline-info"><i class="fal fa-pencil "></i></button>
    //                             <button class="btn btn-outline-danger"><i class="fal fa-trash-alt"></i></button>
    //                         </div>

    //                         <div class="card-body ">
    //                             <img src=${newCardData.image} alt="image" class="card-img" />
    //                             <h5 class="card-title my-2">${newCardData.title}</h5>
    //                             <p class="card-text">${newCardData.description}</p>
    //                             <span class="badge bg-primary">${newCardData.type}</span>
    //                         </div>
                                
    //                         <div class="card-footer">
    //                             <button class="btn btn-outline-primary">Open Task</button>
    //                         </div>

    //                     </div>
    //                 </div>`;

    // step2: inject html to DOM

    //taskContainer.insertAdjacentHTML("beforeend", newCard);   //add new element beforeend of each element 
    injectToDOM(newCard);                                       //as we write function no need for duplicating the code
    
    // step3: clear the form
    
    document.getElementById("imageURL").value = "";
    document.getElementById("taskTitle").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("taskDescription").value = "";

    return;
};

// function to load data to local storage
// local storage is a part of broser storage, it provides limited storage of 5 MB.
// Data stored in local storage is stored in hard drive itself but will be accessing through the browser.

const loadExistingData = () => {

    // step1: check local storage for data
    const getData = localStorage.getItem("taskyCA");

    // step2: retrieve it or parse JSON data (convert the String(JSON) back to JavaScript object) , if exist
    if(!getData) return; // if getData is null then !getData will become true and our program will simpy return and will not crash.
    
    const taskCards = JSON.parse(getData);

    globalTaskData = taskCards.cards; //updating the globalTaskData

    globalTaskData.map((newCardData) => {

        // step3: generate the html code for that data
        const newCard = generateHTMLCode(newCardData);
    
        // step4: inject it to DOM
        injectToDOM(newCard);
    });

    return;
};

// generateHTMLCode and injectToDOM is called the utility function

const deleteTask = (event) =>{
    const targetID = event.target.getAttribute("name");
    const targetElement = event.target.tagName;

    const removeTask = globalTaskData.filter((card)=> card.id !== targetID);
    globalTaskData = removeTask;

    saveToLocalStorage();

    // removing the card

    if(targetElement === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
};

const editTask = (event) => {
    const targetElement = event.target.tagName;

    let taskTitle;
    let taskDescription;
    let taskType;
    let parentElement;
    let submitButton;

    if(targetElement === "BUTTON"){
        parentElement= event.target.parentNode.parentNode;
    }
    else{
        parentElement= event.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentElement.childNodes[3].childNodes[3];
    taskDescription = parentElement.childNodes[3].childNodes[5];
    taskType = parentElement.childNodes[3].childNodes[7];
    submitButton = parentElement.childNodes[5].childNodes[1];

    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
    submitButton.setAttribute("onclick", "saveEditTask.apply(this, arguments)");
    submitButton.innerHTML = "Save Changes";

};

const saveEditTask = (event) => {

    const targetID = event.target.getAttribute("name");
    // console.log(targetID);
    const targetElement = event.target.tagName;

    let parentElement;

    if(targetElement === "BUTTON"){
        parentElement = event.target.parentNode.parentNode;
    }
    else{
        parentElement = event.target.parentNode.parentNode.parentNode;
    }

    taskTitle = parentElement.childNodes[3].childNodes[3];
    taskDescription = parentElement.childNodes[3].childNodes[5];
    taskType = parentElement.childNodes[3].childNodes[7];
    submitButton = parentElement.childNodes[5].childNodes[1];

    const updateTaskData = {
        title: taskTitle.innerHTML,
        description: taskDescription.innerHTML,
        type: taskType.innerHTML,
    };

    // console.log({updateTaskData, targetID});

    const updateGlobalTaskData = globalTaskData.map((task) => {
        if (task.id === targetID) {
        //   console.log({ ...task, ...updateTaskData });
          return { ...task, ...updateTaskData };
        }
        return task;
      });

    globalTaskData = updateGlobalTaskData;

    saveToLocalStorage();

    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
    submitButton.innerHTML = "Open Task";

};

const searchTask = (event) => {
    console.log(event);

    while (taskContainer.firstChild) {
      taskContainer.removeChild(taskContainer.firstChild);
    }
  
    const resultData = globalTaskData.filter(({ title }) => title.includes(event.target.value));
  
    resultData.map((newCardData) => {

        // step3: generate the html code for that data
        const newCard = generateHTMLCode(newCardData);
    
        // step4: inject it to DOM
        injectToDOM(newCard);
    });

  };

  const openTask = (event) => {

    parentElement = event.target.parentNode.parentNode;
    console.log(parentElement);

    const modalData = {
        taskImage: parentElement.childNodes[1],
        taskTitle: parentElement.childNodes[2],
        taskDescription: parentElement.childNodes[3],
    };

    openTaskModal(modalData);

  };

  const openTaskModal = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return ` <div id=${id}>
    <img src=${url} alt="bg image" class="img-fluid mb-3" />
    <strong class="text-sm text-muted">Created on ${date.toDateString()}</strong>
    <h2 class="my-3">${title}</h2>
    <p>${description}</p>
    </div>`;
  };
