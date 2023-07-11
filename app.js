// fetching the classes

let allfilters=document.querySelectorAll(".color-filters");
let openModal=document.querySelector(".open-modal");
let closeModal=document.querySelector(".close-modal");

let ticketModalOpen=false;
let isTextTyped=false;
let myDb=window.localStorage;
let allfilterClasses=["red","blue","green","yellow","grey"];
let ticketContainer=document.querySelector(".tickets-container");

openModal.addEventListener("click",openTicketModal);
closeModal.addEventListener("click",closeTicketModel); 


function loadTickets()
{
    let allTickets=myDb.getItem("allTickets");
    if(allTickets)
    {
        let allTickets2=JSON.parse(allTickets);
        for(let i=0;i<allTickets2.length;i++)
        {
            appendTicket(allTickets2[i]);
        }
    }

}
loadTickets();

let filterSelction=document.querySelector(".active-filter");
allfilters.forEach((ff)=>
{   
    ff.addEventListener("click",selectFilter);
  
});
function selectFilter(e)
{
    if(e.target.classList.contains("active-filter"))
    {   
        e.target.classList.remove("active-filter");
        ticketContainer.innerHTML="";
        loadTickets();
    }
    else
    {
        if(document.querySelector(".active-filter"))
        {
            document.querySelector(".active-filter").classList.remove("active-filter");
        }
        e.target.classList.add("active-filter");
        ticketContainer.innerHTML="";
        let filterClicked=e.target.classList[1];
        loadSelectedTickets(filterClicked);
    }
  
}

