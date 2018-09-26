let vm=new Vue({
    el:'#app',
    data:{
        todos:[
            {isSelected:false,title:'ES6学习'},
            {isSelected:false,title:'vue学习'},
            {isSelected:false,title:'小例子练习'},
            {isSelected:false,title:'知识补充'},
        ],
        title:'',
        cur:'',
        hash:'',

    },
    created(){//如果localStorage中有数据就用有的，没有就用默认的
        this.todos=JSON.parse(localStorage.getItem('data')) || this.todos;
        this.hash=window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange',()=>{
            this.hash=window.location.hash.slice(2);
        },false)
    },
    watch:{
        todos:{//watch默认只监控一层的数据变化，深度监控需要改成对象，并使用handler函数
            handler(){//localStorage默认存字符串
                localStorage.setItem('data',JSON.stringify(this.todos));
            },deep:true
        }
    },
    methods:{
        add(){//添加新的事件
          this.todos.push({
              isSelected:false,title:this.title
          });
          this.title='';
        },
        remove(p){//删除事件
            this.todos=this.todos.filter(item=>item!==p);
        },
        remember(p){//记录下当前的todo
            this.cur=p;
        },
        cancel(){this.cur='';}
    },
    computed:{
        todoLists(){
           if(this.hash==='all'){return this.todos};
           if(this.hash==='finish'){return this.todos.filter(item=>item.isSelected)};
           if(this.hash==='unfinish'){return this.todos.filter(item=>!item.isSelected)};
           return this.todos;
        },
        count(){
            return this.todos.filter(item=>!item.isSelected).length;
        }
    },
    directives:{
        focus(el,bindings){
            //当cur==todo时
            if(bindings.value){
                el.focus();//获取焦点
            }
        }
    },

})