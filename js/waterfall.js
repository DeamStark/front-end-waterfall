/**
 * Created by CDJ on 2016/12/4.
 */
window.onload=function(){
    waterfall('main','img-box');
    //待渲染数据
    var data = {
        'datalist':[
            {
                'src':'1.jpg'
            },
            {
                'src':'2.jpg'
            },
            {
                'src':'3.jpg'
            },
            {
                'src':'4.jpg'
            },
            {
                'src':'5.jpg'
            }
        ]
    };
    //触发加载数据函数
    window.onscroll = function(){
        var oParent = document.getElementById('main');
        if(isOnload()){
            for(var i=0;i<data.datalist.length;i++){
                var boxDiv = document.createElement('div');
                boxDiv.className = 'img-box';
                oParent.appendChild(boxDiv);
                var picDiv = document.createElement('div');
                picDiv.className = 'picture';
                boxDiv.appendChild(picDiv);
                var Img = document.createElement('img');
                Img.src ='./images/'+data.datalist[i].src;
                picDiv.appendChild(Img);

            }
            waterfall('main','img-box');
        }
    }

}

function waterfall(parent,imgbox){
    var oParent = document.getElementById(parent);
    //获取父元素下class为某个值的子元素集
    var boxRes  = getClassBox(oParent,imgbox);
    //获取每一列的宽度(即块框的宽度)
    var iBoxW   = boxRes[0].offsetWidth;
    //获取盒子的列数
    var boxNum  = Math.floor(document.documentElement.clientWidth/iBoxW);
    //设置main居中
    oParent.style.cssText = "width:"+boxNum*iBoxW+"px;margin:0 auto;";
    /*
    * 设置之后的图片对第一行的图片进行填充
    * */
    //用于存储第首行每列的高度
    var fboxH = new Array();
    //获取每一个img-box的高度
    for(var i=0;i<boxRes.length;i++){
        if(i<boxNum){
            //存储第一行的高度
            fboxH[i] = boxRes[i].offsetHeight;
            // console.log(fboxH[i]);
        }else{
            //获取首行高度最小的列的高度
            var boxMinH              = Math.min.apply(null,fboxH);
            //获取首行高度最小的索引
            var boxMinHIndex         = getBoxMinHIndex(fboxH,boxMinH);
            boxRes[i].style.position = "absolute";
            boxRes[i].style.top      = boxMinH+"px";
            boxRes[i].style.left     = boxRes[boxMinHIndex].offsetLeft+"px";
            //填充上去后，加上新填充的块的高度
            fboxH[boxMinHIndex]+= boxRes[i].offsetHeight;

        }
    }

}

/*
* 获取获取父元素底下class为某个值的子元素
* */
function getClassBox(parent,imgbox){
    var iBoxs = parent.getElementsByTagName("*");
    var boxRes = new Array();
    for(var i=0;i<iBoxs.length;i++){
        if(iBoxs[i].className == imgbox){
            boxRes.push(iBoxs[i]);
        }
    }
    return boxRes;
}

/*
* 获取首行高度最小的索引
* */
function getBoxMinHIndex(fboxH,boxMinH){
    for(var i in fboxH){
        if(fboxH[i] == boxMinH){
            return i;
        }
    }
}

/*
* 判断是否达到加载条件
* */
function isOnload(){
    var oParent    = document.getElementById('main');
    var boxRes     = getClassBox(oParent,'img-box');
    //当前最后一个图片盒子顶高与
    var lastBoxTopH= boxRes[boxRes.length-1].offsetTop + Math.floor(boxRes[boxRes.length-1].offsetHeight/2);
    var scrollTop  = document.documentElement.scrollTop || document.body.scrollTop;
    var documentH  = document.documentElement.clientHeight;
    return (lastBoxTopH < documentH+scrollTop)?true:false;
}












