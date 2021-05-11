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
        username: `seniorquico`,
        tag: `5183`,
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
    function spinnerCanvas() {
        
        var canvasDimensions = {
            width: document.querySelector('.app__spinner--internal').offsetWidth,
            height: document.querySelector('.app__spinner--internal').offsetHeight
        }

        var canvas = document.querySelector('.app__spinner--internal--canvas');
        
        canvas.width = canvasDimensions.width;
        canvas.height = canvasDimensions.height;
        
        var c = canvas.getContext('2d'); // Could cause heaping problems 

        var objectArray = [],
            canvAnimate = 0, // 0 activates animation loop once, 1 blocks animation loop from being re-called, 2 stops animation loop.
            avatarTrigger = 0,
            objectID = function() {
                return objectArray.length
            };

        // Draw Placeholders

            function Placeholder(id, x, y, radius, color, opacity, toX, toY, toOpacity) {
                this.id = id;
                this.x = x;
                this.y = y;
                this.opacity = opacity;
                this.radius = radius;
                this.color = color;
                this.toX = toX;
                this.toY = toY;
                this.toOpacity = toOpacity;
                this.animationProgress = 0;
                this.animatedOpacity = this.opacity;
                this.placeHolderAppearAnimation = 1;
                console.log(this.id)

                this.draw = function() {
                            
                    c.fillStyle = this.color;
                    c.beginPath()
                    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false );           
                    c.fill();
                }
            
                this.update = function() {
                    // Appear Animation
                    if(this.placeHolderAppearAnimation == 1) {
                        this.animationProgress += 0.02;

                        if(this.animationProgress == 1) {
                            this.placeHolderAppearAnimation = 0;
                            this.animatedOpacity = 1;    
                    }

                    // Animation Progress Update

                    this.animatedOpacity = (this.toOpacity - this.opacity) * this.animationProgress;
                    this.color = `rgba(26, 26, 38, ${this.animatedOpacity})`;

                    }

                    // Push Placeholders Up
                    if(state.animations.spinner__push == 1 && this.y <= 25 && this.y > -25) {
                        this.y -= .5;

                        
                    } else if(state.animations.spinner__push == 1 && this.y == -25) {

                    }

                }
            };

            function Avatar(id, x, y, radius, color, opacity, toX, toY, toOpacity, avatar, source) {
                this.id = id;
                this.x = x;
                this.y = y;
                this.opacity = opacity;
                this.radius = radius;
                this.color = color;
                this.toX = toX;
                this.toY = toY;
                this.toOpacity = toOpacity;
                this.animationProgress = 0;
                this.animatedOpacity = this.opacity;
                this.active = 1;
                this.avatar = avatar;
                this.avatar.src = source;
                this.initSpeed = 1.25
                this.speed = this.initSpeed;
                this.progressAxis = 1;
                this.progressAxisStop0 = 0;
                this.progressAxisStop0__traveled = 0;
                this.animationStop = 0

                this.speedUpdate = function() {

                    function easeInOut (k) {
                        return .5*(Math.sin((k - .5)*Math.PI) + 1);
                    };      

                    this.progressAxis -= 0.0125;

                    this.y =  Math.max(Math.min(easeInOut(this.progressAxis)*50, 50), 0);
                    
                };

                this.slideAnimation = function() {
                    if(this.animationStop == 1) {
                        if(this.progressAxis < 1) {
                            this.progressAxis += 0.02;
                            this.x += 1;
                        } else if(this.progressAxis >= 1) {
                            this.progressAxis = 1;
                            this.animationStop = 1;
                        }

                    } else if(this.animationStop == 0) {

                        if(this.x <= -50 && this.x >= -100) {
                            this.x = this.x + 100 + canvasDimensions.width;
                            this.avatar.src = state.giveawayData.avatars__entered[Math.floor(Math.random()*state.giveawayData.avatars__entered.length)];
                        };

                        if(this.progressAxisStop0 < 1) {
                            this.progressAxisStop0 += 0.001;

                            function easeInOut (k) {
                                return .5*(Math.sin((k - .5)*Math.PI) + 1);
                            };

                            var toTravel = easeInOut(this.progressAxisStop0.toFixed(3))*canvasDimensions.width*20
                            this.x -= toTravel - this.progressAxisStop0__traveled;
                            this.progressAxisStop0__traveled = toTravel;
                            
                            // object 17 will be in the middle on 750 width

                            // object 10 will be in the middle on 250 width

                            // if(this.id > 5) {
                            //     console.log(this.id + ' ' + this.x + ' || ' + this.avatar.src);
                            // }
                            
                        } 


                    }
                    

                };

                this.draw = function() {
                    if(this.x > -50 && this.x < canvasDimensions.width + 50) {
                    c.save();
                    c.beginPath();
                    c.arc(this.x, this.y + 25, this.radius, 0, Math.PI * 2, false );   
                    c.clip();
                    c.drawImage(this.avatar, this.x - 25, this.y, 50, 50);
                    c.restore();
                    }
                }

                this.update = function() {

                    if(state.animations.spinner__push == 1 && this.progressAxis > 0 ) {
                        this.speedUpdate();

                        if(this.y <= 0) {
                            this.y = 0;
                            this.progressAxis = 0;
                            console.log('progress updated')
                        };

                    } else if(state.animations.spinner__push == 1 && this.y == 0) {
                        setTimeout(() => {
                            state.animations.spinner__slide.active = 1;
                            state.animations.spinner__push = 0;
                        }, 1337)
                    }
                    if(this.id == 20) {
                        console.log(this.x);    
                        }


                    if(state.animations.spinner__slide.active == 1) {
                        this.slideAnimation();
                    }
                }
            };

            function placeholderActivate(amount) {

                let intID = setInterval(printPlaceholder, 100),
                intCount = 0;
                
                function printPlaceholder() {
                    if(intCount < amount) {
                        var radius = 25;
                        var x = intCount*50 + 25;
                        var y = 25;
                        var opacity = 0;
                        var toOpacity = 1;
                        var color = `rgba(26, 26, 38, ${opacity})`;
                        objectArray.push(new Placeholder(objectID(), x, y, radius, color, opacity, 0, 0, toOpacity))
                        intCount++;
                    } else {
                        clearInterval(intID);
                    }  
                }
            }

            function avatarDraw(amount) {
                var intCount;
                for(intCount = 0; intCount < amount; intCount++) {
                    var radius = 25;
                    var x = intCount*50 - 25;
                    var y = 50;
                    var opacity = 0;
                    var toOpacity = 1;
                    var color = `rgba(26, 26, 38, ${opacity})`;
                    var avatar = new Image();
                    var source = state.giveawayData.avatars__entered[Math.floor(Math.random()*state.giveawayData.avatars__entered.length)];
                    objectArray.push(new Avatar(objectID(), x, y, radius, color, opacity, 0, 0, toOpacity, avatar, source ));
                }
            }


            if(canvAnimate == 0) {

            // Activate animation
            function animate() {
                if(canvAnimate !== 2) {
                    setTimeout(()=> {
                    requestAnimationFrame(animate);        
                    }, 20)
                c.clearRect(0,0,canvasDimensions.width,canvasDimensions.height);
                }

                if(state.animations.spinner == 1 && avatarTrigger == 0) {
                    avatarDraw(canvasDimensions.width/50 + 2);
                    avatarTrigger = 1;
                    setTimeout(() => {
                        state.animations.spinner__push = 1;
                    }, 1337)
                }

                for(var i = 0; i < objectArray.length; i++ ) {
                    objectArray[i].draw();
                    objectArray[i].update();
                }
            };

            // Lock this function
            canvAnimate = 1;
            }

            placeholderActivate(canvasDimensions.width/50);
            animate();
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
            spinnerCanvas('placeholderActivate');
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
            spinnerCanvas();

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
    initTimeLeft = 50000 //ms

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
                // AppViews.spinnerActivate(); --- fix this shit

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