var xhr = new XMLHttpRequest();

xhr.open('get','https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97',true);

xhr.send(null);

xhr.onload = function() {
    const data = JSON.parse(xhr.responseText);
    const viewData = data.result.records;
    const viewDataLen = viewData.length;
    const elArea = document.querySelector('#dropdown-area');
    const elCardWrap = document.querySelector('.wrap-card');
    const elCardTitle = document.querySelector('.title-card');



function countryOption() {
    //過濾區域的重複data
    let str1 = []
    for(let i = 0;i <  viewDataLen;i++) {
        str1.push(viewData[i].Zone);
    }//製作區域矩陣
    const repeatFilter = str1.filter(function(element, index, arr){
    return arr.indexOf(element) == index;
    });//過濾

    //加入資料到選單中
    let str2 = '<option>--請選擇行政區--</option>';
    for(let i = 0;i <  repeatFilter.length ;i++) {
        str2 += '<option>'+repeatFilter[i]+'</option>';
    };
    elArea.innerHTML = str2;
};
countryOption();

//選擇區域列出旅遊資訊
function listUpdate(e) {
    let str = ''; 
    for (let i= 0; i < viewDataLen; i++) {
        const select = e.target.value;     
        if(viewData[i].Zone == select) {
            str += 
            '<li class="card">'+
                '<div class="cardPic-box" style="background-image:url('+viewData[i].Picture1+')">'+
                    '<span class="name-place">'+viewData[i].Name+'</span>'+
                    '<span class="name-zone">'+viewData[i].Zone+'</span>'+
                    '<div class="shadow"></div>'+
                '</div>'+
                '<p class="openTime"><img src="pic/icons_clock.png" alt="">'+viewData[i].Opentime+'</p>'+
                '<p class="addresss"><img src="pic/icons_pin.png" alt="">'+viewData[i].Add+'</p>'+
                '<p class="tel"><img src="pic/icons_phone.png" alt="" class="icon-phone">'+viewData[i].Tel+'</p>'+
                '<p class="Ticketinfo"><img src="pic/icons_tag.png" alt="">'+viewData[i].Ticketinfo+'</p>'
            '</li>'
            const str2 = viewData[i].Zone;
            elCardWrap.innerHTML = str;
            elCardTitle.innerHTML = str2;
        } 
    };
};

elArea.addEventListener('change',listUpdate,false);







//熱門行政區點擊效果
const elHotCountry = document.querySelector('.hotCountry');
function showInfo(e) {
    const target = e.target.nodeName;
    const select = e.target.innerText; 

    
    let str ="";
    for (let i = 0; i<viewDataLen;i++){
        if(target == "BUTTON" && select==viewData[i].Zone) {
            str += 
            '<li class="card">'+
                '<div class="cardPic-box" style="background-image:url('+viewData[i].Picture1+')">'+
                    '<span class="name-place">'+viewData[i].Name+'</span>'+
                    '<span class="name-zone">'+viewData[i].Zone+'</span>'+
                    '<div class="shadow"></div>'+
                '</div>'+
                '<p class="openTime"><img src="pic/icons_clock.png" alt="">'+viewData[i].Opentime+'</p>'+
                '<p class="addresss"><img src="pic/icons_pin.png" alt="">'+viewData[i].Add+'</p>'+
                '<p class="tel"><img src="pic/icons_phone.png" alt="" class="icon-phone">'+viewData[i].Tel+'</p>'+
                '<p class="Ticketinfo"><img src="pic/icons_tag.png" alt="">'+viewData[i].Ticketinfo+'</p>'
            '</li>'
            const str2 = viewData[i].Zone;
            elCardWrap.innerHTML = str;
            elCardTitle.innerHTML = str2;
        }
    }
}



elHotCountry.addEventListener('click',showInfo);
};


//建立滑動至頁面頂部功能
$(document).ready(function() {
    $('.top-button').click(function(event) {
        event.preventDefault;
        $('html,body').animate({scrollTop:0}, 2000);
    });
});

$(document).ready(function() {
    $('.GoToBottomBtn').click(function(event) {
        event.preventDefault;
        $('html,body').animate({scrollTop: $(document).height()},2000);
    });
});