function loadSelectedTickets(filter)
{  
  let allTickets=myDb.getItem("allTickets");
    if(allTickets)
    {
        allTickets=JSON.parse(allTickets);
        for(let i=0;i<allTickets.length;i++)
        {
            if(allTickets[i].ticketFilter==filter)
            {
                appendTicket(allTickets[i]);
            }
        }
    } 
    myDb.setItem("allTickets",JSON.stringify(allTickets));
}
function openTicketModal()
{   
    if(ticketModalOpen)return;
    let ticketModal=document.createElement("div");
    ticketModal.classList.add("ticket-modal");
    ticketModal.innerHTML=`
    <div class="ticket-text" contenteditable="true">
    Enter Your Text !

    </div>
    <div class="ticket-filters">
     <div class="ticket-filter red selected-filter"></div>
    <div class="ticket-filter blue"></div>
    <div class="ticket-filter green"></div>
    <div class="ticket-filter yellow"></div>
    <div class="ticket-filter grey"></div>
    </div>
    `;

    document.querySelector("body").append(ticketModal); // append this ticket model in body
    ticketModalOpen=true;
    let ticketTextDiv=ticketModal.querySelector(".ticket-text");
    ticketTextDiv.addEventListener("keypress",handleKeyPress);

    let ticketFilters=ticketModal.querySelectorAll(".ticket-filter");
    for (let i=0;i<ticketFilters.length;i++)
    {
    ticketFilters[i].addEventListener("click",function(e){
        if(e.target.classList.contains("selected-filter"))return;

        document.querySelector(".selected-filter").classList.remove("selected-filter");
        e.target.classList.add("selected-filter");
     });    
    }
    isTextTyped=false;

}
function closeTicketModel(e)
{
       if(ticketModalOpen)
       {
         document.querySelector(".ticket-modal").remove();
         ticketModalOpen=false;
       }
}

 function handleKeyPress(e)
{
    if(e.key=="Enter" && isTextTyped && e.target.textContent)
    {  
        let filterSelected=document.querySelector(".selected-filter").classList[1];
        let ticketId="#"+uuid();
        let ticketInfoObject={
        ticketFilter :filterSelected,
        ticketValue:e.target.textContent,
        ticketId:ticketId,
    };  
        appendTicket(ticketInfoObject);
        closeModal.click();
        saveTicketToDb(ticketInfoObject);
    }
    
    if(isTextTyped==false)
    {   
        isTextTyped=true;
        e.target.textContent="";
    }
 }
 function saveTicketToDb(ticketInfoObject)
 {  
    let allTickets=myDb.getItem("allTickets");
    if(allTickets)
    {   
        allTickets=JSON.parse(allTickets);
        allTickets.push(ticketInfoObject);
        myDb.setItem("allTickets",JSON.stringify(allTickets));

    }
    else
    {   
        let allTickets=[ticketInfoObject];
        myDb.setItem("allTickets",JSON.stringify(allTickets));
    }
 }

 function appendTicket(ticketInfoObject)
 {
    let {ticketFilter,ticketValue,ticketId}=ticketInfoObject;
    
    let ticketDiv=document.createElement("div");
    ticketDiv.classList.add("ticket");
    ticketDiv.innerHTML=
    `<div class="ticket-header ${ticketFilter}"></div>
    <div class="ticket-content">
          <div class="ticket-info">
               <div class="ticket-id">${ticketId}</div>
                 <div class="edit"><i class="fa-solid fa-pencil"></i></div>  
               <div class="ticket-delete"><i class="fa-solid fa-trash"></i></div>
         </div>
        <div class="ticket-value">
             ${ticketValue}
        </div>
    </div>
`;
   ticketContainer.append(ticketDiv);


   //ticket is added additonal fxns need to perform

let ticketHeader=ticketDiv.querySelector(".ticket-header");
ticketHeader.addEventListener("click",function(e)
{   
    let currentFilter=e.target.classList[1];//yellow
    let indexOfCurrFilter=allfilterClasses.indexOf(currentFilter);
    let newIndex=(indexOfCurrFilter+1)%allfilterClasses.length;
    let newFilter=allfilterClasses[newIndex];
    ticketHeader.classList.remove(currentFilter);
    ticketHeader.classList.add(newFilter);
     
    // get alltickets from db
    let allTickets=JSON.parse(myDb.getItem("allTickets"));
    for(let i=0;i<allTickets.length;i++)
    {
        if(allTickets[i].ticketId==ticketId)
        {
            allTickets[i].ticketFilter=newFilter;
        }
    }
    myDb.setItem("allTickets",JSON.stringify(allTickets));

});

let deleteTicketBtn=ticketDiv.querySelector(".ticket-delete");

deleteTicketBtn.addEventListener("click",function()
{
    ticketDiv.remove();
    //remove from db as well

    let allTickets=JSON.parse(myDb.getItem("allTickets"));

    // similar to traversing in array isme ham ticket id waale ko rehende aur baakio ko push kardenge

    let updatedTicket=allTickets.filter(function(ticketObject){ // filter usage 
        if(ticketObject.ticketId==ticketId)
        {
            return false;
        }
        return true;
    });
    myDb.setItem("allTickets",JSON.stringify(updatedTicket));    
}); 
   // edit button
let editButton=ticketDiv.querySelector(".edit");
editButton.addEventListener("click",(e)=>
{  
    if(ticketModalOpen)return;
    let ticketModal=document.createElement("div");
    ticketModal.classList.add("ticket-modal");
    ticketModal.innerHTML=`
    <div class="ticket-text" contenteditable="true">
    ${ticketValue}

    </div>
    <div class="ticket-filters">
     <div class="ticket-filter red selected-filter"></div>
    <div class="ticket-filter blue"></div>
    <div class="ticket-filter green"></div>
    <div class="ticket-filter yellow"></div>
    <div class="ticket-filter grey"></div>
    </div>
    `;

    document.querySelector("body").append(ticketModal); // append this ticket model in body
    ticketModalOpen=true;
    let ticketTextDiv=ticketModal.querySelector(".ticket-text");
    
    let ticketFilters=ticketModal.querySelectorAll(".ticket-filter");
    for(let i=0;i<ticketFilters.length;i++)
    {   
        if(ticketFilters[i].classList.contains("selected-filter"))
        {
            ticketFilters[i].classList.remove("selected-filter");
        }   
        if(ticketFilters[i].classList[1]==ticketFilter)
        {
            ticketFilters[i].classList.add("selected-filter");
        }
        ticketFilters[i].addEventListener("click",function(e){
            if(e.target.classList.contains("selected-filter"))return;

            document.querySelector(".selected-filter").classList.remove("selected-filter");
            e.target.classList.add("selected-filter");
        });    
    }
     
    // change from the database
    ticketTextDiv.addEventListener("keypress",(e) => {updatedTicket(e, ticketInfoObject) });
});
}
function updatedTicket(e,ticketInfoObject)
{   
    if(e.key=="Enter" && e.target.textContent)
    {   
        console.log("yes it enters");
        let filterSelected=document.querySelector(".selected-filter").classList[1];
        ticketInfoObject.ticketValue=e.target.textContent;
        ticketInfoObject.ticketFilter=filterSelected;
        
        closeModal.click();
       
        // change the database
       let allTickets= JSON.parse(myDb.getItem("allTickets"));

       for(let i=0;i<allTickets.length;i++)
       {
            if(allTickets[i].ticketId==ticketInfoObject.ticketId)
            {
                    allTickets[i]=ticketInfoObject;
                    break;
            }
       }
       myDb.setItem("allTickets",JSON.stringify(allTickets));
       ticketContainer.innerHTML=""
       loadTickets();
    }
}
