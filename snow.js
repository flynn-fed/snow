// 这是用新学的面向对象的方法制作的雪花，
// 思路：1.写一个类El构造雪花元素，初始化它的父级/大小/定位/下落的速度/颜色
//      2.在此类中定义好雪花元素的创建-->添加进父级-->运动-->到达底部从父级移除

//      由于下雪不可能只下一个，故需要再创建一个类来控制雪花的创建/运动等

//      3.再创建一个类Snow,用定时器控制雪花的运动以及创建

class Snow {
    constructor(color){
        this.colors = color;
        this.maxTop = document.documentElement.clientHeight;
        this.creatSnow();
    }
    creatSnow(){
        let els = [];
        let timer = setInterval(()=>{
            els.push(new El(this.colors));
            for(let i = 0;i < els.length;i++ ){
                if(els[i]){
                    if(els[i].top > this.maxTop){
                        //雪花落地后从文档中移除并将它从数组里删除
                        els[i].remove();
                        els[i] = null;
                        els.splice(i,1);
                    }else {
                        els[i].move();
                    }
                }
            }
        },80)
    }

}
class El {
    constructor(color){
        this.parent = document.body;
        this.el = document.createElement('span');
        this.size = Math.round(Math.random()*5+1);
        this.left = Math.random()*document.documentElement.clientWidth;
        this.top = 0;
        this.speed = 2 + Math.random();
        this.angle = 1.4 + 0.2 * Math.random();
        this.colors = color;
        this.creatEl();
    }
    creatEl(){
        this.el.style.position = 'absolute';
        this.el.style.left = this.left + 'px';
        this.el.style.top = this.top + 'px';
        this.el.style.zIndex = 9999;
        this.el.style.width = this.size + 'px';
        this.el.style.height = this.size + 'px';
        this.el.style.backgroundColor = this.colors;
        this.el.style.boxShadow = `1px 1px 8px rgba(255,255,255,.3),
                                    -1px 1px 8px rgba(255,255,255,.3),
                                    -1px -1px 8px rgba(255,255,255,.3),
                                    1px -1px 8px rgba(255,255,255,.3)`;
        this.el.style.borderRadius = '50%';
        this.parent.appendChild(this.el);
    }
    move(){
        this.top -= this.speed * Math.sin(this.angle * Math.PI);
        this.left += this.speed * Math.cos(this.angle * Math.PI);
        this.el.style.top = Math.round(this.top) + 'px';
        this.el.style.left = Math.round(this.left) + 'px';
    }
    remove(){
        this.parent.removeChild(this.el);
        this.parent = this.el = null;
    }
}