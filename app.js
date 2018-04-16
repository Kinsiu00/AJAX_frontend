window.addEventListener('load', () => {
  let currentID;
  console.log("load is running!")
  const baseURL = 'http://localhost:3000/blogposts/';
  const pullPosts = () => {
    const blogPostList = document.createElement('ul');
    axios.get(`${baseURL}`)
      .then(response => {
        const list = response.data;

//CREATE
        let newPostButton = document.createElement('button');
        newPostButton.innerHTML = "New Post";
        let buttons = document.getElementById('buted');
        buttons.appendChild(newPostButton);
        const forms = document.querySelector('form')
        newPostButton.addEventListener('click', event => {
          while (buttons.hasChildNodes()) {
            buttons.removeChild(buttons.firstChild);
          }


          //make submit and cancel buttons
          const submitButton = document.createElement('button')
          submitButton.innerHTML = "submit";
          const cancelButton = document.createElement('button')
          cancelButton.innerHTML = "cancel";
          buttons.appendChild(submitButton)
          buttons.appendChild(cancelButton)

          let formT = document.createElement('input');
          formT.type = "text"
          formT.name = "title"
          formT.value = ""
          forms.insertAdjacentElement('afterbegin', formT)

          let formC = document.createElement('input');
          let spacer = document.createElement('br');

          formC.type = "text"
          formC.name = "content"
          formC.value = ""
          forms.insertAdjacentElement('afterbegin', spacer)
          forms.insertAdjacentElement('afterbegin', formC)

          submitButton.addEventListener('click', event => {
            axios.post(`${baseURL}`, {
              title: formT.value,
              content: formC.value
            })
            .catch( error => {
              console.error(error)})
              
            event.preventDefault();
          })

          event.preventDefault();
        })

//SELECT POST
        list.forEach( post => {
          const li = document.createElement('li');
          li.innerHTML = `${post.title}`;
          blogPostList.appendChild(li);
          const navList = document.getElementById('allPosts');
          navList.appendChild(li);

          li.addEventListener('click', list => {
            currentID = post.id
            const mainT = document.getElementById('mainTitle')
            mainT.innerHTML = `${post.title}`;
            const mainC = document.getElementById('mainContent')
            mainC.innerHTML = `${post.content}`;

            //ensure buttons do not duplicate
            const forms = document.querySelector('form')
            const buttons = document.getElementById('buted')
            while (buttons.hasChildNodes()) {
              buttons.removeChild(buttons.firstChild);
            }
            //make edit and delete buttons
            const editButton = document.createElement('button')
            editButton.innerHTML = "edit";
            const deleteButton = document.createElement('button')
            deleteButton.innerHTML = "delete";
            buttons.appendChild(editButton)
            buttons.appendChild(deleteButton)

            //when clicking the edit button
            editButton.addEventListener('click', event =>{
              while (buttons.hasChildNodes()) {
                buttons.removeChild(buttons.firstChild);
              }

              //make submit and cancel buttons
              const submitButton = document.createElement('button')
              submitButton.innerHTML = "submit";
              const cancelButton = document.createElement('button')
              cancelButton.innerHTML = "cancel";
              buttons.appendChild(submitButton)
              buttons.appendChild(cancelButton)

            mainT.innerHTML = "";
            mainC.innerHTML = "";

            //create forms and populating
            let formT = document.createElement('input');
            formT.type = "text"
            formT.name = "title"
            formT.value = `${post.title}`
            forms.insertAdjacentElement('afterbegin', formT)

            let formC = document.createElement('input');
            let spacer = document.createElement('br');

            formC.type = "text"
            formC.name = "content"
            formC.value = `${post.content}`
            forms.insertAdjacentElement('afterbegin', spacer)
            forms.insertAdjacentElement('afterbegin', formC)


            //SUBMISSION
            submitButton.addEventListener('click', event => {
              console.log('submit button clicked')
              event.preventDefault();
            })

              event.preventDefault();
            })

            //when clicking the delete button
            deleteButton.addEventListener('click', event => {
              console.log(`${post.title} delete`)
              event.preventDefault();
            })
          })
        })

      })
      .catch( error => {
        console.error(error)})
    }
    pullPosts();
})
