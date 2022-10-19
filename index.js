

(function () {

    let store = [];
    const path = document.querySelector("#path");
    const paths = document.querySelector("#paths");
    const btn = document.querySelector("#save-path");
    const btnCurrentPath = document.querySelector("#get-path");
    const deletePaths = document.querySelector("#delete-paths");
    getStoreData();
    path.focus();

    btn.addEventListener("click", SavePath );
    btnCurrentPath.addEventListener("click", getCurrentPath );
    deletePaths.addEventListener("click", DeletePaths );
    

    function SavePath(){
        if(path.value){
            store.push(path.value);
            paths.innerHTML = renderList(store);
            ToJson(store);
            path.value = '';
        }
        else{
            path.focus();
        }
    }

    function ToJson (array){
        let json = JSON.stringify(array);
        localStorage.setItem('content', json);
    }

    function getStoreData(){
        let data = JSON.parse(localStorage.getItem('content')); 
        if(data){
            store = data;
            paths.innerHTML = renderList(data);
        }
        else{
            console.log('empty');
        }
    }

    function renderList(array){
        let list = '';
        array.map( path => { 
            list += `<li class="link link-path bg-pure shadow-sm "> 
                        <a class="path" href="${path}" target="_blank"> ${path} </a>
                     </li>`; 
        });
        return list;
    }
    
    function DeletePaths(){
        localStorage.removeItem('content');
        paths.innerHTML = '';
        store = [];
    }

    function getCurrentPath(){
        // with this we can access the current tab in chrome
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
            let current = tabs[0].url;
            store.push(current);
            paths.innerHTML = renderList(store);
            ToJson(store);
        })

    }

})();



