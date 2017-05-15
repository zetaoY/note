3. 基本概念
    1. 语句
        1. switch 语句
            javaScript 中的 switch 语句是全等匹配
                // demo 1
                    var num = 3;
                    switch(num){
                        case 3: console.log(3);
                        case 5: console.log('5 ?');break;          // 前一个 case 如果执行且没有 break 将会贯穿执行
                        case '3': console.log('string');
                    }
                // demo 2
                    var num = 3;
                    switch(true){                                  // 因为 case 返回布尔值, 所以用 true 匹配符合条件的
                        case num<10: console.log('<10');
                            break;
                        case num>0 && num<5: console.log('0~5');
                            break;
                    }
    2. 函数
        JavaScript 中没有重载
    3. 变量
        所有函数的参数都是按值传递的
        -- 执行环境
            执行环境中代码执行完毕后该环境会立即销毁, 全局环境直到关闭浏览器才会销毁
    4. 引用类型

6. OOP
    1. 对象属性
        1. 属性类型
            描述属性的特性, 用于实现 JavaSctipt 引擎[ECMA 262 第五版]
                1. 数据属性
                    [[Configurable]]    能否通过 delete 删除该属性
                    [[Enumerable]]      能否通过 for-in 循环返回属性
                    [[Writable]]        能否 修改 该属性的值
                    [[Value]]           该属性的数据值[默认为 undefined ]
                    -- 属性定义
                        var o = {
                            name: 'sc'              // 直接定义的属性值 前三个属性类型为 true, Value 为'sc'
                        };
                    -- 属性修改
                        var o = {};
                        Object.definedProperty(o, 'name', {
                            writable: false,
                            value: 'Sc'
                        });
                        o.name = 'other';
                        console.log(o.name);        // Sc, 严格模式下赋值会报错
                2. 访问器属性
                    [[Configurable]]    能否通过 delete 删除该属性
                    [[Enumerable]]      能否通过 for-in 循环返回属性
                    [[get]]             读取数据时调用的函数[默认 undefined]
                    [[set]]             修改数据时调用的函数[默认 undefined]
                    -- 属性修改
                        // 访问器属性不能直接定义
                        var o = {
                            _name: 'sc'
                        };
                        Object.defineProperty(o, '_name', {
                            get: function(){
                                return this._name+'test';           // 严格模式下设置get/set中的一个会报错
                            }
                            set: function(newValue){
                                this._name = newValue;
                            }
                        });
                3. 读取属性类型
                    Object.getOwnPropertyDescriptor(o, 'set');
    2. 创建对象
        1. 工厂模式
            function createPerson(name, age){
                var obj = new Object();
                obj.name = name;
                obj.age = age;
                obj.sayName = function(){return this.name;}
                return obj
            };
            var person = createPerson('sc', 21);
        2. 构造函数
            function Person(name, age){
                this.name = name;
                this.age = age;
                this.sayName = function(){
                    return this.name;
                }
            }
            1. new 操作符执行流程
                /*
                 * new 操作符执行流程
                 *     1. var obj = new Object()
                 *     2. 将构造函数的作用域赋给这个新对象(所以this 指向了新对象obj)
                 *     3. 执行构造函数中的代码[添加属性等]
                 *     4. return obj;
                 */
                var person = new Person('sc', 21);
                1. constructor 属性
                    // 每个实例的 constructor 都指向构造函数 Person
                    var person1 = new Person();
                    var person2 = new Person();
                    console.log(person1.constructor === Person);
                    console.log(person2.constructor === Person);
                    // 构造函数可以将实例标识为特定的类型, 工厂模式无法标识
                    console.log(person2 instanceof Person);
                    console.log(person2 instanceof Object);
            2. 缺点
                /*
                 * 构造函数中的每个方法都要在实例化时创建一次   
                 *     JS中每个函数都是对象, 两种创建方式等价    
                 *         this.sayName = function(){ ... }
                 *         this.sayName = new Function('return this.name;');   
                 *     所以每个实例的同名函数并不相等
                 *         console.log(person1.sayName === person.sayName);
                 */
                1. 解决方案
                    function Person(name, age){
                        this.sayName = sayName;
                    }
                    function sayName(){
                        return this.name;
                    }
            3. prototype 原型属性
                /*
                 * 每个函数都有 prototype 属性
                 * 该属性包含所有实例共享的属性和方法
                 * 该属性指向通过调用构造函数创建的实例的原型对象
                 * 
                 * 优点
                 *     不必在构造函数中定义对象实例的属性
                 *
                 * 关系
                 *     创建新(构造)函数时, 原型对象会获得 constructor 属性[指向构造函数] 
                 *     创建实例后, 实例内部将包含一个 [[prototype]] 指针[指向构造函数]
                 *         脚本中没有标准的方式访问 [[prototype]]
                 *         部分浏览器有 __proto__ 实现 [[prototype]]
                 * 
                 */

                1. 关系
                        ┌---------------------------------------------------┐
                        │                                                   │
                        ↓                                                   │
                    Person                                                  │
                   prototype -------------┬-------->  Person prototype      │
                                          │            [constructor]--------┘
                                          │
                                          │
                                          │
                    person1               │               person2
                 [[prototype]] -----------┴----------- [[prototype]]     

                2. 属性
                    1. isPrototypeOf()
                        // 确定实例与原型对象的关系
                        Person.prototype.isPrototypeOf(person1);             // true
                        Person.prototype.isPrototypeOf(person2);        
                    2. getPrototypeOf()
                        // 返回实例的 [[prototype]] 
                        Object.getPrototypeOf(person1) === Person.prototype  // true

            2. 访问属性
                访问实例属性时, 会优先使用实例的属性, 其次是原型对象的属性
                这也是原型属性被所有实例共享的原因
                1. 顺序
                    var o = {};
                    o.prototype.name = 'tom';
                    o.name = 'jack';
                    // delete o.name                    只有 delete 属性之后才会访问原型对象中的属性
                    console.log(o.name);                // jack
                2. 属性判断
                    1. hasOwnPrototype
                        person1.hasOwnPrototype('name');    // 判断 name 属性是否存在于实例中
                    2. in
                        console.log('name' in person1);     // 判断实例中是否有该属性
                    3. 判断属性是否是原型对象中的
                        function hasProrortypeProperty(obj, name){
                            return !obj.hasOwnPrototype(name) && (name in obj);
                        }
                    4. for-in
                        枚举对象的属性, 标记为 [[Enumerable]] 的属性不可枚举
                    5. Object.keys()
                        // 返回实例属性
                        console.log(person1);
                    6. Object.getOwnPropertyNames()
                        // 返回所有实例属性, 包含不可枚举的属性
                        // 将包含 constructor 等木刻枚举的属性
                        console.log(Object.getOwnPropertyNames(person1.prototype));
                3. 设置原型属性
                    function Person(){}
                    Person.prototype = {                    // 通过对象赋值的方式其实是重写了原型属性
                        // 手动指向 Person
                        // 此时的 construct [[Enumerable]] 特性为 true
                        constructor: Person,
                        name: 'sc',
                        age: 21
                    };
                    // 重新设置 construct 的特性
                    Object.defineProperty(Person.prototype, 'construct', {
                        enumerable: false,
                        value: Person
                    });









































