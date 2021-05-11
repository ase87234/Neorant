var state = {
    loadedOn: undefined,
    progress: 0, // 0 = loading screen, 1 = 59:59 to 00:10, 2 = 00:10 - 00:00, 3 = final page state after 00:00 
    entered: false,
    loggedIn: false,
    animations: {
        spinner: 0, // spinner animation checkpoint
        spinner__push: 0,
        spinner__slide: {
            active: 0,
            stop: 0
        }
    },
    giveawayData: {
        avatars__entered: [
            `https://media.discordapp.net/attachments/439829178683097088/787397896206155866/catimage.png`,
            `https://media.discordapp.net/attachments/439829178683097088/787397906608685096/download.png`,
            `https://media.discordapp.net/attachments/439829178683097088/787397907842203670/IMG_4907.JPG?width=449&height=630`,
            `https://media.discordapp.net/attachments/439829178683097088/787397911466082334/IMG_4908.JPG?width=504&height=630`,
            `https://media.discordapp.net/attachments/439829178683097088/787397916439478302/IMG_4909.JPG?width=1008&height=630`,
            `https://media.discordapp.net/attachments/439829178683097088/787397916577759321/face.png`,
            `https://media.discordapp.net/attachments/439829178683097088/787397921837547530/unknown_1.png`,
            `https://media.discordapp.net/attachments/439829178683097088/787397922039791646/dfgdfsgdsfg.png?width=630&height=630`,
            `https://media.discordapp.net/attachments/439829178683097088/787397928556822548/Untitled.png`,
            `https://media.discordapp.net/attachments/439829178683097088/787397939416006676/unknowwqergdgdsn.png`
        ],
        avatars__winner: null,
        winnerName: null
    },
    account: {
        username: `APeX Karliyone`,
        tag: `7283`,
        level: 48,
        tickets: 37.64,
        streak: 12,
        multiplier: {
            ticket: 1.46,
            xp: 1.46
        },
        objectives: [
            {
                reward: 'XP',
                amount: 100,
                objective: `Enter 1 Daily`,
                link: ``
            },
            {
                reward: 'XP',
                amount: 100,
                objective: `Roll 10 quickroll's`,
                link: ``
            },
            {
                reward: 'Ticket',
                amount: 1,
                objective: `Roll 5 quickroll's`,
                link: ``
            }
        ]
    }
}

var AppModels = (function() {

    return {
    };

})();

