const pageClass = document.querySelectorAll('.page_all');

function pageAct(){
    for(i = 1; i <= pageClass.length; i++){
        if ( window.location.pathname == `/notice/${i}`) {
            let j = i-1;
            pageClass[j].className += ' page_active';
            for(k=0; k < pageClass.length; k++){
                if(k < j || k > j){
                    pageClass[k].className += ' noti_none';
                }
            }
        }
    }
}

pageAct();