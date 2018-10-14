
window.onload= function(){

    let inputValue = document.querySelector("#inputValue");
    let addTaskbutton = document.querySelector("#addTaskbutton");
    let parentTasks = document.querySelector("#alltasks")
  

    inputValue.addEventListener('keypress', function(event){ 
        
        // if((event.keyCode == 13)&&(inputValue.value != null)){
            if((event.keyCode == 13)&&(inputValue.value)){
                createTask(parentTasks, event.target.value);
                this.value = '';
   
            }
            
        // }
        // else{ 
        //     alert("Please Check the input box")
        //  }
           

        


    });

    addTaskbutton.addEventListener('click', function(){
        if(inputValue.value !== ''){ 
            createTask(parentTasks, inputValue.value);
            inputValue.value = '';
         } 
         
        });


}








    function createTask(parent, task){
        let col = create({'class':'col-sm-4'});
        let singleTask = create({'class': 'single-task d-flex'});
        let singleTaskP = create('p', {'class':'ml-1 mt-3'});
        singleTaskP.innerHTML = task;
        singleTask.appendChild(singleTaskP);

        let span = create('span', {'class':'ml-auto'});
        span.innerHTML = `<i class="fa fa-times-circle"></i>`
        singleTask.appendChild(span);
        span.addEventListener('click', function(){
            parent.removeChild(col);
        })

        let taskController = createTaskController(singleTask);
        taskController.style.visibility= "hidden";
        singleTask.appendChild(taskController);

        singleTask.onmouseover = function(){
            taskController.style.visibility= "visible";
        } 

        singleTask.onmouseleave = function(){
            taskController.style.visibility = "hidden";
        }
        

       
        
        col.appendChild(singleTask);
        parent.appendChild(col);

    }


     function createTaskController(parent){            
            let controlPanel = create({'class':'task-control-panel d-flex'});

            let colorPlatte = colorplateCreate(parent); 
            controlPanel.appendChild(colorPlatte);

            let editBtn = createEditBtn(parent);
            controlPanel.appendChild(editBtn);

            return controlPanel;
             
        }

        function createEditBtn(parent){
            let span = create('span', {'class':'ml-auto mr-2'});
            span.innerHTML = `<i class="fa fa-edit"></i>`;
            span.style.color = 'green'
            span.style.fontSize = '24px'

            span.addEventListener('click', function(){
                
                
                let p = parent.querySelector('p');
                let textArea = create('textarea', {'class':'inner-textarea'});
                textArea.style.width = parent.offsetWidth + 'px'
                textArea.style.height = parent.offsetHeight + 'px'
                textArea.innerHTML = p.innerHTML;

                textArea.addEventListener('keypress', function(event){
                    if(event.keyCode === 13){
                        event.stopPropagation();

                        if(this.value){
                            p.innerHTML = this.value;
                            parent.removeChild(this);

                        }else{
                            alert("Please Put Some Data");
                        }
                    }
                    
                })

                parent.appendChild(textArea);
               
            })

            return span
        }

        

        
    function colorplateCreate(parent){
            const colors = ['blue', 'green', 'salmon', 'grey', 'red'];

            let colorDiv = create({'class':'d-flex mt-2'});
            

            console.log(colorDiv)
            colors.forEach(color =>{
                let div = create({'class': 'color-cirle ml-1'})
                div.style.background = color;

                div.addEventListener('click', function(){
                    parent.style.background = color;
                })
                colorDiv.appendChild(div);
            })
            return colorDiv;
        }

        
    


    window.create = function () {

        if (arguments.length === 0) {
            return document.createElement('div');
        }
    
        if (arguments.length === 1 && typeof arguments[0] != 'object') {
            return document.createElement(arguments[0]);
        }
    
        var tag = arguments[0];
        var attr = arguments[1] || arguments[0];
    
        if (arguments.length === 1 && typeof arguments[0] === 'object') {
            tag = 'div';
        }
    
        var element = document.createElement(tag);
    
        for (var i in attr) {
            element.setAttribute(i, attr[i]);
        }
    
        return element;
    }