var AppViews = (function() {
    function canvas(action, boxCount) {

        var canvasDimensions = {
            width: document.querySelector('.app__canvas').offsetWidth,
            height: document.querySelector('.app__canvas').offsetHeight
        }
        
        var canvas = document.querySelector('.app__canvas--selector');
        
        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;
        
        var c = canvas.getContext('2d');
        
        // var colorArray = [
        //     '#994BE3',
        //     '#744EED',
        //     '#5156D5',
        //     '#4E7DED',
        //     '#4BA0E3'
        // ]

        var colorArray = [
            '#B31F15',
            '#BD1748',
            '#A61C8A',
            '#A217BD',
            '#6E15B3'
        ]
        
        function Circle(x, y, dx, dy, radius, num) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.num = num;
            this.radius = radius;
            this.minRadius = radius;
            this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
        
        
            this.draw = function() {

                    
                    c.fillStyle = this.color;

                    c.save()
                    // c.globalAlpha = 0.35;

                    c.beginPath()
                    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );           
                    c.fill();       

                    c.beginPath()
                    c.arc(canvasDimensions.width - this.x, this.y, this.radius, 0, Math.PI * 2, false );
                    c.fill(); 

                    c.beginPath()
                    c.arc(canvasDimensions.width - this.x, canvasDimensions.height - this.y, this.radius, 0, Math.PI * 2, false );
                    c.fill(); 

                    c.beginPath()
                    c.arc(this.x, canvasDimensions.height - this.y, this.radius, 0, Math.PI * 2, false );
                    c.fill();                  
                    c.restore()
                    

            }
        
            this.update = function() {
        
        
                if (this.x + this.radius > canvasDimensions.width || this.x - this.radius < 0) {
                    this.x = canvasDimensions.width / 2;
                    this.y = canvasDimensions.height / 2;
                    this.dy = -this.num*Math.random()/3 - 0.2;
                    this.dx = -this.num*Math.random()/2 - 0.3;
                    this.radius = 1*(Math.random() * 3 + 1);
                    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
                }
            
                if (this.y - this.radius < 0) {
                    this.x = canvasDimensions.width / 2;
                    this.y = canvasDimensions.height / 2;
                    this.dy = -this.num*Math.random()/3 - 0.2;
                    this.dx = -this.num*Math.random()/2 - 0.3;
                    this.radius = 1*(Math.random() * 3 + 1);
                    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
                } 

                this.x += this.dx;
                this.y += this.dy;
            }
        }
            var circleArray = [];
            
            function init(boxCount) {
            
                circleArray = [];
            
                for (var i = 0; i< boxCount; i++) {
            
                    var radius = 1*(Math.random() * 3 + 1);
                    var x = canvasDimensions.width / 2;
                    var y = canvasDimensions.height / 2;
                    var dy = -i*Math.random()/3 - 0.2;
                    var dx = -i*Math.random()/2 - 0.3;
                    var num = i;
                    circleArray.push(new Circle(x, y, dx, dy, radius, num ))
                }
            }
            
            function animate() {
                setTimeout(()=> {
                requestAnimationFrame(animate);    
                }, 20)
                c.clearRect(0,0,canvasDimensions.width,canvasDimensions.height);

                for(var i = 0; i < circleArray.length; i++ ) {
                    circleArray[i].draw();
                    circleArray[i].update();
                }

                var gradient = c.createRadialGradient(canvasDimensions.width / 2, canvasDimensions.height / 2, canvasDimensions.height / 15, canvasDimensions.width / 2, canvasDimensions.height / 2, canvasDimensions.height / 2 );
                gradient.addColorStop(0, 'rgb(14, 14, 27)');        
                // gradient.addColorStop(0, 'red');       
                gradient.addColorStop(1, 'rgba(14, 14, 27, 0)');
                c.fillStyle = gradient;
                c.arc(canvasDimensions.width / 2, canvasDimensions.height / 2, canvasDimensions.height / 2, 0, 2 * Math.PI);
                c.fill(); 
            };
            
            var animateFunc = false;
            if(animateFunc == false) {
                animate();
                animateFunc = true;    
                }
        
            if(action ==='init') {
                init(boxCount);
            }
    
    }

    var placeholdersArr = [];

    function spinnerCanvas(command) {

        var canvasDimensions = {
            width: document.querySelector('.app__spinner--internal').offsetWidth,
            height: document.querySelector('.app__spinner--internal').offsetHeight
        }

        var canvas = document.querySelector('.app__spinner--internal--canvas');
        
        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;
        
        var ctx = canvas.getContext('2d'),
            timelineObj = new timeline();

        function timeline() {
        
            // Variables for external Object
            let timelineDynamicVariables = {
                externalObjectDrawMethod: '.draw',
                externalObjectUpdateMethod: '.update'
            },
            // Private Variables belonging to each timeline
                timelineState = {
                active: false,
                start: undefined,
                duration: undefined,
                now: undefined
            },
            // Timeline animations to be ran & managed
                timelineAnimations = [
            ],
        
            // Instructions to be followed each loop
                instructions = function() {
                
        
                if(timelineState.now < timelineState.duration) {
                    // if current time is smaller than the timeline duration
                    for(let i = 0; i < timelineAnimations.length; i++) {
                        // Item delay, duration & now
                        let obj = timelineAnimations[i],
                            delay = obj.delay,
                            duration = obj.duration,
                            now = timelineState.now;
        
                        // Check if task should be run
                        if(delay <= now && delay + duration > now ) {
                            // Initialize values if first call
                            if(obj.firstCall) {
                                obj.firstCall = false;
        
                                obj.from = eval(obj.from);
                                obj.to = eval(obj.to);
                            }
        
                            // Run task
                            eval(`methods.${obj.task}(obj)`);
        
                            // Call Draw
                            ctx.clearRect(0, 0, canvasDimensions.width,canvasDimensions.height);
                            eval(`${obj.id}${timelineDynamicVariables.externalObjectDrawMethod}()`)
                            
        
                        } else if(delay + duration <= now) {
                            // If the timeline has passed the sum of the delay and duration of the animation, animation gets finalized & removed from the animations array.
                            methods.finalize(i, obj.target, obj.to, obj.id);
                        } ;
                        
                    };
                } else if(timelineState.now >= timelineState.duration) {
                    // if current time is bigger than or equal to timeline duration
                    timelineExit();
                }
            };
        
            // Method to run an animation on the timeline
            this.animate = function(id, target, from, to, duration, delay, timingFunction = 'none', task = 'shift') {
        
                // Check timeline existence
                if(timelineState.active) {
                    // if exists, update timeline
                    timelineUpdate(duration, delay)
                } else {
                    // if it timeline doesn't exist, initialize animation
                    timelineInit(duration, delay);
                }
        
                // Push animation data to animations array
                timelineAddAnimation(id, target, from, to, duration, delay, timingFunction, task);
            };
        
            // Timeline initializer
            function timelineInit(duration, delay = 0) {
                // Initialize this timeline to active
                timelineState.active = true;
        
                // Initialize timeline start point
                timelineState.start = Math.floor(performance.now());
        
                // Initialize timeline duration
                timelineState.duration = duration + delay;
        
                // Initialize animation loop
                loop();
            };
        
            // Timeline updater
            function timelineUpdate(duration, delay = 0) {
                // Check if current timeline duration is enough to invoke new task at given time and update accordingly.
                if(timelineState.duration < duration + delay) {
                    timelineState.duration = duration + delay;
                };
            };
        
            // Finds what the current time for time timeline is
            function timelineNow() {
                timelineState.now = Math.floor(performance.now()) - timelineState.start;
            };
        
            // Timeline "to animate" array pusher
            function timelineAddAnimation(id, target, from, to, duration, delay, timingFunction, task) {
                timelineAnimations.push(
                    {
                        id: id,
                        target: target,
                        from: from,
                        to: to,
                        duration: duration,
                        delay: delay,
                        timingFunction: timingFunction,
                        task: task,
                        firstCall: true
                    }
                );
            }
        
            // Exits & Deletes timeline. Loop is stopped.
            function timelineExit() {
                // Finalize all existing animations
                if(timelineAnimations.length > 0) {
                    for(let i = 0; i < timelineAnimations.length; i++) {
                        methods.finalize(i, timelineAnimations[i].target, timelineAnimations[i].to, timelineAnimations[i].id);
                    }            
                };
        
                // Stop loop
                timelineState.active = false;
            }
        
            // Animation methods
            let methods = {
                finalize: function(i, target, to, id) {
                    // extract to value aka end value
                    methods.extract(target, to, id);
        
                    // remove animation from animation array
                    timelineAnimations.splice(i, 1);
                },
                extract: function(target, at, id) {
                    // extract calculated data to the object
                    console.log(`id: ${id}`);
                    console.log(`${id}${timelineDynamicVariables.externalObjectUpdateMethod}('${target}', ${at})`)
                    eval(`${id}${timelineDynamicVariables.externalObjectUpdateMethod}('${target}', ${at})`);
                },
                shift: function(obj) {
                    let target = obj.target,
                        delay = obj.delay,
                        duration = obj.duration,
                        to = obj.to,
                        from = obj.from,
                        timingFunction = obj.timingFunction,
                        id = obj.id;
                    
                    // Find animation progress
                    let animationProgress = (timelineState.now - delay) / duration;
        
                    // extract value
                    methods.extract(target, obj.from + (eval(`timingFunctions.${timingFunction}(${animationProgress})`) * (to - from)), id);
                }
            }
        
            let timingFunctions = {
                none: function(k) {
                    return k;
                },
                easeInOut: function(k) {
                    return .5*(Math.sin((k - .5)*Math.PI) + 1);
                },
                easeIn: function(k) {
                    return Math.pow(k, 1.675);
                },
                easeOut: function(k) {
                    return 1 - Math.pow((1 - k), 1.675);
                }
            }
        
            // Animation loop
            function loop() {
                // Loop if timeline is active
                if(timelineState.active) {
                    setTimeout(() => {
                        requestAnimationFrame(loop);        
                    }, 20);
                    // Current timeline time finder
                    timelineNow();
        
                    // Process Instructions 
                    instructions();
                };
            };
        
        };
        
        

        function Placeholders(radius, x, y, color, opacity, id) {

            this.radius = radius;
            this.x = x;
            this.y = y;
            this.opacity = opacity;
            this.color = color;
            this.id = id;

            this.update = function(target, val) {
                eval(`this.${target} = ${val}`);
                this.color = `rgba(26, 26, 38, ${this.opacity})`;
            };

            this.draw = function() {
                for(let i = 0; i < placeholdersArr.length; i++) {
                ctx.fillStyle = placeholdersArr[i].color;
                ctx.beginPath()
                ctx.arc(placeholdersArr[i].x, placeholdersArr[i].y, placeholdersArr[i].radius, 0, Math.PI * 2, false );           
                ctx.fill();                    
                };
            };
        }

        Placeholders.prototype.shift = function(target, from, to, duration, delay, timingFunction, task) {
            timelineObj.animate(`${this.id}`, target, from, to, duration, delay, timingFunction, 'shift');
            return this;
        }

    

        function drawPlacerholders(i) {
            for(let j = 0; j <= i; j++) {
                let radius = 25,
                    x = j*50 + 25,
                    y = 25,
                    opacity = 0,
                    color = `rgba(26, 26, 38, ${opacity})`;
                placeholdersArr.push(new Placeholders(radius, x, y, color, opacity, `placeholdersArr[${j}]`));  
                console.log(`placeholdersArr[${j}]`);
                eval(`placeholdersArr[${j}].shift('opacity', 0, 1, 1000, ${j*200 + 500}, 'easeInOut' )`);
            }
        };

            

        function activateSpinner(i) {
            
            // push placeholders up
            for(let j = 0; j <= i; j++) {
                console.log(placeholdersArr)
                console.log(j)
                console.log(placeholdersArr[j])
                placeholdersArr[j].shift('y', `placeholdersArr[${j}].y`, -25, 1000, 0, 'easeInOut' );
            }
        }

        if(command === 'drawPlaceholders') {
            setTimeout(() => {
                drawPlacerholders(canvasDimensions.width/50 + 2);
            }, 2000)            
        } else if(command === 'activateSpinner') {
            console.log('works?')
            activateSpinner(canvasDimensions.width/50 + 2)
        }

    }

    function fillObjectives() {
        let render = ` `;

        // loop to setup data
        for( let i = 0; i < 3; i++ ) {
        let template = `
        <div class="objectives__item" onclick="location.href='${state.account.objectives[i].link}'" >
            <div class="objectives__item--reward gradientText">
                +${state.account.objectives[i].amount}
            </div>
            <div class="objectives__item--rewardType">
                ${state.account.objectives[i].reward}
            </div>
            <div class="objectives__item--task">
                ${state.account.objectives[i].objective}
            </div>
        </div>
        `;

        console.log(template)
        render = render.concat(template);
        }

        document.querySelector('.objectives__list').innerHTML = render;
    }

    function fillAccount() {
        // Fill Username & tag
        document.querySelector('.account__username').innerHTML = `${state.account.username} <span>#${state.account.tag}</span>`;

        // Fill level
        document.querySelector('.account__level').innerHTML = `Level ${state.account.level}`;

        // Fill tickets
        document.querySelector('.selector--ticketCount').innerHTML = `${state.account.tickets}`;

        // Fill streak
        document.querySelector('.selector--streakCount').innerHTML = `${state.account.streak}`;        

        // Fill multipliers
        document.querySelector('.selector--ticketMultiplier').innerHTML = `x${state.account.multiplier.ticket}`;
        document.querySelector('.selector--xpMultiplier').innerHTML = `x${state.account.multiplier.xp}`;
    }

    return {
        canvasPublic: function() {
            canvas('init', 40);
        },
        //change 
        spinnerPlaceholderDraw: function() {
            spinnerCanvas('drawPlaceholders');
        },  
        timerUpdate: function(i) {
            let min = Math.floor(i / 60),
            sec = i % 60;

            if(min !== 0) {
                document.querySelector('.app__spinner--time').innerHTML = `<span>${min}</span>m <span>${sec}</span>s`;
            } else {
                document.querySelector('.app__spinner--time').innerHTML = `<span>${sec}</span>s`;
            }        
        },
        timerColorChange: function() {
            // Apply color changes
            document.querySelector('.app__spinner--time').style.color = `rgba(228, 54, 100, 1)`;
            document.querySelector('.app__spinner--time').style.textShadow= `0 0 2rem rgba(228, 54, 100, 1)`;
        },
        timerRemove: function() {
            // Remove Init animation class
            document.querySelector('.app__spinner--time').classList.remove('app__spinner--time--init-animation');
            // Add Remove animation class
            document.querySelector('.app__spinner--time').classList.add('app__spinner--time--remove');
        },
        enterInit: /* NEEDS CHECK */ function() {
            // Give enter button a time out
            // setTimeout(() => {
            // document.querySelector('.app__enter').style.display = 'inline-block';
            //     setTimeout(() => {
            //         document.querySelector('.app__enter--bg').style.display = 'inline-block';
            //             setTimeout(() => {
                            
            //                 // Block clicking until animation goes half way
            //                 document.querySelector('.app__enter').style.pointerEvents = 'auto';
            //             }, 1000)
            //     }, 1000)    
            // }, 600)
            
        },              
        enterRemove: /* NEEDS CHECK */ function() {
            // Remove cursor change on hover
            document.querySelector('.app__enter').classList.remove('cursor-pointer');
            // Remove enter button
            document.querySelector('.app__enter').classList.add('app__enter--remove');            
            // Activate hover state on a hover effect
            // document.querySelector('.app__enter--effect').classList.add('app__enter--effect--hovereffect');
        },
        preSpinBoxAdd: function() {

            // Random Text lists
            let visitorList = [
                `You probably lost lel`,
                `You could've won this one!`,
                `Karma is tired`
            ];

            let enteredList = [
                `You're in!`,
                `Shit cakes!`,
                `N word?????`
            ];

            // Modify pre spin box text
            if(state.entered) {
                document.querySelector('.app__pre-spin--text').innerHTML = enteredList[Math.floor(Math.random()*enteredList.length)];
            } else {
                document.querySelector('.app__pre-spin--text').innerHTML = visitorList[Math.floor(Math.random()*visitorList.length)];
            }

            // Display pre spin box
            document.querySelector('.app__pre-spin').style.display = 'inline-block';
        },
        spinnerActivate: /* NEEDS CHECK */ function() {


            // Print Visible Avatars
            spinnerCanvas('activateSpinner');

            // Update State for Animations to run

        },
        greetingTitle: function() {

            //get hours of the day in 24Hr format (0-23)
            var hr = (new Date()).getHours(),
            time;

            // set time of the day depending on hour
            if(hr > 6 && hr <= 11) {
                time = 'Morning';
            } else if( hr > 11 && hr <= 16) {
                time = 'Afternoon'
            } else if(hr > 16 && hr <= 24) {
                time = 'Evening'
            } else if(hr > 0 && hr <= 11) {
                time = 'Night'
            }

            let greetingsList = [
                `Welcome back.`,
                `G'day Captain.`,
                `Lucky ${time}?`,
                `Good ${time}.`
            ];

            // Modify account title text
                document.querySelector('.account--title').innerHTML = greetingsList[Math.floor(Math.random()*greetingsList.length)];
        },
        loggedInMode: function() {
            // fill content
            fillAccount();
            fillObjectives();

            // make logged in section visible
            document.querySelector('.loggedin').style.display = 'inline-block';
            document.querySelector('.visitor').style.display = 'none';
        },
        visitorMode: function() {
            // make visitor section visible
            document.querySelector('.loggedin').style.display = 'none';
            document.querySelector('.visitor').style.display = 'inline-block';
        }

    };

})();

var AppController = (function(AppModels, AppViews) {

    // TIME CONTROLLER
    function timer(action) {
    var counterTimeoutid,
    currentTime, // ms
    previousTime, // ms
    trigger10 = false,
    triggerNeg1 = false,
    initTimeLeft = 20000 //ms

    function counter() {
        counterTimeoutid = setTimeout(counter, 100);   
        currentTime = Math.round((initTimeLeft - (new Date().valueOf() - state.loadedOn)) / 1000);

        // Update Timer if the time has changed
        if(previousTime !== currentTime && currentTime > -1) {
            // Switch out previousTime with currentTime
            previousTime = currentTime;

            // Format data & update HTML
            AppViews.timerUpdate(currentTime);
        }

        // Time triggered functions

        if(currentTime <= 10 && currentTime > -1) {

            // Timer Color Change
            AppViews.timerColorChange();

            // Trigger Check 
            if(!trigger10) {
                // Update Trigger
                trigger10 = true;
                AppViews.spinnerActivate();

                // Lock Enter Button
                AppViews.enterRemove();

                // Display 10sec Text
                AppViews.preSpinBoxAdd()

                // Fetch Giveaway Results


            }

        } else if(currentTime == -1) {

            //Trigger Check
            if(!triggerNeg1) {
                // Update Trigger
                triggerNeg1 = true;

                // Timer Remove From Display
                AppViews.timerRemove();

                // Activate Raffle Spinner
                state.animations.spinner = 1; // spinner canvas animations are tied to this and will auto activate as this number gets updated.
                // AppViews.spinnerActivate();

            }
        }
    }
        function startCount () {
                counter();
        };

        function stopCount() {
            clearTimeout(counterTimeoutid);
        };

        if(action === 'start') startCount();
        if(action === 'stop') stopCount();
    };

    function setupEventListeners() {
        // Enter Giveaway Click Listener
        document.querySelector('.app__enter--body').addEventListener('click', AppViews.loggedInMode);
        document.querySelector('.app__enter--hoverOption#n1').addEventListener('click', AppViews.loggedInMode);

        // Collect Ticket Listener
        document.querySelector('.app__enter--hoverOption#n2').addEventListener('click', AppViews.loggedInMode);

        // Login Listener
        document.querySelector('.loginListener').addEventListener('click', AppViews.loggedInMode);

        // Register Listener
        document.querySelector('.registerListener').addEventListener('click', AppViews.loggedInMode);

    };

    function loadTime() {
        state.loadedOn = new Date().valueOf(); // or date the time was created on the server
    };

    function initLoginCheck() {
        if(state.loggedIn) {
            AppViews.loggedInMode();
        } else {
            AppViews.visitorMode();
        }
    };

    return {
        init: function() {
            loadTime();
            timer('start');
            setupEventListeners()
            initLoginCheck();
            AppViews.enterInit();
            AppViews.greetingTitle();
            setTimeout(() => {
                document.querySelector('.webWrapper').style.display = 'inline-block'
                AppViews.canvasPublic()
                AppViews.spinnerPlaceholderDraw();
            }, 2000)
            
        }
    };

})(AppModels, AppViews);

AppController.init()