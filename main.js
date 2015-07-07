// ==UserScript==
// @name Neverwinter gateway - Professions Robot
// @description Automatically selects professions for empty slots
// @namespace https://greasyfork.org/scripts/9812-neverwinter-gateway-professions-robot/
// @include http://gateway*.playneverwinter.com/*
// @include https://gateway*.playneverwinter.com/*
// @include http://gateway.*.perfectworld.eu/*
// @include https://gateway.*.perfectworld.eu/*
// @require https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js
// @resource jqUI_CSS https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/cupertino/jquery-ui.css
// @originalAuthor Mustex/Bunta
// @modifiedBy NW gateway Professions Bot Developers & Contributors

// @version 4.2
// @license http://creativecommons.org/licenses/by-nc-sa/3.0/us/
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==

/*
Developers & Contributors
- BigRedBrent
- Bluep
- dlebedynskyi
- Frankescript
- Kakoura
- mac-nw
- Nametaken
- noonereally
- Numberb
- Phr33d0m
- Rotten_mind
- WloBeb

RELEASE NOTES
4.2
- Added "Resource Tracker" tab
- Added "to buy" notification for missing resources
- Added new professions & some hotfixes for some profiles
- New profile syntax
- addProfile() functionality changed a bit to adapt to our new profile syntax
- A lot of fixes here and there
4.1
- Added failsafe to prevent script getting stuck when can't claim task result
- AddProfile() improved (thanks dlebedynskyi)
- Added Failed task tracker to prevent script lockup on failed tasks
- Added settings copy tab
- Added script version display
- Added Settings Listing to Advanced tab
- Added Item Listing to Advanced tab (thanks WloBeb script idea)
- Override display at visit tab
- Various fixes
4.0
- Per slot task & profile allocation tab (functional)
- Settings are saved per account / char.
- Settings are saved via event - should fix the freeze (save button removed).
- Chars always loaded from the model.
- Settings UI updated on log in.
- UI functions add for easier refactoring
- Per char setting override.
- Per char automatic daily SCA.
- Profession next visit tab + reset added.
- Inital support for multiple tab run in the same browser.
- Translation support (thanks WloBeb)
- Profile adjustments
- addProfile() for easier profiles (thanks WloBeb, dlebedynskyi)

Check Changelog.txt for the full changelog:
http://rawgit.com/Phr33d0m/NW-Profession-Bot/master/Changelog.txt
 */

// Make sure it's running on the main page, no frames

var scriptVersion = 4.2;
var forceSettingsResetOnUpgrade = true;
var forceResetOnVerBelow = 3.5;

if(window.self !== window.top) {
    throw "";
}
var current_Gateway = _select_Gateway(); 
// Set global console variables
var fouxConsole = {
    log: function() {},
    info: function() {},
    error: function() {},
    warn: function() {}

};
var console = unsafeWindow.console || fouxConsole;
var chardiamonds = [];
var zaxdiamonds = 0;
var chargold = [];
var definedTask = {};
var translation = {};
var failedTasksList = [];
var failedProfiles = {};
var collectTaskAttempts = new Array(9); var k = 9; while (k) {collectTaskAttempts[--k] = 0};    //collectTaskAttempts.fill(0); js6 
var antiInfLoopTrap = {// without this script sometimes try to start the same task in infinite loop (lags?) 
    prevCharName: "unknown", // character name which recently launched a task
    prevTaskName: "unknown", // name of the task previously launched
    startCounter: 0, // how many times the same character starts the same task 
    currCharName: "unknown", // character name which try to launch new task
    currTaskName: "unknown", // name of the new task to launch
    trapActivation: 15 // number of repetition to activation trap 
};
var pleaseBuy = [];
// Page Reloading function
// Every second the page is idle or loading is tracked
var loading_reset = false; // Enables a periodic reload if this is toggled on by the Auto Reload check box on the settings panel
var s_paused = false; // extend the paused setting to the Page Reloading function

// Include JqueryUI CSS
var jqUI_CssSrc = GM_getResourceText("jqUI_CSS");
/*jqUI_CssSrc = jqUI_CssSrc.replace (/url\(images\//g, "url(https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/dark-hive/images/");*/
jqUI_CssSrc = jqUI_CssSrc.replace(/url\(images\//g, "url(https://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/cupertino/images/");
jqUI_CssSrc = jqUI_CssSrc.replace(/font-size: 1\.1em/g, "font-size: 0.9em");
GM_addStyle(jqUI_CssSrc);


function _select_Gateway() { // Check for Gateway used to
    if(window.location.href.indexOf("gatewaytest") > -1) { // detect gatewaytest Url
        console.log("GatewayTEST detected");
        return "http://gatewaytest.playneverwinter.com";
    } else if(window.location.href.indexOf("nw.ru.perfectworld") > -1) {
        console.log("GatewayRU detected");
        return "http://gateway.nw.ru.perfectworld.eu";
    } else { // must go somewhere
        console.log("Gateway detected");
        return "http://gateway.playneverwinter.com";
    }
}

(function() {
    var $ = unsafeWindow.$;

    //MAC-NW
    $.fn.waitUntilExists = function(handler, shouldRunHandlerOnce, isChild) {
        var found = 'found';
        var $this = $(this.selector);
        var $elements = $this.not(function() {
            return $(this).data(found);
        }).each(handler).data(found, true);
        if (!isChild) {
            (window.waitUntilExists_Intervals = window.waitUntilExists_Intervals || {})[this.selector] = window.setInterval(function() {
                $this.waitUntilExists(handler, shouldRunHandlerOnce, true);
            }, 500);
        } else if (shouldRunHandlerOnce && $elements.length) {
            window.clearInterval(window.waitUntilExists_Intervals[this.selector]);
        }
        return $this;
    }
    // MAC-NW - Wait for tooltip to come up so we can alter the list
    $('.tooltip-menu button').waitUntilExists(function() {
        // Tooltip has open menu itemtooltip
        if ($('button.tooltip-menu button[data-url-silent^="/inventory/item-open"]') && !$('.tooltip-menu div.tooltip-openall').length && !$('.tooltip-menu button[data-url-silent^="/inventory/item-open"]').hasClass('disabled'))
            try {
                var thisItem = eval("client.dataModel.model." + $('.tooltip-menu button[data-url-silent^="/inventory/item-open"]').attr('data-url-silent').split("=")[1]);
                if (thisItem.count > 1) {
                    if (thisItem.count >= 99)
                        thisItem.count = 99;
                    var openAllClick = "for (i = 1; i <= " + thisItem.count + "; i++){ window.setTimeout(function () {client.sendCommand('GatewayInventory_OpenRewardPack', '" + thisItem.uid + "');}, 500); }";
                    $('div.tooltip-menu').append('<div class="input-field button menu tooltip-openall"><div class="input-bg-left"></div><div class="input-bg-mid"></div><div class="input-bg-right"></div>\
                        <button class="&nbsp;" onclick="' + openAllClick + '">Open All (' + thisItem.count + ')</button></div>');
                    //$('a.nav-dungeons').trigger('click'); window.setTimeout(function(){ $('a.nav-inventory').trigger('click'); },2000);
                }
            } catch (e) {
                console.log("ERROR: Did not succeed to add open all tooltip.");
            }
    });

    $('.vendor-quantity-block span.attention').waitUntilExists(function() {
        if ($('.vendor-quantity-block span.attention span').length)
            $('.vendor-quantity-block span.attention').replaceWith('<div class="input-field button"><div class="input-bg-left"></div><div class="input-bg-mid"></div><div class="input-bg-right"></div><button onclick="$(\'.modal-confirm input\').val(\'' + $(".vendor-quantity-block span.attention span").text() + '\');">All (' + $(".vendor-quantity-block span.attention span").text() + ')</button></div>');
    });

    $('div.notification div.messages li').waitUntilExists(function() {
        if ($("div.notification div.messages li").length > 2)
            $("div.notification div.messages li").eq(0).remove();
    });

    // Always disable SCA tutorial if its active
    $('#help-dimmer.help-cont.whenTutorialActive').waitUntilExists(function() {
        client.toggleHelp();
    });

    //MAC-NW

    var state_loading = 0; // If "Page Loading" takes longer than 30 seconds, reload page (maybe a javascript error)
    var state_loading_time = 30; // default of 30 seconds
    var state_idle = 0; // If the page is idle for longer than 60 seconds, reload page (maybe a javascript error)
    var state_idle_time = 120; // default of 120 seconds
    var reload_hours = [2, 5, 8, 11, 14, 17, 20, 23]; // logout and reload every three hours - 2:29 - 5:29 - 8:29 - 11:29 - 14:29 - 17:29 - 20:29 - 23:29
    var last_location = ""; // variable to track reference to page URL
    var reload_timer = setInterval(function() {
        if (!s_paused) {
            if (antiInfLoopTrap.startCounter >= antiInfLoopTrap.trapActivation) {
                unsafeWindow.location.href = current_Gateway;
                return;
            }
            if (loading_reset) {
                var loading_date = new Date();
                var loading_sec = Number(loading_date.getSeconds());
                var loading_min = Number(loading_date.getMinutes());
                var loading_hour = Number(loading_date.getHours());
                if (reload_hours.indexOf(loading_hour) >= 0 && loading_min == 29 && loading_sec < 2) {
                    console.log("Auto Reload");
                    unsafeWindow.location.href = current_Gateway;
                    return;
                }
            }

            // check for errors
            if ($("title").text().match(/Error/) || $("div.modal-content h3").text().match(/Disconnected/)) {
                console.log("Error detected - relogging");
                unsafeWindow.location.href = current_Gateway;
                return;
            }

            if ($("div.loading-image:visible").length) {
                last_location = location.href;
                state_idle = 0;
                if (state_loading >= state_loading_time) {
                    console.log("Page Loading too long");
                    state_loading = 0;
                    location.reload();
                } else {
                    state_loading++;
                    console.log("Page Loading ...", state_loading + "s");
                }
            }
            // TODO: Add check for gateway disconnected
            //<div class="modal-content" id="modal_content"><h3>Disconnected from Gateway</h3><p>You have been disconnected.</p><button type="button" class="modal-button" onclick="window.location.reload(true);">Close</button>


            /* Can't use idle check with dataModel methods
                else if (location.href == last_location) {
                state_loading = 0;
                if (state_idle >= state_idle_time) {
                console.log("Page Idle too long");
                state_idle = 0;
                unsafeWindow.location.href = current_Gateway ; // edited by RottenMind
                }
                else {
                state_idle++;
                // comment out to avoid console spam
                //console.log("Page Idle ...", state_idle + "s");
                }
                }
                 */
            else {
                last_location = location.href;
                state_loading = 0;
                state_idle = 0;
            }
        }
    }, 1000);
})();

(function() {

    addTranslation();

    /**
     * Add a string of CSS to the main page
     *
     * @param {String} cssString The CSS to add to the main page
     */

    function AddCss(cssString) {
        var head = document.getElementsByTagName('head')[0];
        if (!head)
            return;
        var newCss = document.createElement('style');
        newCss.type = "text/css";
        newCss.innerHTML = cssString;
        head.appendChild(newCss);
    }

    function countLeadingSpaces(str) {
        return str.match(/^(\s*)/)[1].length;
    }

    // Setup global closure variables
    var $ = unsafeWindow.jQuery;
    var timerHandle = 0;
    var dfdNextRun = $.Deferred();
    var curCharNum = 0; // current character counter
    var lastCharNum = curCharNum;
    var curCharName = '';
    var curCharFullName = '';
    var chartimers = {};
    var maxLevel = 25;
    var waitingNextChar = false;
    var delay = {
        SHORT: 1000,
        MEDIUM: 5000,
        LONG: 30000,
        MINS: 300000,
        DEFAULT: 10000, // default delay
        TIMEOUT: 60000, // delay for cycle processing timeout
    };

    var lastDailyResetTime = null;


    // Forcing settings clear !
    var ver = parseFloat(GM_getValue("script_version", 0));
    
    if ((ver < forceResetOnVerBelow) && forceSettingsResetOnUpgrade) {
        var str = "Detected an upgrade from old version or fresh install.<br />Procceding will wipe all saved settings.<br />Please set characters to active after log in.";  
        $('<div id="dialog-confirm" title="Setting wipe confirm">' + str + '</div>').dialog({
              resizable: true,
              width: 500,
              modal: false,
              buttons: {
                "Continue": function() {
                    $( this ).dialog( "close" );
                    window.setTimeout(function() {
                        var keys = GM_listValues();
                        for (i = 0; i < keys.length; i++) {
                            var key = keys[i];
                            GM_deleteValue(key);
                        }
                        GM_setValue("script_version", scriptVersion);
                        window.setTimeout(function() {
                            unsafeWindow.location.href = current_Gateway;
                        }, 50);
                    }, 0);
                },
                Cancel: function() {
                  $( this ).dialog( "close" );
                }
              }
            });        
        return;
    }


function addProfile(profession, profile, base){
    maxLevel = maxLevel || 25;
    definedTask = definedTask || {};
    //general prototype for profession
    var professionBase = {
        taskListName:  typeof(profession) ==='string' ? profession : profession.taskListName, // Friendly name used at the UI
        taskName: typeof(profession) ==='string' ? profession : profession.taskName, // String used at the gateway
        taskDefaultPriority: 2, // Priority to allocate free task slots: 0 - High, 1 - Medium, 2 - Low
        taskActive: true,
        taskDefaultSlotNum: 0,
        taskDescription: "",
        profiles: []
    };

    

    //creating new profession or using existing one 
    var professionSet = (typeof profession === 'object')
        ? jQuery.extend(true, professionBase, profession)
        : definedTask[profession] || professionBase;
    
    if(!professionSet) {return;}
    if(!definedTask[profession]) {definedTask[profession] = professionSet;}
    if(!profile) {return;}

    //profile prototype
    var profileBase = {
        profileName: 'Add profile name',
        isProfileActive: true,
        level: {}
    };
    
    //getting new profile formated
    var newProfile = jQuery.extend(true, profileBase, profile),
        baseProfile;
    //getting base to extend
      base = base ||  (professionSet.taskListName === 'Leadership' ? 'XP' : 'default');
      if(base && typeof base === 'string') {
        var existing = professionSet.profiles.filter(function(e) {return e.profileName === base;});
        if(existing && existing.length) {baseProfile = existing[0];}
      }
    

    //setting levels
    var baseLevels = baseProfile ? baseProfile.level : [],
        rec = 0;
    for(var i = 0; i <= maxLevel; i++) {
      //recur has priority
      if (rec > 0 ){ 
        rec -=1;
        //setting empty array to handle later by fallback
        newProfile.level[i] = newProfile.level[i] || [];
      }
      
      if(newProfile.level && newProfile.level[i]){
            //override for arrays
            if (Array.isArray(newProfile.level[i]) && newProfile.level[i].length){
              //cancel rec since new array is defined
               rec  = 0;
              //process array
              var ind = newProfile.level[i].indexOf('+');
              if (ind>-1){
                var def = newProfile.level[i].splice(0, ind);
                var tail = newProfile.level[i].splice(1, newProfile.level[i].length);
                def = def.concat(baseLevels[i] || [], tail || []);
                newProfile.level[i] = def;
              }
              
            }//process '+N'
            else if (typeof newProfile.level[i] == 'string'
                  && newProfile.level[i][0] === '+'){
                  rec = parseInt(newProfile.level[i].replace(/\D/g,''));  
                  rec = rec > 0 ? rec : 0;
                  //setting empty array to handle later by fallback
                  newProfile.level[i] = [];
                  rec -=1;
            }
      }
      //falback to base if not defined
      else{
         var baseLevel = baseLevels[i] || [];
         newProfile.level[i] = baseLevel;
      }
        
      //fallback from empty array to copy one before
      if (Array.isArray(newProfile.level[i]) && !newProfile.level[i].length && i> 0){
        newProfile.level[i] = newProfile.level[i-1];
      }
    }
    
    console.info("profile added ",newProfile.profileName, newProfile);
    professionSet.profiles.push(newProfile);
}
   

    /*
     * Tasklist can be modified to configure the training you want to perform.
     * The configurable options window sets how many profession slots you want to use for each profession.
     * The level array below for each professions specifies the tasks you want to learn at each crafting level.
     * Each craft slot will pick the first task that meets requirements.
     * See http://pastebin.com/VaGntEha for Task Name Map.
     * Some names above do not match, use below code to check:
     * var tasks = client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) { return entry.def && entry.def.displayname == taskname; }); tasks[0].def.name;
     */

    definedTask["Leadership"] = {
        taskListName: "Leadership", // Friendly name used at the UI, have to be the same as key in definedTask array!!!
        taskName: "Leadership", // String used at the gateway
        taskDefaultPriority: 2, // Priority to allocate free task slots: 0 - High, 1 - Medium, 2 - Low
        taskActive: true,
        taskDefaultSlotNum: 9,
        taskDescription: "",
        profiles: [{
            profileName: "AD",
            isProfileActive: true,
            level: {
                0: ["Leadership_Tier0_Intro_1"],
                1: ["Leadership_Tier0_Intro_5", "Leadership_Tier0_Intro_4", "Leadership_Tier0_Intro_3", "Leadership_Tier0_Intro_2"],
                2: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                3: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                4: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                5: ["Leadership_Tier1_4_Protect", "Leadership_Tier1_5_Explore", "Leadership_Tier1_2_Guardduty"],
                6: ["Leadership_Tier1_4_Protect", "Leadership_Tier1_5_Explore", "Leadership_Tier1_2_Guardduty"],
                7: ["Leadership_Tier1_4_Protect", "Leadership_Tier1_5_Explore", "Leadership_Tier1_2_Guardduty"],
                8: ["Leadership_Tier1_4_Protect", "Leadership_Tier1_5_Explore", "Leadership_Tier1_2_Guardduty"],
                9: ["Leadership_Tier1_4_Protect", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                // Begin prioritizing "Battle Undead"
                10: ["Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                11: ["Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                12: ["Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                // Add "protect diamonds rare" and the patrol quest as a backup
                13: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                14: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                15: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_10_Battle", "Leadership_Tier1_4_Protect", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                // AD Production mode: Spellplague + Battle Undead
                16: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                17: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", "Leadership_Tier2_12_Taxes", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                18: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", "Leadership_Tier2_12_Taxes", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                19: ["Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", "Leadership_Tier2_12_Taxes", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                // 20

                20: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_20_Destroy", "Leadership_Tier2_12_Taxes",
                    "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
                21: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_20_Destroy", "Leadership_Tier2_12_Taxes",
                    "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
                22: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
                23: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
                24: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier2_12_Taxes", "Leadership_Tier4_24r_Killdragon", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
                25: ["Leadership_Tier4_25r_Huntexperiment", "Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_13r_Protectdiamonds",
                    "Leadership_Tier3_20_Destroy", "Leadership_Tier2_12_Taxes", "Leadership_Tier4_24r_Killdragon", "Leadership_Tier4_25_Battleelementalcultists", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle",
                    "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
            },
        }, {
            profileName: "XP",
            isProfileActive: true,
            level: {
                0: ["Leadership_Tier0_Intro_1"],
                1: ["Leadership_Tier0_Intro_5", "Leadership_Tier0_Intro_4", "Leadership_Tier0_Intro_3", "Leadership_Tier0_Intro_2"],
                2: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                3: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                4: ["Leadership_Tier1_Feedtheneedy", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty", "Leadership_Tier1_2_Training"],
                5: ["Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                6: ["Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                7: ["Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                8: ["Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                9: ["Leadership_Tier1_5_Explore", "Leadership_Tier2_9_Chart", "Leadership_Tier1_4_Protect"],
                10: ["Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                11: ["Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                12: ["Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier1_2_Guardduty"],
                13: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                14: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                15: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                16: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                17: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                18: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                19: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                //20

                20: ["Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                21: ["Leadership_Tier4_21_Training", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier3_13_Training", "Leadership_Tier1_5_Explore", "Leadership_Tier1_4_Protect", "Leadership_Tier2_7_Training"],
                22: ["Leadership_Tier4_21_Training", "Leadership_Tier4_22_Guardclerics", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                23: ["Leadership_Tier4_23_Guardnoble", "Leadership_Tier4_21_Training", "Leadership_Tier4_22_Guardclerics", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                24: ["Leadership_Tier4_23_Guardnoble", "Leadership_Tier4_21_Training", "Leadership_Tier4_22_Guardclerics", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
                25: ["Leadership_Tier4_25r_Huntexperiment", "Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_13r_Protectdiamonds",
                    "Leadership_Tier3_20_Destroy", "Leadership_Tier2_12_Taxes", "Leadership_Tier4_24r_Killdragon", "Leadership_Tier4_25_Battleelementalcultists", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle",
                    "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
                ],
            },
        }]
    };

    addProfile("Leadership", {
        profileName: "Resource/AD",
        level: {
            // DL
            16: ["Leadership_Tier3_16r_Buildshelters", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_16_Fight", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
            17: ["Leadership_Tier3_16r_Buildshelters", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_17_Deliver", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
            18: ["Leadership_Tier3_16r_Buildshelters", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_17r_Raidmines", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", , "Leadership_Tier3_17_Deliver", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
            19: ["Leadership_Tier3_16r_Buildshelters", "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier3_17r_Raidmines", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_17_Deliver", , "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"],
            // 20
            20: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3",
                "Leadership_Tier3_20_Destroy", "Leadership_Tier3_18_Resell", "Leadership_Tier3_13r_Protectdiamonds",
                "Leadership_Tier3_16r_Buildshelters", "Leadership_Tier3_13_Patrol", "Leadership_Tier3_19_Acquire", "Leadership_Tier3_17_Deliver",
                "Leadership_Tier3_15_Rescue", "Leadership_Tier2_9_Chart", "Leadership_Tier2_12_Taxes", "Leadership_Tier1_5_Explore"
            ],
            21: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_21r_Killelemental",
                "Leadership_Tier3_20_Destroy", "Leadership_Tier4_21_Protectmagic",
                "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
            ],
            22: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_21r_Killelemental",
                "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier3_20_Destroy", "Leadership_Tier4_21_Protectmagic", "Leadership_Tier4_22_Guardclerics",
                "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
            ],
            23: ["Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3",
                "Leadership_Tier4_23r_Securepilgrimage", "Leadership_Tier4_21r_Killelemental",
                "Leadership_Tier4_23_Guardnoble", "Leadership_Tier3_20_Destroy", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier4_21_Protectmagic", "Leadership_Tier4_22_Guardclerics",
                "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
            ],
            24: ["Leadership_Tier4_24r_Killdragon",
                "Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_23r_Securepilgrimage",
                "Leadership_Tier4_24_Wizardsseneschal", "Leadership_Tier4_23_Guardnoble", "Leadership_Tier3_20_Destroy", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier4_21_Protectmagic", "Leadership_Tier4_22_Guardclerics", "Leadership_Tier4_21r_Killelemental",
                "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
            ],
            25: ["Leadership_Tier4_25r_Huntexperiment", "Leadership_Tier4_24r_Killdragon",
                "Leadership_Tier3_20r_Master2", "Leadership_Tier3_20r_Master1", "Leadership_Tier3_20r_Master3", "Leadership_Tier4_23r_Securepilgrimage",
                "Leadership_Tier4_25_Battleelementalcultists", "Leadership_Tier4_24_Wizardsseneschal", "Leadership_Tier4_23_Guardnoble", "Leadership_Tier3_20_Destroy", "Leadership_Tier4_22r_Capturebandithq", "Leadership_Tier4_21_Protectmagic", "Leadership_Tier4_22_Guardclerics", "Leadership_Tier4_21r_Killelemental",
                "Leadership_Tier3_13r_Protectdiamonds", "Leadership_Tier2_12_Taxes", "Leadership_Tier3_16_Fight", "Leadership_Tier2_10_Battle", "Leadership_Tier3_13_Patrol", "Leadership_Tier2_9_Chart", "Leadership_Tier1_5_Explore"
            ],
        }
    }, "AD");

    addProfile("Leadership", {
        profileName: "Assets",
        isProfileActive: true,
        level: {
            3: ["Leadership_Tier3_13_Recruit", "Leadership_Tier2_7_Recruit", "Leadership_Tier1_2_Recruit"],
            4: '+25'
        }
    });

    addProfile('Leadership',{
        "profileName": "RP Boxes",
            "level": {
                "21": [
                    "Leadership_Tier4_21_Training",
                    "Leadership_Tier4_21_Protectmagic",
                    "Leadership_Tier4_21r_Killelemental",
                    "Leadership_Tier3_20r_Master2",
                    "Leadership_Tier3_20r_Master1",
                    "Leadership_Tier3_20r_Master3",
                    "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier1_5_Explore"
                ],
                "22": [
                    "Leadership_Tier4_22r_Capturebandithq",
                    "Leadership_Tier4_21_Training",
                    "Leadership_Tier4_21_Protectmagic",
                    "Leadership_Tier4_21r_Killelemental",
                    "Leadership_Tier3_20r_Master2",
                    "Leadership_Tier3_20r_Master1",
                    "Leadership_Tier3_20r_Master3",
                    "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier1_5_Explore"
                ],
                "23": [
                    "Leadership_Tier4_23r_Securepilgrimage",
                    "Leadership_Tier4_21r_Killelemental",
                    "Leadership_Tier4_22r_Capturebandithq",
                    "Leadership_Tier4_23_Guardnoble",
                    "Leadership_Tier4_21_Training",
                    "Leadership_Tier4_21_Protectmagic",
                    "Leadership_Tier3_20r_Master2",
                    "Leadership_Tier3_20r_Master1",
                    "Leadership_Tier3_20r_Master3",
                    "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier1_5_Explore"
                ],
                "24": [
                    "Leadership_Tier4_24r_Killdragon",
                    "Leadership_Tier4_23r_Securepilgrimage",
                    "Leadership_Tier4_24_Wizardsseneschal",
                    "Leadership_Tier4_21r_Killelemental",
                    "Leadership_Tier4_22r_Capturebandithq",
                    "Leadership_Tier4_23_Guardnoble",
                    "Leadership_Tier4_21_Training",
                    "Leadership_Tier4_21_Protectmagic",
                    "Leadership_Tier3_20r_Master2",
                    "Leadership_Tier3_20r_Master1",
                    "Leadership_Tier3_20r_Master3",
                    "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier1_5_Explore"
                ],
                "25": [
                    "Leadership_Tier4_25r_Huntexperiment",
                    "Leadership_Tier4_25_Battleelementalcultists",
                    "Leadership_Tier4_24r_Killdragon",
                    "Leadership_Tier4_23r_Securepilgrimage",
                    "Leadership_Tier4_24_Wizardsseneschal",
                    "Leadership_Tier4_21r_Killelemental",
                    "Leadership_Tier4_22r_Capturebandithq",
                    "Leadership_Tier4_23_Guardnoble",
                    "Leadership_Tier4_21_Training",
                    "Leadership_Tier4_21_Protectmagic",
                    "Leadership_Tier3_20r_Master2",
                    "Leadership_Tier3_20r_Master1",
                    "Leadership_Tier3_20r_Master3",
                    "Leadership_Tier3_20_Destroy",
                    "Leadership_Tier1_5_Explore"
                ]
            }
        }, 'AD');

    definedTask["WinterEvent"] = {
        taskListName: "WinterEvent",
        taskName: "WinterEvent",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Event_Winter_Tier0_Intro"],
                1: ["Event_Winter_Tier1_Rankup", /*"Event_Winter_Tier1_Shiny_Lure",*/
                    "Event_Winter_Tier1_Refine", "Event_Winter_Tier1_Gather"
                ],
                2: ["Event_Winter_Tier1_Rankup_2", /*"Event_Winter_Tier1_Fishingpole_Blue","Event_Winter_Tier1_Shiny_Lure_Mass",*/
                    "Event_Winter_Tier1_Refine_2", "Event_Winter_Tier1_Gather_2"
                ],
                3: [ /*"Event_Winter_Tier1_Heros_Feast","Event_Winter_Tier1_Lightwine","Event_Winter_Tier1_Sparkliest_Gem","Event_Winter_Tier1_Mesmerizing_Lure",*/
                    "Event_Winter_Tier1_Gather_3"
                ],
            },
        }]
    };

    definedTask["SiegeEvent"] = {
        taskListName: "SiegeEvent",
        taskName: "Event_Siege",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Event_Siege_Tier0_Intro"], // Hire a Siege Master
                //1:["Event_Siege_Tier1_Donate_Minorinjury"], // Create Defense Supplies from Minor Injury Kits
                //1:["Event_Siege_Tier1_Donate_Injury"], // Create Defense Supplies from Injury Kits
                //1:["Event_Siege_Tier1_Donate_Majorinjury"], // Create Defense Supplies from Major Injury Kits
                //1:["Event_Siege_Tier1_Donate_Altar_10"], // Create Defense Supplies from 10 Portable Altars
                //1:["Event_Siege_Tier1_Donate_Altar_50"], // Create Defense Supplies from 50 Portable Altars
                //1:["Event_Siege_Tier1_Donate_Resources_T2"], // Create Defense Supplies from Tier 2 crafting resources
                //1:["Event_Siege_Tier1_Donate_Resources_T3"], // Create Defense Supplies from Tier 3 crafting resources
                1: ["Event_Siege_Tier1_Donate_Resources_T3", "Event_Siege_Tier1_Donate_Resources_T2", "Event_Siege_Tier1_Donate_Minorinjury", "Event_Siege_Tier1_Donate_Injury", "Event_Siege_Tier1_Donate_Majorinjury", "Event_Siege_Tier1_Donate_Altar_10"],
            },
        }]
    };

    definedTask["BlackIce"] = {
        taskListName: "BlackIce",
        taskName: "BlackIce",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                1: ["Blackice_Tier1_Process_Blackice","Blackice_Tier1_Recruit_Blackice_Smith"],
                2: ["Blackice_Tier1_Process_Blackice","Blackice_Tier2_Recruit_Assistant_Cryomancer"],
                3: ["Blackice_Tier1_Process_Blackice","Blackice_Tier2_Recruit_Assistant_Cryomancer"],
                4: ["Blackice_Tier1_Process_Blackice","Blackice_Tier2_Recruit_Assistant_Cryomancer"],
                5: ["Blackice_Tier1_Process_Blackice","Blackice_Tier2_Recruit_Assistant_Cryomancer"],
                /*
                1:["Forge Hammerstone Pick","Gather Raw Black Ice","Truesilver Pick Grip","Process Raw Black Ice","Upgrade Chillwright","Hire an additional Chillwright"],
                2:["Forge Hammerstone Pick","Gather Raw Black Ice","Truesilver Pick Grip","Process Raw Black Ice","Upgrade Chillwright","Hire an additional Chillwright"],
                3:["Forge Hammerstone Pick","Gather Raw Black Ice","Truesilver Pick Grip","Process Raw Black Ice","Upgrade Chillwright","Hire an additional Chillwright"],
                 */
            },
        }]
    };

    definedTask["Jewelcrafting"] = {
        taskListName : "Jewelcrafting",
        taskName : "Jewelcrafting",
        taskDefaultPriority : 1,
        taskDefaultSlotNum : 0,
        taskActive : true,
        taskDescription : "",
        profiles : [{
            profileName : "default",
            isProfileActive : true,
            level : {
                0 : ["Jewelcrafting_Tier0_Intro"],
                1 : ["Jewelcrafting_Tier1_Waist_Offense_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                2 : ["Jewelcrafting_Tier1_Waist_Offense_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                3 : ["Jewelcrafting_Tier1_Neck_Offense_1", "Jewelcrafting_Tier1_Waist_Offense_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                4 : ["Jewelcrafting_Tier1_Neck_Offense_1", "Jewelcrafting_Tier1_Waist_Misc_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                5 : ["Jewelcrafting_Tier1_Neck_Offense_1", "Jewelcrafting_Tier1_Waist_Misc_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                6 : ["Jewelcrafting_Tier1_Neck_Misc_1", "Jewelcrafting_Tier1_Waist_Misc_1", "Jewelcrafting_Tier1_Refine_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                7 : ["Jewelcrafting_Tier2_Waist_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                8 : ["Jewelcrafting_Tier2_Waist_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                9 : ["Jewelcrafting_Tier2_Neck_Offense_2", "Jewelcrafting_Tier2_Waist_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                10 : ["Jewelcrafting_Tier2_Waist_Misc_2", "Jewelcrafting_Tier2_Neck_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                11 : ["Jewelcrafting_Tier2_Waist_Misc_2", "Jewelcrafting_Tier2_Neck_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                12 : ["Jewelcrafting_Tier2_Waist_Misc_2", "Jewelcrafting_Tier2_Neck_Offense_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                13 : ["Jewelcrafting_Tier2_Neck_Misc_2", "Jewelcrafting_Tier2_Waist_Misc_2", "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                14 : ["Jewelcrafting_Tier3_Waist_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                15 : ["Jewelcrafting_Tier3_Waist_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                16 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Waist_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                17 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Waist_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                18 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Waist_Misc_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                19 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Waist_Misc_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                
                20 : ["Jewelcrafting_Tier3_Neck_Misc_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                21 : ["Jewelcrafting_Tier3_Neck_Misc_3", "Jewelcrafting_Tier4_Refine_Basic", "Jewelcrafting_Tier4_Gather_Basic", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                22 : ["Jewelcrafting_Tier4_Neck_Base_3", "Jewelcrafting_Tier4_Refine_Basic", "Jewelcrafting_Tier4_Gather_Basic", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                23 : ["Jewelcrafting_Tier4_Neck_Defense_3",  "Jewelcrafting_Tier4_Neck_Offense_3", "Jewelcrafting_Tier4_Gather_Basic", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                24 : ["Jewelcrafting_Tier4_Neck_Misc_3", "Jewelcrafting_Tier3_Neck_Misc_3", "Jewelcrafting_Tier4_Gather_Basic", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
                //basic resources  for lvl 16 and 15 items. 
                25 : ["Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            },
        }]
    };

    addProfile("Jewelcrafting", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Jewelcrafting_Tier0_Intro"],
            1: ["Jewelcrafting_Tier1_Refine_Basic_Mass", "Jewelcrafting_Tier1_Gather_Basic"],
            2: '+25',
            7: ["Jewelcrafting_Tier2_Refine_Basic_Mass"],
            8 : '+25',
            14: ["Jewelcrafting_Tier3_Refine_Basic_Mass"],
            15 : '+25',
            21: ["Jewelcrafting_Tier4_Refine_Basic_Mass"],
            22 : '+25',
        },
    });    

    addProfile("Jewelcrafting", {
        profileName: "21->25 gather",
        isProfileActive: true,
        level: {
            21: ["Jewelcrafting_Tier4_Refine_Basic_Mass", "Jewelcrafting_Tier4_Gather_Basic"],
            22: '+25'
        },
    });


    addProfile("Jewelcrafting", {
        profileName: "Craft Purple Neck",
        isProfileActive: true,
        level: {
            // we care only about neck items that we can start pile up at lvl 16
            16: ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            17 : '+25',
            25: ["Jewelcrafting_Tier4_Neck_Offense_4_Purple", //Exquisite Adamant Necklace of Piercing
                  "Jewelcrafting_Tier4_Neck_Misc_4_Purple", // Exquisite Adamant Necklace of Recovery 
                  "Jewelcrafting_Tier4_Neck_Defense_4_Purple",//Exquisite Adamant Necklace of Regeneration
                  "Jewelcrafting_Tier4_Ring_Offense_4_Purple",//Exquisite Adamant Ring of Piercing
                  "Jewelcrafting_Tier4_Ring_Misc_4_Purple",//Exquisite Adamant Ring of Recovery
                  "Jewelcrafting_Tier4_Ring_Defense_4_Purple",//Exquisite Adamant Ring of Regeneration
                  "Jewelcrafting_Tier3_Neck_Offense_3", 
                  "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier1_Refine_Basic"],
        },
    });
    
    addProfile("Jewelcrafting", {
        profileName: "Craft Purple Rings",
        isProfileActive: true,
        level: {
            // we care only about neck items that we can start pile up at lvl 15
            15: ["Jewelcrafting_Tier3_Ring_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            16 :'+25',
            25: ["Jewelcrafting_Tier4_Ring_Offense_4_Purple", //Exquisite Adamant Ring of Piercing
                "Jewelcrafting_Tier4_Ring_Misc_4_Purple", //Exquisite Adamant Ring of Recovery
                "Jewelcrafting_Tier4_Ring_Defense_4_Purple", //Exquisite Adamant Ring of Regeneration
                  "Jewelcrafting_Tier4_Neck_Offense_4_Purple", //Exquisite Adamant Necklace of Piercing
                  "Jewelcrafting_Tier4_Neck_Misc_4_Purple", // Exquisite Adamant Necklace of Recovery 
                  "Jewelcrafting_Tier4_Neck_Defense_4_Purple",//Exquisite Adamant Necklace of Regeneration
                  "Jewelcrafting_Tier3_Ring_Offense_3",  
                  "Jewelcrafting_Tier3_Refine_Basic"]
        },
    });
    

    addProfile("Jewelcrafting", {
        profileName: "Craft Purple lvl 25",
        isProfileActive: true,
        level: {
            25: ["Jewelcrafting_Tier4_Ring_Offense_4_Purple", //Exquisite Adamant Ring of Piercing
                "Jewelcrafting_Tier4_Ring_Misc_4_Purple", //Exquisite Adamant Ring of Recovery
                "Jewelcrafting_Tier4_Ring_Defense_4_Purple", //Exquisite Adamant Ring of Regeneration
                  "Jewelcrafting_Tier4_Neck_Offense_4_Purple", //Exquisite Adamant Necklace of Piercing
                  "Jewelcrafting_Tier4_Neck_Misc_4_Purple", // Exquisite Adamant Necklace of Recovery - !!check name!!
                  "Jewelcrafting_Tier4_Neck_Defense_4_Purple",//Exquisite Adamant Necklace of Regeneration
                  "Jewelcrafting_Tier3_Refine_Basic"//timeout task
                  ],
        },
    }); 
   

    definedTask["Mailsmithing"] = {
        taskListName : "Mailsmithing",
        taskName : "Armorsmithing_Med",
        taskDefaultPriority : 1,
        taskDefaultSlotNum : 0,
        taskActive : true,
        taskDescription : "",
        profiles : [{
            profileName : "default",
            isProfileActive : true,
            level : {
                0 : ["Med_Armorsmithing_Tier0_Intro"],
                1 : ["Med_Armorsmithing_Tier1_Gather_Basic"],
                2 : ["Med_Armorsmithing_Tier1_Chain_Armor_1", "Med_Armorsmithing_Tier1_Chain_Pants_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                3 : ["Med_Armorsmithing_Tier1_Chain_Armor_1", "Med_Armorsmithing_Tier1_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                4 : ["Med_Armorsmithing_Tier1_Chain_Armor_1", "Med_Armorsmithing_Tier1_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                5 : ["Med_Armorsmithing_Tier1_Chain_Armor_Set_1", "Med_Armorsmithing_Tier1_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                6 : ["Med_Armorsmithing_Tier1_Chain_Armor_Set_1", "Med_Armorsmithing_Tier1_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                7 : ["Med_Armorsmithing_Tier1_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt", "Med_Armorsmithing_Tier1_Gather_Basic", "Med_Armorsmithing_Tier1_Gather_Basic"],
                8 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt", "Med_Armorsmithing_Tier1_Gather_Basic"],
                9 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt", "Med_Armorsmithing_Tier1_Gather_Basic"],
                10 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt_2", "Med_Armorsmithing_Tier1_Gather_Basic", "Med_Armorsmithing_Tier1_Gather_Basic"],
                11 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_2", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt_2", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                12 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_2", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt_2", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                13 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_2", "Med_Armorsmithing_Tier2_Chain_Boots_Set_1", "Med_Armorsmithing_Tier2_Chain_Shirt_2", "Med_Armorsmithing_Tier2_Chain_Pants_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                14 : ["Med_Armorsmithing_Tier2_Chain_Armor_Set_1", "Med_Armorsmithing_Tier2_Chain_Pants_2", "Med_Armorsmithing_Tier3_Chain_Shirt", "Med_Armorsmithing_Tier3_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                15 : ["Med_Armorsmithing_Tier3_Chain_Armor_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants", "Med_Armorsmithing_Tier3_Chain_Shirt2", "Med_Armorsmithing_Tier3_Chain_Boots_Set_1", "Med_Armorsmithing_Tier1_Gather_Basic"],
                16 : ["Med_Armorsmithing_Tier3_Chain_Armor_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants2", "Med_Armorsmithing_Tier3_Chain_Shirt2", "Med_Armorsmithing_Tier3_Chain_Helm_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants", "Med_Armorsmithing_Tier1_Gather_Basic"],
                17 : ["Med_Armorsmithing_Tier3_Chain_Armor_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants2", "Med_Armorsmithing_Tier3_Chain_Shirt2", "Med_Armorsmithing_Tier3_Chain_Helm_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants", "Med_Armorsmithing_Tier1_Gather_Basic"],
                18 : ["Med_Armorsmithing_Tier3_Chain_Armor_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants2", "Med_Armorsmithing_Tier3_Chain_Shirt2", "Med_Armorsmithing_Tier3_Chain_Helm_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants", "Med_Armorsmithing_Tier1_Gather_Basic"],
                19 : ["Med_Armorsmithing_Tier3_Chain_Armor_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants2", "Med_Armorsmithing_Tier3_Chain_Shirt2", "Med_Armorsmithing_Tier3_Chain_Helm_Set_1", "Med_Armorsmithing_Tier3_Chain_Pants", "Med_Armorsmithing_Tier1_Gather_Basic"],
                20 : ["Med_Armorsmithing_Tier3_Chain_Pants"],
                21 : ["Med_Armorsmithing_Tier3_Chain_Pants"],
                22 : ["Med_Armorsmithing_Tier3_Chain_Pants"],
                23 : ["Med_Armorsmithing_Tier3_Chain_Pants"],
                24 : ["Med_Armorsmithing_Tier3_Chain_Pants"],
                25 : ["Crafted_Med_Armorsmithing_T4_Refine_Basic", "Crafted_Med_Armorsmithing_T4_Gather_Basic"],
                
            }
        }]
    };
    
    addProfile("Mailsmithing", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Med_Armorsmithing_Tier0_Intro"],
            1: ["Med_Armorsmithing_Tier1_Refine_Basic_Mass", "Med_Armorsmithing_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Med_Armorsmithing_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Med_Armorsmithing_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Crafted_Med_Armorsmithing_T4_Refine_Basic_Mass"],
            22: "+25",
        },
    });    

    addProfile("Mailsmithing", {
        profileName: "21->25 gather",
        isProfileActive: true,
        level: {
            21: ["Crafted_Med_Armorsmithing_T4_Refine_Basic_Mass", "Crafted_Med_Armorsmithing_T4_Gather_Basic_Mass"],
            22: "+25",
            25: ["Crafted_Med_Armorsmithing_T4_Refine_Basic", "Crafted_Med_Armorsmithing_T4_Gather_Basic"],
        },
    });
    
    addProfile("Mailsmithing", {
        profileName: "Berserker's Chainmail and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 

                "Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Dps",//Berserker's Elemental Chainmail
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });

    addProfile("Mailsmithing", {
        profileName: "Berserker's Chausses and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail
                  
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 

                "Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Dps",//Berserker's Elemental Chausses
                "Med_Armorsmithing_Tier3_Refine_Basic"

            ],
        },
    });
    
    addProfile("Mailsmithing", {
        profileName: "Soldier's Chainmail and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                      
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 

                "Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Tank",//Soldier's Elemental Chainmail
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });

    addProfile("Mailsmithing", {
        profileName: "Soldier's Chausses and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 

                "Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Tank",//Soldier's Elemental Chausses
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });
    
    
    addProfile("Mailsmithing", {
        profileName: "Zealot's Chainmail and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 
                      
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Dps",//Zealot's Elemental Chainmail
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });
    

    addProfile("Mailsmithing", {
        profileName: "Zealot's Chausses and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail                      

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Dps",//Zealot's Elemental Chausses
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });

    
   
    addProfile("Mailsmithing", {
        profileName: "Prelate's Chainmail and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 

                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                      
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Tank",//Prelate's Elemental Chainmail
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ],
            },
        });

    addProfile("Mailsmithing", {
        profileName: "Prelate's Chausses and rares",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail                      
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                      
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Tank",//Prelate's Elemental Chainmail
                "Med_Armorsmithing_Tier3_Refine_Basic"
                ]
            },
        });

    addProfile("Mailsmithing", {
        profileName: "craft rares only",
        isProfileActive: true,
        level: {
            25: ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank", //Prelate's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank", //Prelate's Exquisite Elemental Chainmail                      
                      
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps", //Zealot's Exquisite Elemental Chausses 
                "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps", //Zealot's Exquisite Elemental Chainmail
                     
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Soldier's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps", //Soldier's Exquisite Elemental Chainmail

                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps", //Berserker's Exquisite Elemental Chausses
                "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank", //Berserker's Exquisite Elemental Chainmail
                   "Med_Armorsmithing_Tier2_Refine_Basic"]
        }
    }); 

    addProfile("Mailsmithing", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Med_Armorsmithing_Tier1_Event_Gond"],
            7: "+25",            
        },
    });

    definedTask["Platesmithing"] = {
        taskListName: "Platesmithing",
        taskName: "Armorsmithing_Heavy",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Hvy_Armorsmithing_Tier0_Intro"],
                1: ["Hvy_Armorsmithing_Tier1_Plate_Boots_1", "Hvy_Armorsmithing_Tier1_Plate_Shirt_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                2: ["Hvy_Armorsmithing_Tier1_Plate_Armor_1", "Hvy_Armorsmithing_Tier1_Plate_Pants_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                3: ["Hvy_Armorsmithing_Tier1_Plate_Armor_1", "Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                4: ["Hvy_Armorsmithing_Tier1_Plate_Armor_1", "Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                5: ["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                6: ["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                7: ["Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt", "Hvy_Armorsmithing_Tier2_Shield_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                8: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                9: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                10: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt_2", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                11: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_2", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt_2", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                12: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_2", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt_2", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                13: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_2", "Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Shirt_2", "Hvy_Armorsmithing_Tier2_Plate_Pants_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                14: ["Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier2_Plate_Pants_2", "Hvy_Armorsmithing_Tier3_Plate_Shirt", "Hvy_Armorsmithing_Tier3_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                15: ["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants", "Hvy_Armorsmithing_Tier3_Plate_Shirt2", "Hvy_Armorsmithing_Tier3_Plate_Boots_Set_1", "Hvy_Armorsmithing_Tier1_Gather_Basic", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                16: ["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants2", "Hvy_Armorsmithing_Tier3_Plate_Shirt2", "Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                17: ["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants2", "Hvy_Armorsmithing_Tier3_Plate_Shirt2", "Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                18: ["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants2", "Hvy_Armorsmithing_Tier3_Plate_Shirt2", "Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                19: ["Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants2", "Hvy_Armorsmithing_Tier3_Plate_Shirt2", "Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1", "Hvy_Armorsmithing_Tier3_Plate_Pants", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                20: ["Hvy_Armorsmithing_Tier3_Plate_Pants"],
                21: ["Hvy_Armorsmithing_Tier3_Plate_Pants"],
                22: ["Hvy_Armorsmithing_Tier3_Plate_Pants"],
                23: ["Hvy_Armorsmithing_Tier3_Plate_Pants"],
                24: ["Hvy_Armorsmithing_Tier3_Plate_Pants"],
                25: ["Crafted_Hvy_Armorsmithing_T4_Refine_Basic_Mass", "Crafted_Hvy_Armorsmithing_T4_Gather_Basic_Mass"],
            },
        }]
    };

    addProfile("Platesmithing", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Hvy_Armorsmithing_Tier0_Intro"],
            1: ["Hvy_Armorsmithing_Tier1_Refine_Basic_Mass", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Hvy_Armorsmithing_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Hvy_Armorsmithing_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Crafted_Hvy_Armorsmithing_T4_Refine_Basic_Mass"],
            22: "+25",
        },
    });

    addProfile("Platesmithing", {
        profileName: "21->25 gather",
        isProfileActive: true,
        level: {
            21: ["Crafted_Hvy_Armorsmithing_T4_Refine_Basic_Mass", "Crafted_Hvy_Armorsmithing_T4_Gather_Basic_Mass"],
            22: "+25",
        },
    });

    addProfile("Platesmithing", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Hvy_Armorsmithing_Tier1_Event_Gond"],
            7: "+25",
        },
    });

    definedTask["Leatherworking"] = {
        taskListName : "Leatherworking",
        taskName : "Leatherworking",
        taskDefaultPriority : 1,
        taskDefaultSlotNum : 0,
        taskActive : true,
        taskDescription : "",
        profiles : [{
            profileName : "default",
            isProfileActive : true,
            level : {
                0 : ["Leatherworking_Tier0_Intro_1"],
                1 : ["Leatherworking_Tier1_Leather_Boots_1", "Leatherworking_Tier1_Leather_Shirt_1", "Leatherworking_Tier1_Gather_Basic"],
                2 : ["Leatherworking_Tier1_Leather_Armor_1", "Leatherworking_Tier1_Leather_Pants_1", "Leatherworking_Tier1_Gather_Basic"],
                3 : ["Leatherworking_Tier1_Leather_Armor_1", "Leatherworking_Tier1_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                4 : ["Leatherworking_Tier1_Leather_Armor_1", "Leatherworking_Tier1_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                5 : ["Leatherworking_Tier1_Leather_Armor_Set_1", "Leatherworking_Tier1_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                6 : ["Leatherworking_Tier1_Leather_Armor_Set_1", "Leatherworking_Tier1_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                7 : ["Leatherworking_Tier1_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt", "Leatherworking_Tier1_Gather_Basic"],
                8 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt", "Leatherworking_Tier1_Gather_Basic"],
                9 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt", "Leatherworking_Tier1_Gather_Basic"],
                10 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt_2", "Leatherworking_Tier1_Gather_Basic"],
                11 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_2", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt_2", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier1_Gather_Basic"],
                12 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_2", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt_2", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier1_Gather_Basic"],
                13 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_2", "Leatherworking_Tier2_Leather_Boots_Set_1", "Leatherworking_Tier2_Leather_Shirt_2", "Leatherworking_Tier2_Leather_Pants_1", "Leatherworking_Tier1_Gather_Basic"],
                14 : ["Leatherworking_Tier2_Leather_Armor_Set_1", "Leatherworking_Tier2_Leather_Pants_2", "Ornate Leatherworking_Tier1_Leather_Shirt_1", "Leatherworking_Tier3_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                15 : ["Leatherworking_Tier3_Leather_Armor_Set_1", "Leatherworking_Tier3_Leather_Pants", "Leatherworking_Tier3_Leather_Shirt2", "Leatherworking_Tier3_Leather_Boots_Set_1", "Leatherworking_Tier1_Gather_Basic"],
                16 : ["Leatherworking_Tier3_Leather_Armor_Set_1", "Leatherworking_Tier3_Leather_Pants2", "Leatherworking_Tier3_Leather_Shirt2", "Leatherworking_Tier3_Leather_Helm_Set_1", "Leatherworking_Tier3_Leather_Pants", "Leatherworking_Tier1_Gather_Basic"],
                17 : ["Leatherworking_Tier3_Leather_Armor_Set_1", "Leatherworking_Tier3_Leather_Pants2", "Leatherworking_Tier3_Leather_Shirt2", "Leatherworking_Tier3_Leather_Helm_Set_1", "Leatherworking_Tier3_Leather_Pants", "Leatherworking_Tier1_Gather_Basic"],
                18 : ["Leatherworking_Tier3_Leather_Armor_Set_1", "Leatherworking_Tier3_Leather_Pants2", "Leatherworking_Tier3_Leather_Shirt2", "Leatherworking_Tier3_Leather_Helm_Set_1", "Leatherworking_Tier3_Leather_Pants", "Leatherworking_Tier1_Gather_Basic"],
                19 : ["Leatherworking_Tier3_Leather_Armor_Set_1", "Leatherworking_Tier3_Leather_Pants2", "Leatherworking_Tier3_Leather_Shirt2", "Leatherworking_Tier3_Leather_Helm_Set_1", "Leatherworking_Tier3_Leather_Pants", "Leatherworking_Tier1_Gather_Basic"],
                //19:["Leather Armor +4","Fancy Leather Pants","Fancy Leather Shirt","Leather Helm +4","Ornate Leather Pants","Upgrade Tanner","Upgrade Skinner","Hire an additional Skinner"],
                20 : ["Leatherworking_Tier3_Leather_Pants"],
                21 : ["Leatherworking_Tier3_Leather_Pants"],
                22 : ["Leatherworking_Tier3_Leather_Pants"],
                23 : ["Leatherworking_Tier3_Leather_Pants"],
                24 : ["Leatherworking_Tier3_Leather_Pants"],
                25 : ["Leatherworking_Tier4_Refine_Basic", "Leatherworking_Tier4_Gather_Basic"],
            },
        }  ]
    };
    
    addProfile("Leatherworking", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Leatherworking_Tier0_Intro_1"],
            1: ["Leatherworking_Tier1_Refine_Basic_Mass", "Leatherworking_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Leatherworking_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Leatherworking_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Leatherworking_Tier4_Refine_Basic_Mass"],
            22: "+25",
        },
    });    

    addProfile("Leatherworking", {
        profileName: "20->25 gather",
        isProfileActive: true,
        level: {
            20: ["Leatherworking_Tier3_Leather_Pants"],
            21: ["Leatherworking_Tier4_Refine_Basic_Mass", "Leatherworking_Tier4_Gather_Basic"],
            22: "+25",
            25: ["Leatherworking_Tier4_Refine_Basic", "Leatherworking_Tier4_Gather_Basic"],
        },
    });

    addProfile("Leatherworking", {
        profileName: "craft purples only",
        level: {
            //purples  first. shirts > tunics > pants.
            25: ["Leatherworking_Tier4_Leather_Shirt_Special_2", //Exquisite Elemental Shirt
                "Leatherworking_Tier4_Leather_Shirt_Special_2_Set2", //Exquisite Elemental Tunic
                "Leatherworking_Tier4_Leather_Pants_Special_2_Set2", //Exquisite Elemental Trousers
                  "Leatherworking_Tier4_Leather_Pants_Special_2", //Exquisite Elemental Pants
                  "Leatherworking_Tier3_Gather_Basic"]
        }
    });

    addProfile("Leatherworking", {
        profileName: "craft  Elemental Shirts",
        level: {
            //purples  first. shirts > tunics > pants.
            25: ['Leatherworking_Tier4_Leather_Shirt_Special_2', //Exquisite Elemental Shirt
                'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2', //Exquisite Elemental Tunic
                'Leatherworking_Tier4_Leather_Pants_Special_2_Set2', //Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                'Leatherworking_Tier4_Leather_Shirt2', //Elemental Leather Shirt 
                "Leatherworking_Tier3_Gather_Basic"
                    ]
        }
    });

    addProfile("Leatherworking", {
        profileName: "craft  Elemental Tunic",
        level: {
            //purples  first. shirts > tunics > pants.
            25: ['Leatherworking_Tier4_Leather_Shirt_Special_2_Set2', //Exquisite Elemental Tunic
                'Leatherworking_Tier4_Leather_Shirt_Special_2', //Exquisite Elemental Shirt
                'Leatherworking_Tier4_Leather_Pants_Special_2_Set2', //Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                'Leatherworking_Tier4_Leather_Shirt2_Set2', //Elemental Leather Tunic 
                'Leatherworking_Tier3_Gather_Basic'
                    ]
        }
    });
   
    addProfile("Leatherworking", {
        profileName: "craft  Elemental Trousers",
        level: {
            //purples  first. shirts > tunics > pants.
            25: ['Leatherworking_Tier4_Leather_Pants_Special_2_Set2', //Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2', //Exquisite Elemental Tunic
                'Leatherworking_Tier4_Leather_Shirt_Special_2', //Exquisite Elemental Shirt
                'Leatherworking_Tier4_Leather_Pants2_Set2', //Elemental Leather Trousers 
                'Leatherworking_Tier3_Gather_Basic'
                    ]
        }
    });

    addProfile("Leatherworking", {
        profileName: "craft  Elemental Pants",
        level: {
            //purples  first. shirts > tunics > pants.
            25: ['Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                'Leatherworking_Tier4_Leather_Pants_Special_2_Set2', //Exquisite Elemental Trousers
                'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2', //Exquisite Elemental Tunic
                'Leatherdeworking_Tier4_Leather_Shirt_Special_2', //Exquisite Elemental Shirt
                'Leatherworking_Tier4_Leather_Pants2', //Elemental Leather Pants 
                'Leatherworking_Tier3_Gather_Basic'
                    ]
        }
    });

    addProfile("Leatherworking", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Leatherworking_Tier1_Event_Gond"],
            7: "+25",
        },
    });

    definedTask["Tailoring"] = {
        taskListName: "Tailoring",
        taskName: "Tailoring",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Tailoring_Tier0_Intro"],
                1: ["Tailoring_Tier1_Cloth_Boots_1", "Tailoring_Tier1_Cloth_Shirt_1", "Tailoring_Tier1_Gather_Basic"],
                2: ["Tailoring_Tier1_Cloth_Armor_1", "Tailoring_Tier1_Cloth_Pants_1", "Tailoring_Tier1_Gather_Basic"],
                3: ["Tailoring_Tier1_Cloth_Armor_1", "Tailoring_Tier1_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                4: ["Tailoring_Tier1_Cloth_Armor_1", "Tailoring_Tier1_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                5: ["Tailoring_Tier1_Cloth_Armor_Set_1", "Tailoring_Tier1_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                6: ["Tailoring_Tier1_Cloth_Armor_Set_1", "Tailoring_Tier1_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                7: ["Tailoring_Tier1_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt", "Tailoring_Tier1_Gather_Basic", "Tailoring_Tier1_Gather_Basic"],
                8: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt", "Tailoring_Tier1_Gather_Basic"],
                9: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt", "Tailoring_Tier1_Gather_Basic"],
                10: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt_2", "Tailoring_Tier1_Gather_Basic"],
                11: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_2", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt_2", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier1_Gather_Basic"],
                12: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_2", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt_2", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier1_Gather_Basic"],
                13: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_2", "Tailoring_Tier2_Cloth_Boots_Set_1", "Tailoring_Tier2_Cloth_Shirt_2", "Tailoring_Tier2_Cloth_Pants_1", "Tailoring_Tier1_Gather_Basic"],
                14: ["Tailoring_Tier2_Cloth_Armor_Set_1", "Tailoring_Tier2_Cloth_Pants_2", "Tailoring_Tier3_Cloth_Shirt", "Tailoring_Tier3_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                15: ["Tailoring_Tier3_Cloth_Armor_Set_1", "Tailoring_Tier3_Cloth_Pants", "Tailoring_Tier3_Cloth_Shirt2", "Tailoring_Tier3_Cloth_Boots_Set_1", "Tailoring_Tier1_Gather_Basic"],
                16: ["Tailoring_Tier3_Cloth_Armor_Set_1", "Tailoring_Tier3_Cloth_Pants", "Tailoring_Tier3_Cloth_Shirt2", "Tailoring_Tier3_Cloth_Helm_Set_1", "Tailoring_Tier1_Gather_Basic"],
                17: ["Tailoring_Tier3_Cloth_Armor_Set_1", "Tailoring_Tier3_Cloth_Pants2_Set2", "Tailoring_Tier3_Cloth_Shirt2", "Tailoring_Tier3_Cloth_Helm_Set_1", "Tailoring_Tier1_Gather_Basic"],
                18: ["Tailoring_Tier3_Cloth_Armor_Set_3", "Tailoring_Tier3_Cloth_Armor_Set_2", "Tailoring_Tier3_Cloth_Armor_Set_1", "Tailoring_Tier3_Cloth_Pants2_Set2", "Tailoring_Tier3_Cloth_Shirt2", "Tailoring_Tier3_Cloth_Helm_Set_1", "Tailoring_Tier3_Cloth_Pants", "Tailoring_Tier1_Gather_Basic"],
                19: ["Tailoring_Tier3_Cloth_Armor_Set_3", "Tailoring_Tier3_Cloth_Armor_Set_2", "Tailoring_Tier3_Cloth_Armor_Set_1", "Tailoring_Tier3_Cloth_Pants2_Set2", "Tailoring_Tier3_Cloth_Shirt2", "Tailoring_Tier3_Cloth_Helm_Set_1", "Tailoring_Tier3_Cloth_Pants", "Tailoring_Tier1_Gather_Basic"],
                //19:["Cloth Robes +4","Fancy Cloth Pants","Fancy Cloth Shirt","Cloth Cap +4","Ornate Cloth Pants","Upgrade Outfitter","Upgrade Weaver","Hire an additional Weaver"],
                20: ["Tailoring_Tier3_Cloth_Pants"],
                21: ["Tailoring_Tier3_Cloth_Pants"],
                22: ["Tailoring_Tier3_Cloth_Pants"],
                23: ["Tailoring_Tier3_Cloth_Pants"],
                24: ["Tailoring_Tier3_Cloth_Pants"],
                25: ["Crafted_Tailoring_T4_Refine_Basic", "Crafted_Tailoring_T4_Gather_Basic"],
            },
        }]
    };

    addProfile("Tailoring", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Tailoring_Tier0_Intro"],
            1: ["Tailoring_Tier1_Refine_Basic_Mass", "Tailoring_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Tailoring_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Tailoring_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Crafted_Tailoring_T4_Refine_Basic_Mass"],
            22: "+25",
        },
    });

    addProfile("Tailoring", {
        profileName: "21->25 gather",
        isProfileActive: true,
        level: {
            21: ["Crafted_Tailoring_T4_Refine_Basic_Mass", "Crafted_Tailoring_T4_Gather_Basic_Mass"],
            22: "+25",
            25: ["Crafted_Tailoring_T4_Refine_Basic", "Crafted_Tailoring_T4_Gather_Basic"],
        },
    });

    addProfile("Tailoring", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Tailoring_Tier1_Event_Gond"],
            7: "+25",
        },
    });


    definedTask["Artificing"] = {
        taskListName: "Artificing",
        taskName: "Artificing",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Artificing_Tier0_Intro_1"],
                1: ["Artificing_Tier1_Pactblade_Convergence_1", "Artificing_Tier1_Symbol_Virtuous_1", "Artificing_Tier1_Gather_Basic"],
                2: ["Artificing_Tier1_Pactblade_Convergence_1", "Artificing_Tier1_Icon_Virtuous_1", "Artificing_Tier1_Gather_Basic"],
                3: ["Artificing_Tier1_Pactblade_Convergence_1", "Artificing_Tier1_Icon_Virtuous_1", "Artificing_Tier1_Gather_Basic"],
                4: ["Artificing_Tier1_Pactblade_Convergence_2", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier1_Gather_Basic"],
                5: ["Artificing_Tier1_Pactblade_Convergence_2", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier1_Gather_Basic"],
                6: ["Artificing_Tier1_Pactblade_Convergence_2", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier1_Gather_Basic"],
                7: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                8: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                9: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                10: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                11: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                12: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                13: ["Artificing_Tier2_Pactblade_Temptation_3", "Artificing_Tier1_Icon_Virtuous_2", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                14: ["Artificing_Tier3_Pactblade_Temptation_4", "Artificing_Tier3_Icon_Virtuous_4", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                15: ["Artificing_Tier3_Pactblade_Temptation_4", "Artificing_Tier3_Icon_Virtuous_4", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                16: ["Artificing_Tier3_Pactblade_Temptation_4", "Artificing_Tier3_Icon_Virtuous_4", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                17: ["Artificing_Tier3_Pactblade_Temptation_5", "Artificing_Tier3_Icon_Virtuous_5", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                18: ["Artificing_Tier3_Pactblade_Temptation_5", "Artificing_Tier3_Icon_Virtuous_5", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                19: ["Artificing_Tier3_Pactblade_Temptation_5", "Artificing_Tier3_Icon_Virtuous_5", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                //19:["Virtuous Icon +5","Upgrade Engraver","Upgrade Carver","Hire an additional Carver"],
                20: ["Artificing_Tier3_Pactblade_Temptation_5", "Artificing_Tier3_Icon_Virtuous_5", "Artificing_Tier3_Refine_Basic", "Artificing_Tier2_Refine_Basic", "Artificing_Tier1_Gather_Basic"],
                21: ["Artificing_Tier4_Gather_Basic"],
                22: ["Artificing_Tier4_Gather_Basic"],
                23: ["Artificing_Tier4_Gather_Basic"],
                24: ["Artificing_Tier4_Gather_Basic"],
                25: ["Artificing_Tier4_Refine_Basic", "Artificing_Tier4_Gather_Basic"],
            },
        }]
    };

    addProfile("Artificing", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Artificing_Tier0_Intro_1"],
            1: ["Artificing_Tier1_Refine_Basic_Mass", "Artificing_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Artificing_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Artificing_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Artificing_Tier4_Refine_Basic_Mass"],
            22: "+25",
        },
    });

    addProfile("Artificing", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Artificing_Tier1_Event_Gond"],
            7: "+25",
        },
    });


    definedTask["Weaponsmithing"] = {
        taskListName: "Weaponsmithing",
        taskName: "Weaponsmithing",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Weaponsmithing_Tier0_Intro"],
                1: ["Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                2: ["Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                3: ["Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                4: ["Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                5: ["Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                6: ["Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                7: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                8: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                9: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                10: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                11: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                12: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                13: ["Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                14: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                15: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                16: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                17: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                18: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                19: ["Weaponsmithing_Tier3_Dagger_4", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                20: ["Weaponsmithing_Tier3_Dagger_Set_2", "Weaponsmithing_Tier2_Dagger_3", "Weaponsmithing_Tier1_Dagger_2", "Weaponsmithing_Tier1_Dagger_1", "Weaponsmithing_Tier1_Gather_Basic"],
                //19:["Dagger+4","Upgrade Grinder","Upgrade Smelter","Hire an additional Smelter"],
                21: ["Weaponsmithing_Tier4_Gather_Basic"],
                22: ["Weaponsmithing_Tier4_Gather_Basic"],
                23: ["Weaponsmithing_Tier4_Gather_Basic"],
                24: ["Weaponsmithing_Tier4_Gather_Basic"],
                25: ["Weaponsmithing_Tier4_Refine_Basic", "Weaponsmithing_Tier4_Gather_Basic"],
            },
        }]
    };

    addProfile("Weaponsmithing", {
        profileName : "mass refining",
        isProfileActive : true,
        useMassTask : true,
        level : {
            0: ["Weaponsmithing_Tier0_Intro"],
            1: ["Weaponsmithing_Tier1_Refine_Basic_Mass", "Weaponsmithing_Tier1_Gather_Basic"],
            2: "+25",
            7: ["Weaponsmithing_Tier2_Refine_Basic_Mass"],
            8: "+25",
            14: ["Weaponsmithing_Tier3_Refine_Basic_Mass"],
            15: "+25",
            21: ["Weaponsmithing_Tier4_Refine_Basic_Mass"],
            22: "+25",
        },
    });

    addProfile("Weaponsmithing", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Weaponsmithing_Tier1_Event_Gond"],
            7: "+25",
        },
    });

    definedTask["Alchemy"] = {
        taskListName: "Alchemy",
        taskName: "Alchemy",
        taskDefaultPriority: 1,
        taskDefaultSlotNum: 0,
        taskActive: true,
        taskDescription: "",
        profiles: [{
            profileName: "default",
            isProfileActive: true,
            level: {
                0: ["Alchemy_Tier0_Intro_1"],
                1: ["Alchemy_Tier1_Experiment_Rank2", "Alchemy_Tier1_Experimentation_Rank1", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                2: ["Alchemy_Tier1_Experiment_Rank3", "Alchemy_Tier1_Experimentation_Rank2", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                3: ["Alchemy_Tier1_Experiment_Rank4", "Alchemy_Tier1_Experimentation_Rank3", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                4: ["Alchemy_Tier1_Experiment_Rank5", "Alchemy_Tier1_Experimentation_Rank4", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                5: ["Alchemy_Tier1_Experiment_Rank6", "Alchemy_Tier1_Experimentation_Rank5", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                6: ["Alchemy_Tier1_Experiment_Rank7", "Alchemy_Tier1_Experimentation_Rank6", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
                7: ["Alchemy_Tier2_Experiment_Rank08", "Alchemy_Tier2_Experimentation_Rank07", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                8: ["Alchemy_Tier2_Experiment_Rank09", "Alchemy_Tier2_Experimentation_Rank08", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                9: ["Alchemy_Tier2_Experiment_Rank10", "Alchemy_Tier2_Experimentation_Rank09", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                10: ["Alchemy_Tier2_Experiment_Rank11", "Alchemy_Tier2_Experimentation_Rank10", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                11: ["Alchemy_Tier2_Experiment_Rank12", "Alchemy_Tier2_Experimentation_Rank11", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                12: ["Alchemy_Tier2_Experiment_Rank13", "Alchemy_Tier2_Experimentation_Rank12", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                13: ["Alchemy_Tier2_Experiment_Rank14", "Alchemy_Tier2_Experimentation_Rank13", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic", "Alchemy_Tier2_Gather_Basic"],
                14: ["Alchemy_Tier3_Experiment_Rank15", "Alchemy_Tier3_Experimentation_Rank14", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                15: ["Alchemy_Tier3_Experiment_Rank16", "Alchemy_Tier3_Experimentation_Rank15", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                16: ["Alchemy_Tier3_Experiment_Rank17", "Alchemy_Tier3_Experimentation_Rank16", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                17: ["Alchemy_Tier3_Experiment_Rank18", "Alchemy_Tier3_Experimentation_Rank17", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                18: ["Alchemy_Tier3_Experiment_Rank19", "Alchemy_Tier3_Experimentation_Rank18", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                19: ["Alchemy_Tier3_Experiment_Rank20", "Alchemy_Tier3_Experimentation_Rank19", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Basic"],
                20: ["Alchemy_Tier3_Experiment_Rank21", "Alchemy_Tier3_Experimentation_Rank20", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier4_Gather_Basic"],
                21: ["Alchemy_Tier4_Experiment_Rank22", "Alchemy_Tier4_Experimentation_Rank21", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier4_Gather_Basic"],
                22: ["Alchemy_Tier4_Experiment_Rank23", "Alchemy_Tier4_Experimentation_Rank22", "Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier1_Gather_Basic"],
                23: ["Alchemy_Tier4_Experiment_Rank24", "Alchemy_Tier4_Experimentation_Rank23", "Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier1_Gather_Basic"],
                24: ["Alchemy_Tier4_Experiment_Rank25", "Alchemy_Tier4_Experimentation_Rank24", "Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier1_Gather_Basic"],
                25: ["Alchemy_Tier4_Experimentation_Rank25", "Alchemy_Tier4_Create_Elemental_Unified", "Alchemy_Tier4_Create_Elemental_Aggregate", "Alchemy_Tier3_Protection_Potion_Major", "Alchemy_Tier3_Potency_Potion_Major", "Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier1_Gather_Basic"],
            },
        }]
    };

    addProfile("Alchemy", {
        profileName: "Elemental Aggregate",
        level: {
            24: ["Alchemy_Tier4_Create_Elemental_Aggregate", "Alchemy_Tier4_Experiment_Rank25", "Alchemy_Tier4_Experimentation_Rank24", "Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components", "Alchemy_Tier1_Gather_Basic"],
            25: '+25',
        }
    });

    addProfile("Alchemy", {
        profileName: "Aqua Regia",
        level: {
            20: ["Alchemy_Tier2_Aquaregia", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
            21: "+25",
            22: ["Alchemy_Tier4_Aquaregia_2", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
            23: "+25",
        }
    });
    addProfile("Alchemy", {
        profileName: "Aqua Vitae",
        level: {
            20: ["Alchemy_Tier2_Aquavitae_2", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
            21: "+25",
        }
    });
    addProfile("Alchemy", {
        profileName: "Protection Superior",
        level: {
            25: ["Alchemy_Tier4_Experimentation_Rank25", "Alchemy_Tier4_Protection_Potion_Superior", "Alchemy_Tier4_Create_Elemental_Aggregate", "Alchemy_Tier3_Protection_Potion_Major", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
        }
    });
    addProfile("Alchemy", {
        profileName: "Potency Superior",
        level: {
            25: ["Alchemy_Tier4_Experimentation_Rank25", "Alchemy_Tier4_Potency_Potion_Superior", "Alchemy_Tier4_Create_Elemental_Aggregate", "Alchemy_Tier3_Potency_Potion_Major", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
        }
    }); 

    addProfile("Alchemy", {
        profileName: "Blue & Green Vitriol",
        isProfileActive: true,
        level: {
            1: ["Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Components"],
            2: "+25",
        },
    });

    addProfile("Alchemy", {
        profileName: "Wondrous Sprocket",
        isProfileActive: false,
        level: {
            6: ["Alchemy_Tier1_Event_Gond"],
            7: "+25",
        },
    });


    // Profession priority list by order
    var tasklist = [
        definedTask["Leadership"],
        definedTask["Jewelcrafting"],
        definedTask["Alchemy"],
        definedTask["Weaponsmithing"],
        definedTask["Artificing"],
        definedTask["Mailsmithing"],
        definedTask["Platesmithing"],
        definedTask["Leatherworking"],
        definedTask["Tailoring"],
        definedTask["BlackIce"],
        definedTask["WinterEvent"],
        definedTask["SiegeEvent"],
    ];

    var customProfiles = [];  // [ { taskName: 'name', baseProfile: 'profileName' / null, profile: JSON.parsed_from_input }, { } ....]
    var scriptSettings = {};

    // Populated at login   
    var loggedAccount = null;
    var UIaccount = null;
    var accountSettings = {};
    var charSettingsList = [];
    var charNamesList = [];
    var charStatisticsList = []; // array of char names with the charStatistics for each char.

    var defaultCharStatistics = {
        general: {
            nextTask: null,
            lastVisit: null,
            lastSCAVisit: null,
            refineCounter: 0,
            refineCounterReset: Date.now(),
            diamonds: 0,
            gold: 0,
            rad: 0,
            rBI: 0,
            BI: 0,
            refined: 0,
            refineLimitLeft: 0,
            emptyBagSlots: 0,
            activeSlots: 0,
        },
        professions: {
            // Names must match unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories.displayname
            "Leadership": { level: 0, workersUsed: [], workersUnused: [] },
            "Alchemy": { level: 0, workersUsed: [], workersUnused: [] },
            "Jewelcrafting": { level: 0, workersUsed: [], workersUnused: [] },
            "Weaponsmithing": { level: 0,workersUsed: [], workersUnused: [] },
            "Artificing": { level: 0, workersUsed: [], workersUnused: [] },
            "Mailsmithing": { level: 0, workersUsed: [], workersUnused: []},
            "Platesmithing": { level: 0, workersUsed: [], workersUnused: [] },
            "Leatherworking": { level: 0, workersUsed: [], workersUnused: [] },
            "Tailoring": { level: 0, workersUsed: [], workersUnused: [] },
            "Black Ice Shaping": { level: 0, workersUsed: [], workersUnused: [] },
            /*
            "Winter Event":     { level: 0, workersUsed: [], workersUnused: [] },
            "Siege Event":      { level: 0, workersUsed: [], workersUnused: [] },
            */
        },
        tools: {
            "Awl":{used:[],unused:[]},
            "Shears":{used:[],unused:[]},
            "Hammer":{used:[],unused:[]},
            "Needle":{used:[],unused:[]},
            "Bellows":{used:[],unused:[]},
            "Bezelpusher":{used:[],unused:[]},
            "Mortar":{used:[],unused:[]},
            "Anvil":{used:[],unused:[]},
            "Grindstone":{used:[],unused:[]},
            "Philosophersstone":{used:[],unused:[]},
            "Loupe":{used:[],unused:[]},
            "Graver":{used:[],unused:[]},
            "Crucible":{used:[],unused:[]},
            "Tongs":{used:[],unused:[]},
        },
        trackedResources: [],
        slotUse: [],
    };

    /*  For searching unsafeWindow.client.dataModel.model.ent.main.inventory.assignedslots / unsafeWindow.client.dataModel.model.ent.main.inventory.notassignedslots  
    This needs some design change. */

    // The definitions themselves are at the bottom of the script
    var workerList = workerDefinition();
    var toolList = toolListDefinition();

    var defaultTrackResources = [{
        fname: 'Aqua Regia',
        name: 'Crafting_Resource_Aquaregia',
        bank: false, unbound: true, btc: true, bta: true
    }, {
        fname: 'Aqua Vitae',
        name: 'Crafting_Resource_Aquavitae',
        bank: false, unbound: true, btc: true, bta: true
    }, {
        fname: 'Residuum',
        name: 'Crafting_Resource_Residuum',
        bank: false, unbound: true, btc: true, bta: true
    }, {
        fname: 'Mining Claim',
        name: 'Crafting_Resource_Mining_Claim',
        bank: false, unbound: true, btc: true, bta: true
    }, {
        fname: 'Elemental Aggregate',
        name: 'Crafting_Resource_Elemental_Aggregate',
        bank: false, unbound: true, btc: true, bta: true
    }, {
        fname: 'Unified Elements',
        name: 'Crafting_Resource_Elemental_Unified',
        bank: false, unbound: true, btc: true, bta: true
    }, 
];
    var trackResources;
    try {
        trackResources = JSON.parse(GM_getValue("tracked_resources", null));
    } catch (e) {
        trackResources = null;
    }
    if (!trackResources) {
        trackResources = defaultTrackResources;
    };

    var defaultScriptSettings = {
        general: {
            saveCharNextTime: true,
            scriptPaused: false,
            language: 'en',
            scriptDebugMode: true,
            scriptAutoReload: false,
            autoLogin: false,
            autoLoginAccount: "",
            autoLoginPassword: "",
            autoReload: false,
            scriptDelayFactor: 1,
            maxCollectTaskAttempts: 2,
        }
    };


    // Loading script settings.
    var tempScriptSettings;
    try {
        tempScriptSettings = JSON.parse(GM_getValue("settings__script", "{}"));
    } catch (e) {
        tempScriptSettings = null;
    }
    if (!tempScriptSettings) {
        console.warn('Script settings couldn\'t be retrieved, loading defaults.');
        tempScriptSettings = {};
    };
    scriptSettings = $.extend(true, {}, defaultScriptSettings, tempScriptSettings);
    
    // Loading custom profiles.
    try {
        customProfiles = JSON.parse(GM_getValue("custom_profiles", null));
    } catch (e) {
        customProfiles = null;
    }
    if (!customProfiles) {
        console.warn('Custom profiles couldn\'t be retrieved.');
        customProfiles = [];
    };
    customProfiles.forEach(function (cProfile, idx) {
        addProfile(cProfile.taskName, cProfile.profile, cProfile.baseProfile);
    });
    
    unsafeWindow.console.log('DebugMode set to: ' + scriptSettings.general.scriptDebugMode);
    console = scriptSettings.general.scriptDebugMode ? unsafeWindow.console || fouxConsole : fouxConsole;

    var delay_modifier = parseFloat(scriptSettings.general.scriptDelayFactor);
    delay.SHORT *= delay_modifier;      delay.MEDIUM *= delay_modifier;     delay.LONG *= delay_modifier; 
    delay.MINS *= 1;                    delay.DEFAULT *= delay_modifier;    delay.TIMEOUT *= delay_modifier;


    var defaultAccountSettings = {
        vendorSettings: {
            vendorJunk: false,
            vendorKitsLimit: false,
            vendorAltarsLimit: false,
            vendorKitsAll: false,
            vendorAltarsAll: false,
            vendorProfResults: false,
            vendorPots1: false,
            vendorPots2: false,
            vendorPots3: false,
            vendorPots4: false,
            vendorPots5: false,
            vendorHealingPots: false,
            vendorEnchR1: false,
            vendorEnchR2: false,
            vendorEnchR3: false,
        },
        professionSettings: {
            fillOptionals: true,
            autoPurchaseRes: true,
            trainAssets: true,
            smartLeadershipAssets: true,
            skipPatrolTask: 'AD&Lvl20',
            stopNotLeadership: 0,
            stopAlchemyAt3: false,
        },
        generalSettings: {
            refineAD: true,
            openRewards: false,
            openCelestialBox: false,
            openInvocation: true,
            keepOneUnopened: false,
            runSCA: 'free',
            SCADailyReset: Date.now() - 24*60*60*1000,
        },
        consolidationSettings: {
            bankCharName: "",
            transferRate: 100,
            consolidate: false,
            minCharBalance: 10000,
            minToTransfer: 50000,
        },
    };


    var defaultCharSettings = {
        charName: "",
        general: {
            active: false,
            overrideGlobalSettings: false,
            manualTaskSlots: false,
        },
        vendorSettings: {
            vendorJunk: false,
            vendorKitsLimit: false,
            vendorAltarsLimit: false,
            vendorKitsAll: false,
            vendorAltarsAll: false,
            vendorProfResults: false,
            vendorPots1: false,
            vendorPots2: false,
            vendorPots3: false,
            vendorPots4: false,
            vendorPots5: false,
            vendorHealingPots: false,
            vendorEnchR1: false,
            vendorEnchR2: false,
            vendorEnchR3: false,
        },
        professionSettings: {
            fillOptionals: true,
            autoPurchaseRes: true,
            trainAssets: true,
            skipPatrolTask: 'AD&Lvl20',
            smartLeadershipAssets: true,
            stopNotLeadership: 0,
            stopAlchemyAt3: false,
        },
        generalSettings: {
            refineAD: true,
            openRewards: false,
            openCelestialBox: false,
            openInvocation: true,
            keepOneUnopened: false,
            runSCA: 'free',
        },
        consolidationSettings: {
            consolidate: false,
            minCharBalance: 10000,
            minToTransfer: 50000,
        },
        taskListSettings: {},
        taskListSettingsManual: [],
    };

    //Adding taskList defaults.
    tasklist.forEach(function(task) {
        var profileNames = [];
        task.profiles.forEach(function(profile) {
            if (profile.isProfileActive) profileNames.push({
                name: profile.profileName,
                value: profile.profileName
            });
        });
        defaultCharSettings.taskListSettings[task.taskListName] = {};
        defaultCharSettings.taskListSettings[task.taskListName].taskSlots = task.taskDefaultSlotNum;
        defaultCharSettings.taskListSettings[task.taskListName].taskProfile = profileNames[0].value;
        defaultCharSettings.taskListSettings[task.taskListName].taskPriority = task.taskDefaultPriority;
        defaultCharSettings.taskListSettings[task.taskListName].stopTaskAtLevel = 0;
    });

    for (var i = 0; i < 9; i++) {
        defaultCharSettings.taskListSettingsManual[i] = {};
        defaultCharSettings.taskListSettingsManual[i].Profession = tasklist[0].taskListName;
        defaultCharSettings.taskListSettingsManual[i].Profile = tasklist[0].profiles[0].profileName;
        defaultCharSettings.taskListSettingsManual[i].fillAssets = 0;
    }
    // 0 - default, 1 - do not fill, 2 - people (white to purple), 3 - people (purple to white), 4 - tools
    var charSlotsFillAssetsOptions = ['default', 'Do not fill', 'people (white to purple)', 'people (purple to white)', 'tools'];

    // Usable only after login (return account or char settings, depending on override and match)
    function getSetting(group, name) {
        var override = false;
        if (typeof(charSettingsList[curCharName]) !== undefined && typeof(charSettingsList[curCharName].general) !== undefined) { 
            override = charSettingsList[curCharName].general.overrideGlobalSettings;
        }
        else console.warn("overrideGlobalSettings could not been reached." );

        if (override) {
            if (typeof(charSettingsList[curCharName][group]) !== undefined &&
                typeof(charSettingsList[curCharName][group][name]) !== undefined) {
                    return charSettingsList[curCharName][group][name];
            }
            else console.warn("charSetting value could not been reached for " + group + " " + name);
        }
        
        if (typeof(accountSettings[group]) !== undefined &&
            typeof(accountSettings[group][name]) !== undefined) {
                return accountSettings[group][name];
            }
        else console.warn("accountSettings value could not been reached for " + group + " " + name);
        return null;
    }


    // UI Settings 
    var settingnames = [
        //{scope: 'script', group: 'general', name: 'scriptPaused',     title: 'Pause Script', type: 'checkbox', pane: 'main', tooltip: 'Disable All Automation'},
        {scope: 'script', group: 'general', name: 'language', title: tr('settings.main.language'), type: 'select', pane: 'main', tooltip: tr('settings.main.language.tooltip'), 
            opts: [ { name: 'english',  value: 'en'},
                    { name: 'polski',   value: 'pl'},
                    { name: 'français', value: 'fr'}],
            onchange : function(newValue) {
                GM_setValue('language', newValue);
            }
        },
        {scope: 'script', group: 'general', name: 'scriptDebugMode', title: tr('settings.main.debug'), type: 'checkbox', pane: 'main', tooltip: tr('settings.main.debug.tooltip'),
            onchange: function(newValue) {
                unsafeWindow.console.log('DebugMode set to: ' + newValue);
                console = newValue ? unsafeWindow.console || fouxConsole : fouxConsole;
            }
        },
        {scope: 'script', group: 'general', name: 'autoReload', title: tr('settings.main.autoreload'), type: 'checkbox', pane: 'main', tooltip: tr('settings.main.autoreload.tooltip')},
        {scope: 'script', group: 'general', name: 'scriptDelayFactor', title: tr('settings.main.incdelay'), type: 'select', pane: 'main', tooltip: tr('settings.main.incdelay.tooltip'),
            opts: [ { name: 'default - 1',  value: '1'},
                    { name: '1.5',          value: '1.5'},
                    { name: '2',            value: '2'},
                    { name: '2.5',          value: '2.5'},
                    { name: '3',            value: '3'}],
        },
        {scope: 'script', group: 'general', name: 'autoLogin', title: tr('settings.main.autologin'), type: 'checkbox', pane: 'main', tooltip: tr('settings.main.autologin.tooltip')},
        {scope: 'script', group: 'general', name: 'autoLoginAccount', title: tr('settings.main.nw_username'),   type: 'text',     pane: 'main', tooltip: tr('settings.main.nw_username.tooltip')},
        {scope: 'script', group: 'general', name: 'autoLoginPassword', title: tr('settings.main.nw_password'),   type: 'password', pane: 'main', tooltip: tr('settings.main.nw_password.tooltip')},
        {scope: 'script', group: 'general', name: 'saveCharNextTime', title: tr('settings.main.savenexttime'),   type: 'checkbox', pane: 'main', tooltip: tr('settings.main.savenexttime.tooltip')},
        {scope: 'script', group: 'general', name: 'maxCollectTaskAttempts', title: 'Number of attempts to collect task result',   type: 'select', pane: 'main', tooltip: 'After this number of attempts the the script will continue without collecting',
            opts: [ { name: '1',  value: 1},  { name: '2',  value: 2},  { name: '3',  value: 3}], },
        
        {scope: 'account', group: 'generalSettings', name: 'openRewards', title: tr('settings.general.openrewards'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.openrewards.tooltip')},
        {scope: 'account', group: 'generalSettings', name: 'openCelestialBox', title: tr('settings.general.opencelestial'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.opencelestial.tooltip')},
        {scope: 'account', group: 'generalSettings', name: 'keepOneUnopened', title: tr('settings.general.keepOneUnopened'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.keepOneUnopened.tooltip')},
        {scope: 'account', group: 'generalSettings', name: 'openInvocation', title: tr('settings.general.openInvocation'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.openInvocation.tooltip')},
        {scope: 'account', group: 'generalSettings', name: 'refineAD', title: tr('settings.general.refinead'),           type: 'checkbox', pane: 'main', tooltip: tr('settings.general.refinead.tooltip')},
        {scope: 'account', group: 'generalSettings', name: 'runSCA', title: tr('settings.general.runSCA'),               type: 'select',   pane: 'main', tooltip: tr('settings.general.runSCA.tooltip'),
            opts: [ { name: 'never',        value: 'never'}, 
                    { name: 'free time',    value: 'free'}, 
                    { name: 'always',       value: 'always'}],
            },        
        {scope: 'account', group: 'professionSettings', name: 'fillOptionals',         type: 'checkbox', pane: 'prof', title: tr('settings.profession.fillOptionals'),   tooltip: tr('settings.profession.fillOptionals.tooltip')},
        {scope: 'account', group: 'professionSettings', name: 'autoPurchaseRes',       type: 'checkbox', pane: 'prof', title: tr('settings.profession.autoPurchase'),    tooltip: tr('settings.profession.autoPurchase.tooltip')},
        {scope: 'account', group: 'professionSettings', name: 'trainAssets',           type:'checkbox',  pane: 'prof', title: tr('settings.profession.trainAssets'),     tooltip: tr('settings.profession.trainAssets.tooltip')},
        {scope: 'account', group: 'professionSettings', name: 'smartLeadershipAssets', type:'checkbox',  pane: 'prof', title: tr('settings.profession.smartLeadership'), tooltip: tr('settings.profession.smartLeadership.tooltip')},
        {scope: 'account', group: 'professionSettings', name: 'skipPatrolTask',        type:'select',    pane: 'prof', title: tr('settings.profession.skipPatrol'),      tooltip: tr('settings.profession.skipPatrol.tooltip'),
            opts:[{name:'never',value:'never'},{name:'always',value:'always'},{name:'AD profile',value:'ad'},{name:'Leadership lvl 20',value:'ld20'},{name:'AD&Lvl20',value:'AD&Lvl20'}]},
        {scope: 'account', group: 'professionSettings', name: 'stopNotLeadership',        type:'select',    pane: 'prof', title: tr('settings.profession.stopNotLeadership'),      tooltip: tr('settings.profession.stopNotLeadership.tooltip'),
            opts:[{name:'never',value:'0'},{name: '20' ,value: 20},{name: '25' ,value: 25}]},
        {scope: 'account', group: 'professionSettings', name: 'stopAlchemyAt3',        type:'checkbox',    pane: 'prof', title: tr('settings.profession.stopAlchemyAt3'),      tooltip: tr('settings.profession.stopAlchemyAt3.tooltip')},
        {scope: 'account', group: 'vendorSettings', name:'vendorJunk',  type:'checkbox',     pane:'vend',   title:'Auto Vendor junk..',     tooltip:'Vendor all (currently) winterfest fireworks+lanterns'},
        {scope: 'account', group: 'vendorSettings', name:'vendorKitsLimit', type:'checkbox', pane:'vend',   title:'Vendor/Maintain Node Kit Stacks',  tooltip:'Limit skill kits stacks to 50, vendor kits unusable by class, remove all if player has one bag or full bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorAltarsLimit', type:'checkbox', pane:'vend',   title:'Vendor/Maintain Altar Stacks',  tooltip:'Limit Altars to 80,remove all if player has one bag or full bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorKitsAll',   type:'checkbox', pane:'vend',   title:'Vendor All Node Kits',   tooltip:'Sell ALL skill kits.'},
        {scope: 'account', group: 'vendorSettings', name:'vendorAltarsAll', type:'checkbox', pane:'vend',   title:'Vendor All Altar',       tooltip:'Sell ALL Altars.'},
        {scope: 'account', group: 'vendorSettings', name:'vendorProfResults',type:'checkbox',pane:'vend',   title:'Vendor/Maintain Prof Crafted Levelup Items',    tooltip:'Vendor off Tier 1 to 5 items produced and reused for leveling crafting professions.'},
        {scope: 'account', group: 'vendorSettings', name:'vendorPots1',     type:'checkbox', pane:'vend',   title:'Auto Vendor minor potions (lvl 1)',  tooltip:'Vendor all minor potions (lvl 1) found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorPots2',     type:'checkbox', pane:'vend',   title:'Auto Vendor lesser potions (lvl 15)',tooltip:'Vendor all lesser potions (lvl 15) found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorPots3',     type:'checkbox', pane:'vend',   title:'Auto Vendor potions (lvl 30)',       tooltip:'Vendor all potions (lvl 30) found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorPots4',     type:'checkbox', pane:'vend',   title:'Auto Vendor greater potions (lvl 45)',   tooltip:'Vendor all greater potions (lvl 45) found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorPots5',     type:'checkbox', pane:'vend',   title:'Auto Vendor major potions (lvl 60)',     tooltip:'Auto Vendor major potions (lvl 60)'},
        {scope: 'account', group: 'vendorSettings', name:'vendorHealingPots',     type:'checkbox', pane:'vend',   title:'Auto Vendor healing potions (1-60)',     tooltip:'Auto Vendor healing potions (lvl 60)'},
        {scope: 'account', group: 'vendorSettings', name:'vendorEnchR1',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 1',    tooltip:'Vendor all Rank 1 enchantments & runestones found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorEnchR2',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 2',    tooltip:'Vendor all Rank 2 enchantments & runestones found in player bags'},
        {scope: 'account', group: 'vendorSettings', name:'vendorEnchR3',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 3',    tooltip:'Vendor all Rank 3 enchantments & runestones found in player bags'},
        {scope: 'account', group: 'consolidationSettings', name:'consolidate',    type:'checkbox', pane:'bank', title: tr('settings.consolid.consolidate'),    tooltip: tr('settings.consolid.consolidate.tooltip') ,border:true},
        {scope: 'account', group: 'consolidationSettings', name:'bankCharName',   type:'text',     pane:'bank', title: tr('settings.consolid.bankerName'),     tooltip: tr('settings.consolid.bankerName.tooltip')},
        {scope: 'account', group: 'consolidationSettings', name:'minToTransfer',  type:'text',     pane:'bank', title: tr('settings.consolid.minToTransfer'),  tooltip: tr('settings.consolid.minToTransfer.tooltip')},
        {scope: 'account', group: 'consolidationSettings', name:'minCharBalance', type:'text',     pane:'bank', title: tr('settings.consolid.minCharBalance'), tooltip: tr('settings.consolid.minCharBalance.tooltip')},
        {scope: 'account', group: 'consolidationSettings', name:'transferRate',   type:'text',     pane:'bank', title: tr('settings.consolid.transferRate'),   tooltip: tr('settings.consolid.transferRate.tooltip')},

        {scope: 'char', group: 'general', name: 'active',     type:'checkbox',    pane: 'main_not_tab',    title: 'Active',   tooltip: 'The char will be processed by the script'},
        {scope: 'char', group: 'general', name:'overrideGlobalSettings',    type:'checkbox',    pane:'main_not_tab',    title:'Override account settings for this char',   tooltip:''},
        {scope: 'char', group: 'general', name:'manualTaskSlots',    type:'checkbox',    pane:'main_not_tab',    title:'Use manual task allocation tab',   tooltip:'Per slot profile allocation'},
        
        {scope: 'char', group: 'generalSettings', name: 'openRewards', title: tr('settings.general.openrewards'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.openrewards.tooltip')},
        {scope: 'char', group: 'generalSettings', name: 'openCelestialBox', title: tr('settings.general.opencelestial'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.opencelestial.tooltip')},
        {scope: 'char', group: 'generalSettings', name: 'keepOneUnopened', title: tr('settings.general.keepOneUnopened'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.keepOneUnopened.tooltip')},
        {scope: 'char', group: 'generalSettings', name: 'openInvocation', title: tr('settings.general.openInvocation'),  type: 'checkbox', pane: 'main', tooltip: tr('settings.general.openInvocation.tooltip')},
        {scope: 'char', group: 'generalSettings', name: 'refineAD',    title: tr('settings.general.keepOneUnopened'),           type: 'checkbox', pane: 'main', tooltip: tr('settings.general.refinead.tooltip')},
        {scope: 'char', group: 'generalSettings', name: 'runSCA',    title: tr('settings.general.runSCA'),               type: 'select',   pane: 'main', tooltip: tr('settings.general.runSCA.tooltip'),
            opts: [ { name: 'never',        value: 'never'}, 
                    { name: 'free time',    value: 'free'}, 
                    { name: 'always',       value: 'always'}],
            },        
        
        {scope: 'char', group: 'professionSettings', name: 'fillOptionals',         type: 'checkbox', pane: 'prof', title: tr('settings.profession.fillOptionals'),   tooltip: tr('settings.profession.fillOptionals.tooltip')},
        {scope: 'char', group: 'professionSettings', name: 'autoPurchaseRes',       type: 'checkbox', pane: 'prof', title: tr('settings.profession.autoPurchase'),    tooltip: tr('settings.profession.autoPurchase.tooltip')},
        {scope: 'char', group: 'professionSettings', name: 'trainAssets',           type:'checkbox',  pane: 'prof', title: tr('settings.profession.trainAssets'),     tooltip: tr('settings.profession.trainAssets.tooltip')},
        {scope: 'char', group: 'professionSettings', name: 'smartLeadershipAssets', type:'checkbox',  pane: 'prof', title: tr('settings.profession.smartLeadership'), tooltip: tr('settings.profession.smartLeadership.tooltip')},
        {scope: 'char', group: 'professionSettings', name: 'skipPatrolTask',        type: 'select',   pane: 'prof', title: tr('settings.profession.skipPatrol'),      tooltip: tr('settings.profession.skipPatrol.tooltip'),
            opts:[{name:'never',value:'never'},{name:'always',value:'always'},{name:'AD profile',value:'ad'},{name:'Leadership lvl 20',value:'ld20'},{name:'AD&Lvl20',value:'AD&Lvl20'}]},
        {scope: 'char', group: 'professionSettings', name: 'stopNotLeadership',        type:'select',    pane: 'prof', title: tr('settings.profession.stopNotLeadership'),      tooltip: tr('settings.profession.stopNotLeadership.tooltip'),
            opts:[{name:'never',value:0},{name: '20' ,value: 20},{name: '25' ,value: 25}]},
        {scope: 'char', group: 'professionSettings', name: 'stopAlchemyAt3',        type:'checkbox',    pane: 'prof', title: tr('settings.profession.stopAlchemyAt3'),      tooltip: tr('settings.profession.stopAlchemyAt3.tooltip')},
        
        {scope: 'char', group: 'vendorSettings', name:'vendorJunk',  type:'checkbox',     pane:'vend',   title:'Auto Vendor junk..',     tooltip:'Vendor all (currently) winterfest fireworks+lanterns'},
        {scope: 'char', group: 'vendorSettings', name:'vendorKitsLimit', type:'checkbox', pane:'vend',   title:'Vendor/Maintain Altar Node Kit Stacks',  tooltip:'Limit skill kits stacks to 50/Altars80, vendor kits unusable by class, remove all if player has one bag or full bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorAltarsLimit', type:'checkbox', pane:'vend', title:'Vendor/Maintain Altar Stacks',  tooltip:'Limit Altars to 80,remove all if player has one bag or full bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorKitsAll',   type:'checkbox', pane:'vend',   title:'Vendor All Node Kits',   tooltip:'Sell ALL skill kits.'},
        {scope: 'char', group: 'vendorSettings', name:'vendorAltarsAll', type:'checkbox', pane:'vend',   title:'Vendor All Altar',       tooltip:'Sell ALL Altars.'},
        {scope: 'char', group: 'vendorSettings', name:'vendorProfResults',type:'checkbox',pane:'vend',   title:'Vendor/Maintain Prof Crafted Levelup Items',    tooltip:'Vendor off Tier 1 to 5 items produced and reused for leveling crafting professions.'},
        {scope: 'char', group: 'vendorSettings', name:'vendorPots1',     type:'checkbox', pane:'vend',   title:'Auto Vendor minor potions (lvl 1)',  tooltip:'Vendor all minor potions (lvl 1) found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorPots2',     type:'checkbox', pane:'vend',   title:'Auto Vendor lesser potions (lvl 15)',tooltip:'Vendor all lesser potions (lvl 15) found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorPots3',     type:'checkbox', pane:'vend',   title:'Auto Vendor potions (lvl 30)',       tooltip:'Vendor all potions (lvl 30) found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorPots4',     type:'checkbox', pane:'vend',   title:'Auto Vendor greater potions (lvl 45)',   tooltip:'Vendor all greater potions (lvl 45) found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorPots5',     type:'checkbox', pane:'vend',   title:'Auto Vendor major potions (lvl 60)',     tooltip:'Auto Vendor major potions (lvl 60)'},        
        {scope: 'char', group: 'vendorSettings', name:'vendorEnchR1',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 1',    tooltip:'Vendor all Rank 1 enchantments & runestones found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorEnchR2',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 2',    tooltip:'Vendor all Rank 2 enchantments & runestones found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorEnchR3',    type:'checkbox', pane:'vend',   title:'Auto Vendor enchants & runes Rank 3',    tooltip:'Vendor all Rank 3 enchantments & runestones found in player bags'},
        {scope: 'char', group: 'vendorSettings', name:'vendorHealingPots',     type:'checkbox', pane:'vend',   title:'Auto Vendor healing potions (1-60)',     tooltip:'Auto Vendor healing potions (lvl 60)'},        
        {scope: 'char', group: 'consolidationSettings', name:'consolidate',    type:'checkbox', pane:'bank', title: tr('settings.consolid.consolidate'),    tooltip: tr('settings.consolid.consolidate.tooltip'), border:true},
        {scope: 'char', group: 'consolidationSettings', name:'minToTransfer',  type:'text',     pane:'bank', title: tr('settings.consolid.minToTransfer'),  tooltip: tr('settings.consolid.minToTransfer.tooltip')},
        {scope: 'char', group: 'consolidationSettings', name:'minCharBalance', type:'text',     pane:'bank', title: tr('settings.consolid.minCharBalance'), tooltip: tr('settings.consolid.minCharBalance.tooltip')},
        
        
        
    ];

/*
    // TODO: fix debug console on save call
          // call the onsave for the setting if it exists
        if (typeof(settingnames[i].onsave) === "function") {
            console.log("Calling 'onsave' for", settingnames[i].name);
            settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
        }
    }
    */
   
    // Page Settings
    var PAGES = Object.freeze({
        LOGIN: {
            name: "Login",
            path: "div#login"
        },
        GUARD: {
            name: "Guard",
            path: "div#page-accountguard"
        },
    });

    /**
     * Uses the page settings to determine which page is currently displayed
     */

    function GetCurrentPage() {
        var pageReturn;
        
        $.each(PAGES, function(index, page) {
            if ($(page["path"]).filter(":visible").length) {
                pageReturn = page["name"];
                return false;
            }
        });
        
        return pageReturn;
    }

    /**
     * Logs in to gateway
     * No client.dataModel exists at this stage
     */

    function page_LOGIN() {
        //if (!$("form > p.error:visible").length && settings["autologin"]) {
        // No previous log in error - attempt to log in
        
        if (scriptSettings.general.autoLogin) {
            console.log("Setting username");
            $("input#user").val(scriptSettings.general.autoLoginAccount);
            console.log("Setting password");
            $("input#pass").val(scriptSettings.general.autoLoginPassword);
            console.log("Clicking Login Button");
            $("div#login > input").click();
            //}
        }
        dfdNextRun.resolve(delay.LONG);

    }

    /**
     * Action to perform on account guard page
     */

    function page_GUARD() {
        // Do nothing on the guard screen
        dfdNextRun.resolve(delay.LONG);
    }

    /**
     * Collects rewards for tasks or starts new tasks
     * Function is called once per new task and returns true if an action is created
     * If no action is started function returns false to switch characters
     */

    function processCharacter() {
        // Switch to professions page to show task progression
        unsafeWindow.location.hash = "#char(" + encodeURI(unsafeWindow.client.getCurrentCharAtName()) + ")/professions";

        // Collect rewards for completed tasks and restart
        if (unsafeWindow.client.dataModel.model.ent.main.itemassignments.complete) {
            if (!unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.every(function(entry, idx) {
                if (entry.hascompletedetails && (collectTaskAttempts[idx] < scriptSettings.general.maxCollectTaskAttempts)) {
                    unsafeWindow.client.professionTaskCollectRewards(entry.uassignmentid);
                    collectTaskAttempts[idx]++;
                    return false;
                }
                return true;
            })) {
            dfdNextRun.resolve(delay.SHORT);
            return true;
            }
        }

        // Check for available slots and start new task
        console.log("Looking for empty slots.");
        var slots = unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) {
            return (!entry.islockedslot && !entry.uassignmentid);
        });
        if (slots.length) {
            if (charSettingsList[curCharName].general.manualTaskSlots) {
                var slotIndex = slots[0].slotindex;
                var _task = tasklist.filter(function(task) {
                    return task.taskListName === charSettingsList[curCharName].taskListSettingsManual[slotIndex].Profession;
                })[0];
                
                var _profile = _task.profiles.filter(function(profile) {
                    return profile.profileName === charSettingsList[curCharName].taskListSettingsManual[slotIndex].Profile;
                })[0];

                if (failedProfiles[_task.taskListName] && failedProfiles[_task.taskListName].indexOf(_profile.profileName) === -1) {
                    console.warn("Profile ", _profile.profileName, " for task ", _task.taskListName, " failed previously, skipping slot");
                    return false; // TODO: Should skip the slot and not the char entierly.
                }

                console.log("Allocating per slot. For slot #" + slotIndex + " profession: " + _task.taskListName + " profile: " +  _profile.profileName);
                unsafeWindow.client.professionFetchTaskList('craft_' + _task.taskName);
                window.setTimeout(function() {
                    createNextTask(_task, _profile, 0);
                }, delay.SHORT);
                return true;
            }
            else {
                // Go through the professions to assign tasks until specified slots filled
                console.log("Prioritizing task lists.");
                var charTaskList = tasklist
                    .filter(function(task) {
                        var level = unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories.filter(function(entry) {
                                return entry.name == task.taskName;
                            })
                        level = (level[0]) ? level[0].currentrank : 0;
                        console.log(level, task.taskListName, (charSettingsList[curCharName].taskListSettings[task.taskListName].stopTaskAtLevel == 0 || charSettingsList[curCharName].taskListSettings[task.taskListName].stopTaskAtLevel > level));
                        return ((charSettingsList[curCharName].taskListSettings[task.taskListName].taskSlots > 0) 
                                && (failedTasksList.indexOf(task.taskListName) === -1)
                                && (charSettingsList[curCharName].taskListSettings[task.taskListName].stopTaskAtLevel == 0 || charSettingsList[curCharName].taskListSettings[task.taskListName].stopTaskAtLevel > level));
                    })
                    .sort(function(a, b) {
                        return (charSettingsList[curCharName].taskListSettings[a.taskListName].taskPriority - charSettingsList[curCharName].taskListSettings[b.taskListName].taskPriority);
                    });

                console.log("Attempting to fill the slot.");
                for (var i = 0; i < charTaskList.length; i++) {
                    var currentTasks = unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) {
                        return entry.category == charTaskList[i].taskName;
                    });
                    if (currentTasks.length < charSettingsList[curCharName].taskListSettings[charTaskList[i].taskListName].taskSlots) {
                        unsafeWindow.client.professionFetchTaskList('craft_' + charTaskList[i].taskName);
                        var profile = charTaskList[i].profiles.filter(function(profile) {
                            return profile.profileName == charSettingsList[curCharName].taskListSettings[charTaskList[i].taskListName].taskProfile;
                        })[0];
                        console.log('Selecting profile: ' + profile.profileName);

                        window.setTimeout(function() {
                            createNextTask(charTaskList[i], profile, 0);
                        }, delay.SHORT);
                        return true;
                    }
                }
            };
            console.log("All task counts assigned");
        } else {
            console.log("No available task slots");
        }

        // TODO: Add code to get next task finish time
        chartimers[curCharNum] = getNextFinishedTask();

        // Add diamond count
        chardiamonds[curCharNum] = unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds;
        console.log(curCharName + "'s", "Astral Diamonds:", chardiamonds[curCharNum]);
        // Add gold count
        chargold[curCharNum] = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.gold);
        return false;
    }



    // Running SCA for a single Char (based on CycleSCA)
    function processCharSCA(charIdx) {
        var _hasLoginDaily = 0;
        var _scaHashMatch = /\/adventures$/;
        var _charName = charNamesList[charIdx];
        var _fullCharName = _charName + "@" + loggedAccount;
       /*
       if (!scriptSettings.paused)
            PauseSettings("pause");
*/
        if (!_scaHashMatch.test(unsafeWindow.location.hash)) {
            return;
        } else if (unsafeWindow.location.hash != "#char(" + encodeURI(_fullCharName) + ")/adventures") {
            unsafeWindow.location.hash = "#char(" + encodeURI(_fullCharName) + ")/adventures";
        }

        WaitForState("").done(function() {
            try {
                _hasLoginDaily = client.dataModel.model.gatewaygamedata.dailies.left.logins;
            } catch (e) {
                window.setTimeout(function() {
                    processCharSCA(charIdx);
                }, delay.SHORT);
                return;
            }

            console.log("Checking SCA Dialy for " + _charName );

            // Do SCA daily dice roll if the button comes up
            WaitForState(".daily-dice-intro").done(function() {
                $(".daily-dice-intro button").trigger('click');
                WaitForState(".daily-awards-button").done(function() {
                    $(".daily-awards-button button").trigger('click');
                });
            });
            
            //console.log("after dice");
            WaitForNotState(".modal-window.daily-dice").done(function() {
                charStatisticsList[_charName].general.lastSCAVisit = Date.now();
                GM_setValue("statistics__char__" + _fullCharName , JSON.stringify(charStatisticsList[_charName]));
                updateCounters();

                //Adjusting for the time the SCA took
                var chardelay;
                if (chartimers[curCharNum] != null) {
                    chardelay = (chartimers[curCharNum]).getTime() - (new Date()).getTime() - unsafeWindow.client.getServerOffsetSeconds() * 1000;
                    if (chardelay < delay.SHORT) {
                        chardelay = delay.SHORT;
                    }
                }
                else chardelay = delay.SHORT;
                if (chardelay > (delay.SHORT * 3)) unsafeWindow.location.hash = "#char(" + encodeURI(_fullCharName) + ")/professions";
                console.log("Finished SCA check for " + charNamesList[charIdx] + " delay " + chardelay);
                dfdNextRun.resolve(chardelay);
            });
        });
    }



    /**
     * Switch to a character's swordcoast adventures and collect the daily reward
     */

    function processSwordCoastDailies(_charStartIndex) {
        var _accountName = unsafeWindow.client.dataModel.model.loginInfo.publicaccountname;
        var _charIndex = (!_charStartIndex || parseInt(_charStartIndex) > (charNamesList.length + 1) || parseInt(_charStartIndex) < 0) ? 0 : parseInt(_charStartIndex);
        var _fullCharName = charNamesList[_charIndex] + '@' + _accountName;
        var _hasLoginDaily = 0;
        var _isLastChar = false;
        var _scaHashMatch = /\/adventures$/;
        if (!scriptSettings.paused)
            PauseSettings("pause");

        // Switch to professions page to show task progression
        if (!_scaHashMatch.test(unsafeWindow.location.hash)) {
            return;
        } else if (unsafeWindow.location.hash != "#char(" + encodeURI(_fullCharName) + ")/adventures") {
            unsafeWindow.location.hash = "#char(" + encodeURI(_fullCharName) + ")/adventures";
        }

        if (_charIndex >= (charNamesList.length -1))
            _isLastChar = true;

        WaitForState("").done(function() {
            try {
                _hasLoginDaily = client.dataModel.model.gatewaygamedata.dailies.left.logins;
            } catch (e) {
                // TODO: Use callback function
                window.setTimeout(function() {
                    processSwordCoastDailies(_charIndex);
                }, delay.SHORT);
                return;
            }

            console.log("Checking SCA Dialy for", _fullCharName, "...");

            // Do SCA daily dice roll if the button comes up
            WaitForState(".daily-dice-intro").done(function() {
                $(".daily-dice-intro button").trigger('click');
                WaitForState(".daily-awards-button").done(function() {
                    $(".daily-awards-button button").trigger('click');
                });
            });

            // If Dice roll dialog is non existant
            WaitForNotState(".modal-window.daily-dice").done(function() {
                charStatisticsList[charNamesList[_charIndex]].general.lastSCAVisit = Date.now();
                GM_setValue("statistics__char__" + _fullCharName , JSON.stringify(charStatisticsList[charNamesList[_charIndex]]));
                updateCounters();
                if (_isLastChar) {
                    window.setTimeout(function() {
                        PauseSettings("unpause");
                    }, 3000);
                } else {
                    window.setTimeout(function() {
                        processSwordCoastDailies(_charIndex + 1);
                    }, 3000);
                }
            });
        });
    }

    /**
     * Finds the task finishing next & returns the date or NULL otherwise
     *
     * @return {Date} / {null}
     */

    function getNextFinishedTask() {
        var tmpNext,
            next = null;
        unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(entry, idx) {
            if (entry.uassignmentid && (collectTaskAttempts[idx] < scriptSettings.general.maxCollectTaskAttempts)) {
                tmpNext = new Date(entry.ufinishdate);
                if (!next || tmpNext < next) {
                    next = tmpNext;
                }
            }
        });
        if (next) {
            console.log("Next finished task at " + next.toLocaleString());
        } else {
            console.log("No next finishing date found!!");
        }
        return next;
    }

    /**
     * Iterative approach to finding the next task to assign to an open slot.
     *
     * @param {Array} prof The tasklist for the profession being used
     * @param {int} i The current task number being attempted
     */

    function createNextTask(prof, profile, i) {
        // TODO: Use callback function
        if (!unsafeWindow.client.dataModel.model.craftinglist || unsafeWindow.client.dataModel.model.craftinglist === null || !unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] || unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] === null) {
            console.log('Task list not loaded for:', prof.taskName);
            window.setTimeout(function() {
                createNextTask(prof, profile, i);
            }, delay.SHORT);
            return false;
        }

        // Check level
        var level = unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories.filter(function(entry) {
            return entry.name == prof.taskName;
        })[0].currentrank;
        var list = profile.level[level];
        
        var taskBlocked = ((getSetting('professionSettings','stopNotLeadership') == 20 && prof.taskName != 'Leadership' && level >= 20) || 
            (getSetting('professionSettings','stopNotLeadership') == 25 && prof.taskName != 'Leadership' && level >= 25) ||
            (getSetting('professionSettings','stopAlchemyAt3') && prof.taskName == 'Alchemy' && level > 3));
        
        if(list.length <= i || taskBlocked) {
            if (!taskBlocked) console.log("Task list exhausted for ", prof.taskListName, " at level ", level, " profile: ", profile.profileName);
            else console.warn("Task list blocked for ", prof.taskListName, " at level ", level, " profile: ", profile.profileName);
            
            failedTasksList.push(prof.taskListName);
            if (typeof failedProfiles[prof.taskListName] === 'undefined') {
                failedProfiles[prof.taskListName] = [];
            }
            failedProfiles[prof.taskListName].push(profile.profileName);
            
            dfdNextRun.resolve(delay.SHORT);
            //switchChar();
            return false;
        }
        console.log(prof.taskName, "is level", level);
        console.log("createNextTask", list.length, i);

        var taskName = list[i];
        console.log("Searching for task:", taskName);

        // Search for task to start
        var task = searchForTask(taskName, prof.taskName, profile, level);

        // Finish createNextTask function
        if (task === null) {
            console.log("Skipping task selection to purchase resources");
            dfdNextRun.resolve();
            return true;
        }
        if (task) {
            antiInfLoopTrap.currTaskName = task.def.name;
            antiInfLoopTrap.currCharName = unsafeWindow.client.getCurrentCharAtName();
            task = '/professions-tasks/' + prof.taskName + '/' + task.def.name;
            console.log('Task Found');
            unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/, ')' + task);
            WaitForState("div.page-professions-taskdetails").done(function() {
                // Click all buttons and select an item to use in the slot
                var def = $.Deferred();
                var buttonList = $('.taskdetails-assets:eq(1)').find("button");
                if (buttonList.length && getSetting('professionSettings','fillOptionals')) {
                    SelectItemFor(buttonList, 0, def, prof);
                } else {
                    def.resolve();
                }
                def.done(function() {
                    // All items are populated
                    console.log("Items Populated");
                    // Click the Start Task Button
                    //Get the start task button if it is enabled
                    var enabledButton = $(".footer-professions-taskdetails .button.epic:not('.disabled') button");
                    if (enabledButton.length) {
                        console.log("Clicking Start Task Button");
                        enabledButton.trigger('click');
                        WaitForState("").done(function() {
                            // Done
                            dfdNextRun.resolve(delay.SHORT);
                        });
                        if (antiInfLoopTrap.prevCharName == antiInfLoopTrap.currCharName && antiInfLoopTrap.prevTaskName == antiInfLoopTrap.currTaskName) {
                            antiInfLoopTrap.startCounter++;
                            console.log(antiInfLoopTrap.prevCharName + " starts " + antiInfLoopTrap.prevTaskName + " " + antiInfLoopTrap.startCounter + " time in row");
                        } else {
                            antiInfLoopTrap.prevCharName = antiInfLoopTrap.currCharName;
                            antiInfLoopTrap.prevTaskName = antiInfLoopTrap.currTaskName;
                            antiInfLoopTrap.startCounter = 1;
                        }
                        if (antiInfLoopTrap.startCounter >= 10) {
                            console.log("Restart needed: " + (antiInfLoopTrap.trapActivation - antiInfLoopTrap.startCounter) + " loop circuits to restart");
                        }
                        return true;
                    } else { // Button not enabled, something required was probably missing
                        // Go back
                        $(".footer-professions-taskdetails .button button.resetWindow").trigger('click');
                        WaitForState("").done(function() {
                            // continue with the next one
                            console.log('Finding next task');
                            createNextTask(prof, profile, i + 1);
                        });
                    }
                });
            });
        } else {
            console.log('Finding next task');
            createNextTask(prof, profile, i + 1);
        }
    }
    /** Count resouce in bags
     *
     * @param {string} name The name of resource
     */

    function countResource(name) {
        var count = 0;
        var _bags = unsafeWindow.client.dataModel.model.ent.main.inventory.bags;
        console.log("Checking bags for " + name);
        $.each(_bags, function(bi, bag) {
            bag.slots.forEach(function(slot) {
                if (slot && slot.name === name) {
                    count = count + slot.count;
                }
            });
        });
        return count;
    }

    function countUnusedResource(name) {
        var count = 0;
        var bag = unsafeWindow.client.dataModel.model.ent.main.inventory.tradebag;
        bag.forEach(function(slot) {
            if (slot && slot.name === name) {
                count = count + slot.count;
            }
        });
        return count;
    }

    function countUsedResource(name) {
        return countResource(name) - countUnusedResource(name);
    }

    /**
     * Checks task being started for requirements and initiates beginning task if found
     *
     * @param {string} taskname The name of the task being started
     * @param {string} profname The name of the profession being used
     * @param {Deferred} dfd Deferred object to process on return
     */

    function searchForTask(taskname, profname, profile, professionLevel) {
        // Return first object that matches exact craft name
        // edited by WloBeb - start Patrol the Mines task only if char has less than 10 Mining Claims
        var skip_setting = getSetting('professionSettings', 'skipPatrolTask');
            
        if (taskname == "Leadership_Tier3_13_Patrol" && (skip_setting == 'always' ||
            (skip_setting == 'ad' && profile.profileName == "AD") || (skip_setting == 'ld20' && professionLevel >= 20) ||
            (skip_setting == 'AD&Lvl20' && professionLevel >= 20 && profile.profileName == "AD"))) {
            if (countResource("Crafting_Resource_Mining_Claim") >= 10) {
                console.log("Too many Mining Claims: skiping");
                return false;
            }
        }

        var thisTask = unsafeWindow.client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) {
            return entry.def && entry.def.name == taskname;
        })[0];

        // If no task is returned we either have three of this task already, the task is a rare that doesn't exist currently, or we have the name wrong in tasklist
        if (!thisTask) {
            console.log('Could not find task for:', taskname);
            return false;
        }

        // start task if requirements are met
        if (!thisTask.failslevelrequirementsfilter && !thisTask.failslevelrequirements && !thisTask.failsresourcesrequirements) {
            return thisTask;
        }

        // Too high level
        if (thisTask.failslevelrequirements) {
            console.log("Task level is too high:", taskname);
            return false;
        }

        var searchItem = null;
        var searchAsset = false;

        // Check for and buy missing armor & weapon leadership assets
        if (thisTask.failsresourcesrequirements && profname == "Leadership" && getSetting('professionSettings','autoPurchaseRes')) {
            var failedAssets = thisTask.required.filter(function(entry) {
                return !entry.fillsrequirements;
            });
            var failedArmor = failedAssets.filter(function(entry) {
                return entry.categories.indexOf("Armor") >= 0;
            });
            var failedWeapon = failedAssets.filter(function(entry) {
                return entry.categories.indexOf("Weapon") >= 0;
            });
            if (failedArmor.length || failedWeapon.length) {
                var _buyResult = false;
                var _charGold = unsafeWindow.client.dataModel.model.ent.main.currencies.gold;
                var _charSilver = unsafeWindow.client.dataModel.model.ent.main.currencies.silver;
                var _charCopper = unsafeWindow.client.dataModel.model.ent.main.currencies.copper;
                var _charCopperTotal = _charCopper + (_charSilver * 100) + (_charGold * 10000);

                // Buy Leadership Armor Asset
                if (failedArmor.length && _charCopperTotal >= 10000) {
                    console.log("Buying leadership asset:", failedArmor[0].icon);
                    _buyResult = buyTaskAsset(18);
                    unsafeWindow.client.professionFetchTaskList("craft_Leadership");
                }
                // Buy Leadership Infantry Weapon Asset
                else if (failedWeapon.length && _charCopperTotal >= 5000) {
                    console.log("Buying leadership asset:", failedWeapon[0].icon);
                    _buyResult = buyTaskAsset(4);
                    unsafeWindow.client.professionFetchTaskList("craft_Leadership");
                }
                if (_buyResult === false)
                    return false;
                else
                    return null;
            }
        }

        // Missing assets or ingredients
        if (thisTask.failsresourcesrequirements) {
            var failedAssets = thisTask.required.filter(function(entry) {
                return !entry.fillsrequirements;
            });

            // Missing required assets
            if (failedAssets.length) {
                var failedCrafter = failedAssets.filter(function(entry) {
                    return entry.categories.indexOf("Person") >= 0;
                });

                // Train Assets
                if (failedCrafter.length && getSetting('professionSettings','trainAssets')) {
                    console.log("Found required asset:", failedCrafter[0].icon);
                    searchItem = failedCrafter[0].icon;
                    searchAsset = true;
                } else {
                    // TODO: Automatically purchase item assets from shop
                    console.log("Not enough assets for task:", taskname);
                    return false;
                }
            }
            // Check for craftable ingredients items and purchasable profession resources (from vendor)
            else {
                var failedResources = thisTask.consumables.filter(function(entry) {
                    return entry.required && !entry.fillsrequirements;
                });

                // Check first required ingredient only
                // If it fails to buy or craft task cannot be completed anyway
                // If it succeeds script will search for tasks anew
                var itemName = failedResources[0].hdef.match(/\[(\w+)\]/)[1];

                // Buy purchasable resources if auto-purchase setting is enabled
                if (getSetting('professionSettings','autoPurchaseRes') && itemName.match(/^Crafting_Resource_(Charcoal|Rocksalt|Spool_Thread|Porridge|Solvent|Brimstone|Coal|Moonseasalt|Quicksilver|Spool_Threadsilk)$/)) {
                    // returns null if successful (task will try again) and false if unsuccessful (task will be skipped)
                    return buyResource(itemName);
                }
                // Matched profession auto-purchase item found but auto-purchase is not enabled
                else if (!getSetting('professionSettings','autoPurchaseRes') && itemName.match(/^Crafting_Resource_(Charcoal|Rocksalt|Spool_Thread|Porridge|Solvent|Brimstone|Coal|Moonseasalt|Quicksilver|Spool_Threadsilk)$/)) {
                    console.log("Purchasable resource required:", itemName, "for task:", taskname, ". Recommend enabling Auto Purchase Resources.");
                    if (pleaseBuy.push("Please buy " + itemName + " for " + unsafeWindow.client.getCurrentCharAtName()) > 5) {
                        pleaseBuy.shift();
                    }
                    return false;
                }
                // craftable ingredient set to search for
                else {
                    console.log("Found required ingredient:", itemName);
                    searchItem = itemName;
                }
            }
        }

        // either no craftable items/assets found or other task requirements are not met
        // Skip crafting ingredient tasks for Leadership
        if (searchItem === null || !searchItem.length || (profname == 'Leadership' && !searchAsset && !searchItem.match(/Crafting_Asset_Craftsman/))) {
            console.log("Failed to resolve item requirements for task:", taskname);
            return false;
        }

        var massTaskAllowed = ((profile !== undefined) && (profile.useMassTask !== undefined) && (profile.useMassTask === true));            

        // Generate list of available tasks to search ingredients/assets from
        console.log("Searching ingredient tasks for:", profname);
        var taskList = unsafeWindow.client.dataModel.model.craftinglist['craft_' + profname].entries.filter(function(entry) {
            // remove header lines first to avoid null def
            if (entry.isheader) {
                return false;
            }

            // Too high level
            if (entry.failslevelrequirements) {
                return false;
            }

            // Rewards do not contain item we want to make
            if (searchAsset) {
                if (entry.def.icon != searchItem || !entry.def.name.match(/Recruit/) || entry.def.requiredrank > 14) {
                    return false;
                }
            } else {
                if (!(entry.rewards.some(function(itm) {
                    try {
                        return itm.hdef.match(/\[(\w+)\]/)[1] == searchItem;
                    } catch (e) {}
                }))) {
                    return false;
                }
            }

            // Skip mass production tasks (don't skip for profiles with useMassTask flag == true)
            if (! massTaskAllowed) {
                if (entry.def.displayname.match(/^(Batch|Mass|Deep|Intensive) /)) {
                    return false;
                }
            }

            // Skip trading tasks
            if (entry.def.displayname.match(/rading$/)) {
                return false;
            }

            // Skip looping Transmute tasks
            if (entry.def.displayname.match(/^(Transmute|Create) /)) {
                return false;
            }

            return true;
        });

        if (!taskList.length) {
            console.log("No ingredient tasks found for:", taskname, searchItem);
            if (!searchItem.match(/(_Research)|(_Craftsman_)|(Crafted_)/)) {
                if (pleaseBuy.push("Please buy " + searchItem + " for " + unsafeWindow.client.getCurrentCharAtName()) > 5) {
                    pleaseBuy.shift();
                }
            }
            return false;
        }

        // for profiles with useMassTask flag == true select Mass task
        if (massTaskAllowed) {
            for (var i=0; i<taskList.length; i++) {
                if (taskList[i].def.displayname.match(/^(Batch|Mass|Deep|Intensive) /)) {
                    taskList = taskList.splice(i, 1);
                    break;
                }
            }
        }

        // Use more efficient Empowered task for Aqua if available.
        if ((searchItem == "Crafting_Resource_Aquavitae" || searchItem == "Crafting_Resource_Aquaregia") && taskList.length > 1) {
            taskList.shift();
        }

        // Should really only be one result now but lets iterate through anyway.
        for (var i = 0; i < taskList.length; i++) {
            console.log("Attempting search for ingredient task:", taskList[i].def.name);
            var task = searchForTask(taskList[i].def.name, profname, profile, professionLevel);
            if (task === null || task) {
                return task;
            }
        }
        return false;
    }


    /**
     * Selects the highest level asset for the i'th button in the list. Uses an iterative approach
     * in order to apply a sufficient delay after the asset is assigned
     *
     * @param {Array} The list of buttons to use to click and assign assets for
     * @param {int} i The current iteration number. Will select assets for the i'th button
     * @param {Deferred} jQuery Deferred object to resolve when all of the assets have been assigned
     */

    function SelectItemFor(buttonListIn, i, def, prof) {
        buttonListIn[i].click();
        WaitForState("").done(function() {

            var $assets = $("div.modal-item-list a").has("img[src*='_Resource_'],img[src*='_Assets_'],img[src*='_Tools_'],img[src*='_Tool_'],img[src*='_Jewelersloupe_'],img[src*='_Bezelpusher_']"); //edited by RottenMind
            var $persons = $("div.modal-item-list a").has("img[src*='_Follower_']");
            var quality = [".Special", ".Gold", ".Silver", ".Bronze"];
            var ic,
                $it;

            var clicked = false;

            // Try to avoid using up higher rank assets needlessly
            if (prof.taskName === "Leadership") {
                var mercenarys = $('div.modal-item-list a.Bronze img[src*="Crafting_Follower_Leader_Generic_T1_01"]').parent().parent();
                var guards = $('div.modal-item-list a.Bronze img[src*="Crafting_Follower_Leader_Guard_T2_01"]').parent().parent();
                var footmen = $('div.modal-item-list a.Bronze img[src*="Crafting_Follower_Leader_Private_T2_01"]').parent().parent();

                var T3_Epic = 0;
                var T3_Rare = 0;
                var T3_Uncommon = 0;
                var usedCommon;
                
                var _enableSmartLeadership = getSetting('professionSettings','smartLeadershipAssets'); 
                if (_enableSmartLeadership) {
                    T3_Epic = countResource("Crafting_Asset_Craftsman_Leadership_T3_Epic"); // number of heroes in inventory
                    T3_Rare = countResource("Crafting_Asset_Craftsman_Leadership_T3_Rare"); // number of adventurers in inventory
                    T3_Uncommon = countResource("Crafting_Asset_Craftsman_Leadership_T3_Uncommon"); // number of man-at-arms in inventory
                    usedCommon = countUsedResource("Crafting_Asset_Craftsman_Leadership_T3_Common") + countUsedResource("Crafting_Asset_Craftsman_Leadership_T2_Common") + countUsedResource("Crafting_Asset_Craftsman_Leadership_T1_Common_1"); //number of used mercenarys, guards and footmans
                }

                if (!(_enableSmartLeadership) || (_enableSmartLeadership && (T3_Epic + T3_Rare + T3_Uncommon + usedCommon < parseInt(charSettingsList[curCharName].taskListSettings["Leadership"].taskSlots) * 2))) {
                    if (mercenarys.length) {
                        clicked = true;
                        mercenarys[0].click();
                    } else if (guards.length) {
                        clicked = true;
                        guards[0].click();
                    } else if (footmen.length) {
                        clicked = true;
                        footmen[0].click();
                    }
                }
            }


            // check resources & assets for best quality, in descending order
            for (ic in quality) {
                $it = $assets.filter(quality[ic]);
                if ($it.length) {
                    $it[0].click();
                    clicked = true;
                    break;
                }
            }

            // if no asset was selected, check for persons for best speed, in descending order
            if (!clicked) {
                for (ic in quality) {
                    $it = $persons.filter(quality[ic]);
                    if ($it.length) {
                        $it[0].click();
                        clicked = true;
                        break;
                    }
                }
            }

            // if nothing was found at all, return immediately (skip other optional slots)
            if (!clicked) {
                $("button.close-button").trigger('click');
                console.log("Nothing more to click..");
                WaitForState("").done(function() {
                    // Let main loop continue
                    def.resolve();
                });
            }

            console.log("Clicked item");
            WaitForState("").done(function() {
                // Get the new set of select buttons created since the other ones are removed when the asset loads
                var buttonList = $('.taskdetails-assets:eq(1)').find("button");
                if (i < buttonList.length - 1) {
                    SelectItemFor(buttonList, i + 1, def, prof);
                } else {
                    // Let main loop continue
                    def.resolve();
                }
            });
        });
    }


    /**
     * Will buy a given purchasable resource
     *
     * @param {String} item The data-tt-item id of the Resource to purchase
     */

    function buyResource(item) {
        var _resourceID = {
            Crafting_Resource_Charcoal: 0,
            Crafting_Resource_Rocksalt: 1,
            Crafting_Resource_Spool_Thread: 2,
            Crafting_Resource_Porridge: 3,
            Crafting_Resource_Solvent: 4,
            Crafting_Resource_Brimstone: 5,
            Crafting_Resource_Coal: 6,
            Crafting_Resource_Moonseasalt: 7,
            Crafting_Resource_Quicksilver: 8,
            Crafting_Resource_Spool_Threadsilk: 9,
        };
        var _resourceCost = {
            Crafting_Resource_Charcoal: 30,
            Crafting_Resource_Rocksalt: 30,
            Crafting_Resource_Spool_Thread: 30,
            Crafting_Resource_Porridge: 30,
            Crafting_Resource_Solvent: 20,
            Crafting_Resource_Brimstone: 100,
            Crafting_Resource_Coal: 500,
            Crafting_Resource_Moonseasalt: 500,
            Crafting_Resource_Quicksilver: 500,
            Crafting_Resource_Spool_Threadsilk: 500,
        };
        var _charGold = unsafeWindow.client.dataModel.model.ent.main.currencies.gold;
        var _charSilver = unsafeWindow.client.dataModel.model.ent.main.currencies.silver;
        var _charCopper = unsafeWindow.client.dataModel.model.ent.main.currencies.copper;
        var _charCopperTotal = _charCopper + (_charSilver * 100) + (_charGold * 10000);
        var _resourcePurchasable = Math.floor(_charCopperTotal / _resourceCost[item]);
        // Limit resource purchase to 50 quantity
        var _purchaseCount = (_resourcePurchasable >= 50) ? 50 : _resourcePurchasable;

        if (_purchaseCount < 1) {
            // Not enough gold for 1 resource
            console.log("Purchasing profession resources failed for: ", item, " Have: ",_charCopperTotal, " Cost Per Item: ", _resourceCost[item], " Can buy: ", _resourcePurchasable);
            if (pleaseBuy.push("Please buy " + item + " for " + unsafeWindow.client.getCurrentCharAtName()) > 5) {
                pleaseBuy.shift();
            }
            return false;
        } else {
            // Make purchase
            console.log("Purchasing profession resources:", _purchaseCount + "x", item, ". Total copper available:", _charCopperTotal, ". Spending ", (_purchaseCount * _resourceCost[item]), "copper.");
            unsafeWindow.client.sendCommand("GatewayVendor_PurchaseVendorItem", {
                vendor: 'Nw_Gateway_Professions_Merchant',
                store: 'Store_Crafting_Resources',
                idx: _resourceID[item],
                count: _purchaseCount
            });
            WaitForState("button.closeNotification").done(function() {
                $("button.closeNotification").trigger('click');
            });
            return null;
        }
    }

    /** DRAFT
     * Will buy a missing leadership assets
     *
     * @param {String} item reference from assetID
     */

    function buyTaskAsset(_itemNo) {
        var _returnHast = unsafeWindow.location.hash;
        unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/, ')/professions/vendor');
        WaitForState("").done(function() {
            if ($('span.alert-red button[data-url-silent="/professions/vendor/Store_Crafting_Assets/' + _itemNo + '"]').length) {
                return false;
            } else if ($('button[data-url-silent="/professions/vendor/Store_Crafting_Assets/' + _itemNo + '"]').length) {
                $('button[data-url-silent="/professions/vendor/Store_Crafting_Assets/' + _itemNo + '"]').trigger('click');
                WaitForState(".modal-confirm button").done(function() {
                    $('.modal-confirm button').eq(1).trigger('click');
                    unsafeWindow.location.hash = _returnHast;
                    return null;
                });
            }
        });
    }

    // Function used to check exchange data model and post calculated AD/Zen for transfer if all requirements are met

    function postZaxOffer() {
        // Make sure the exchange data is loaded to model
        if (unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            // Check that there is atleast 1 free ZAX order slot
            if (unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length < 5) {
                // Place the order
                var exchangeDiamonds = parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                if (exchangeDiamonds > 0) {
                    console.log("AD in exchange: " + exchangeDiamonds);
                }  
                // Domino effect: this new order will post all the gathered diamonds until now
                var charDiamonds = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds);
                var ZenRate = parseInt(accountSettings.consolidationSettings.transferRate);
                if (!ZenRate) return;
                var ZenQty = Math.floor((charDiamonds + exchangeDiamonds - parseInt(getSetting('consolidationSettings','minCharBalance'))) / ZenRate);
                ZenQty = (ZenQty > 5000) ? 5000 : ZenQty;
                console.log("Posting ZAX buy listing for " + ZenQty + " ZEN at the rate of " + ZenRate + " AD/ZEN. AD remainder: " + charDiamonds + " - " + (ZenRate * ZenQty) + " = " + (charDiamonds - (ZenRate * ZenQty)));
                unsafeWindow.client.createBuyOrder(ZenQty, ZenRate);
                // set moved ad to the ad counter zax log
                var ADTotal = ZenRate * ZenQty - exchangeDiamonds;
                if (ADTotal > 0) {
                    console.log("AD moved to ZAX from", charNamesList[lastCharNum] + ":", ADTotal);
                    chardiamonds[lastCharNum] -= ADTotal;
                    console.log(charNamesList[lastCharNum] + "'s", "Astral Diamonds:", chardiamonds[lastCharNum]);
                    zaxdiamonds += ADTotal;
                    console.log("Astral Diamonds on the ZAX:", zaxdiamonds);
                }
            } else {
                console.log("Zen Max Listings Reached (5). Skipping ZAX Posting..");
            }
        } else {
            console.log("Zen Exchange data did not load in time for transfer. Skipping ZAX Posting..");
        }
    }

    // Function used to check exchange data model and withdraw listed orders that use the settings zen transfer rate

    function cancelZaxOffer() {
        // Make sure the exchange data is loaded to model
        if(unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            if(unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length >= 1) {
                console.log("Canceling ZAX orders");

                var charDiamonds = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds);
                var ZenRate = parseInt(getSetting('consolidationSettings','transferRate'));

                // cycle through the zax listings
                unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.forEach(function(item) {
                    // find any buy orders in the list with our set zen rate
                    if (parseInt(item.price) == ZenRate && item.ordertype == "Buy") {
                        // cancel/withdraw the order
                        client.withdrawOrder(item.orderid);
                        console.log("Canceling ZAX offer for " + item.quantity + " ZEN at the rate of " + item.price + " . Total value in AD: " + item.totaltc);
                    }
                });
            } else {
                console.log("No listings found on ZAX. Skipping ZAX Withrdaw..");
            }
        } else {
            console.log("Zen Exchange data did not load in time for transfer. Skipping ZAX Withrdaw..");
        }
    }

    function claimZaxOffer() {
        if (unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            if (parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow) > 0) {
                unsafeWindow.client.sendCommand("GatewayExchange_ClaimTC", unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                console.log("Attempting to withdraw exchange balancees... ClaimTC: " + unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                // clear the ad counter zax log
                zaxdiamonds = 0;
            }
            if (parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc) > 0) {
                unsafeWindow.client.sendCommand("GatewayExchange_ClaimMTC", unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc);
                console.log("Attempting to withdraw exchange balancees... ClaimMT: " + unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc);
            }
        } else {
            window.setTimeout(claimZaxOffer, delay.SHORT);
        }
    }

    // MAC-NW

    function vendorItemsLimited(_items) {
        var _pbags = client.dataModel.model.ent.main.inventory.playerbags;
        var _delay = 400;
        var _sellCount = 0;
        var _classType = unsafeWindow.client.dataModel.model.ent.main.classtype;
        var _bagCount = unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags.length;
        var _bagUsed = 0;
        var _bagUnused = 0;
        var _tmpBag = [];
        var _profitems = [];
        // Pattern for items to leave out of auto vendoring (safeguard)
        var _excludeItems = /(Gemfood|Gem_Upgrade_Resource|Artifact|Hoard|Coffer|Fuse|Ward|Preservation|Armor_Enhancement|Weapon_Enhancement|T[5-9]_Enchantment|T[5-9]_Runestones|T10_Enchantment|T10_Runestones|4c_Personal|Item_Potion_Companion_Xp|Gateway_Rewardpack|Consumable_Id_Scroll|Dungeon_Delve_Key)/; // edited by RottenMind 17.01.2015

            /** Profession leveling result item cleanup logic for T1-4 crafted results
             * Created by RM on 14.1.2015.
             * List contains crafted_items, based "Mustex/Bunta NW robot 1.05.0.1L crafting list, can be used making list for items what are "Auto_Vendored".
             * Items on list must be checked and tested.
             */
            if (getSetting('vendorSettings', 'vendorProfResults')) {
            /*#2, Tier2 - tier3 mixed, upgrade, sell if inventory full, "TierX" is here "TX" */
            _profitems[_profitems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Neck_Misc_2|Jewelcrafting_Waist_Misc_2|Med_Armorsmithing_T3_Chain_Pants|Med_Armorsmithing_T3_Chain_Shirt|Hvy_Armorsmithing_T3_Plate_Pants|Hvy_Armorsmithing_T3_Plate_Shirt|Leatherworking_T3_Leather_Pants|Leatherworking_T3_Leather_Shirt|Tailoring_T3_Cloth_Shirt|Tailoring_T3_Cloth_Pants||Artificing_T3_Pactblade_Temptation_4|Artificing_T3_Icon_Virtuous_4|Weaponsmithing_T2_Dagger_3|Weaponsmithing_T2_Dagger_3)$/,
                limit: 0,
                count: 0
            };
            /*#3, Tier2, upgrade, sell if inventory full, "TierX" is here "TX" */
            _profitems[_profitems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Neck_Offense_2|Jewelcrafting_Waist_Offense_2|Med_Armorsmithing_T2_Chain_Armor_Set_1|Med_Armorsmithing_T2_Chain_Pants_2|Med_Armorsmithing_T2_Chain_Boots_Set_1|Med_Armorsmithing_T2_Chain_Shirt_2|Med_Armorsmithing_T2_Chain_Pants_1|Med_Armorsmithing_T2_Chain_Shirt|Hvy_Armorsmithing_T2_Plate_Armor_Set_1|Hvy_Armorsmithing_T2_Plate_Pants_2|Hvy_Armorsmithing_T2_Plate_Boots_Set_1|Hvy_Armorsmithing_T2_Plate_Shirt_2|Hvy_Armorsmithing_T2_Plate_Pants_1|Hvy_Armorsmithing_T2_Shield_Set_1|Hvy_Armorsmithing_T2_Plate_Shirt|Leatherworking_T2_Leather_Shirt|Leatherworking_T2_Leather_Boots_Set_1|Leatherworking_T2_Leather_Shirt_2|Leatherworking_T2_Leather_Pants_1|Leatherworking_T2_Leather_Armor_Set_1|Leatherworking_T2_Leather_Pants_2|Tailoring_T2_Cloth_Armor_Set_1|Tailoring_T2_Cloth_Pants_2|Tailoring_T2_Cloth_Boots_Set_1|Tailoring_T2_Cloth_Shirt_2|Tailoring_T2_Cloth_Pants_1|Artificing_T2_Pactblade_Temptation_3|Artificing_T1_Icon_Virtuous_2|Weaponsmithing_T2_Dagger_2)$/,
                limit: 0,
                count: 0
            };
            /*#4, Tier1, upgrade, sell if inventory full, "TierX" is here "TX" */
            _profitems[_profitems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Neck_Misc_1|Jewelcrafting_Waist_Misc_1|Med_Armorsmithing_T1_Chain_Armor_Set_1|Med_Armorsmithing_T1_Chain_Boots_Set_1|Hvy_Armorsmithing_Plate_Armor_1|Hvy_Armorsmithing_T1_Plate_Armor_Set_1|Hvy_Armorsmithing_T1_Plate_Boots_Set_1|Leatherworking_T1_Leather_Boots_Set_1|Leatherworking_T1_Leather_Boots_Set_1|Leatherworking_T1_Leather_Armor_Set_1|Tailoring_T1_Cloth_Armor_1|Tailoring_T1_Cloth_Pants_1|Tailoring_T1_Cloth_Boots_Set_1|Artificing_T1_Pactblade_Convergence_2|Artificing_T1_Icon_Virtuous_2|Weaponsmithing_T1_Dagger_1)$/,
                limit: 0,
                count: 0
            };
            /*#5, Tier0, upgrade, sell if inventory full, taskilist "Tier1" is here "empty" or "_" must replace (_T1_|_)*/
            _profitems[_profitems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Waist_Offense_1|Jewelcrafting_Neck_Offense_1|Med_Armorsmithing_Chain_Boots_1|Med_Armorsmithing_Chain_Shirt_1|Med_Armorsmithing_Chain_Armor_1|Med_Armorsmithing_Chain_Pants_1|Hvy_Armorsmithing_Plate_Boots_1|Hvy_Armorsmithing_Plate_Shirt_1|Hvy_Armorsmithing_Shield_1|Leatherworking_Tier0_Intro_1|Leatherworking_Leather_Boots_1|Leatherworking_Leather_Shirt_1|Leatherworking_Leather_Armor_1|Leatherworking_Leather_Pants_1|Tailoring_Cloth_Boots_1|Tailoring_Cloth_Shirt_1|Artificing_T1_Pactblade_Convergence_1|Artificing_Icon_Virtuous_1|Artificing_Symbol_Virtuous_1|Weaponsmithing_Dagger_1)$/,
                limit: 0,
                count: 0
            };
        }

        $.each(_pbags, function(bi, bag) {
            bag.slots.forEach(function(slot) {
                // Match unused slots
                if (slot === null || !slot || slot === undefined) {
                    _bagUnused++;
                }
                // Match items to exclude from auto vendoring, dont add to _tmpBag: Exclude pattern list - bound - Epic Quality - Blue Quality
                else if (_excludeItems.test(slot.name) || slot.bound || slot.rarity == "Special" || slot.rarity == "Gold") {
                    _bagUsed++;
                }
                // Match everything else
                else {
                    if (getSetting('vendorSettings', 'vendorProfResults')) {
                        for (i = 0; i < _profitems.length; i++) {
                            if (_profitems[i].pattern.test(slot.name))
                                _profitems[i].count++;
                        }
                    }
                    _tmpBag[_tmpBag.length] = slot;
                    _bagUsed++;
                }
            });
        });

        if (getSetting('vendorSettings', 'vendorProfResults')) {
            _tmpBag.forEach(function(slot) {
                for (i = 0; i < _profitems.length; i++) { // edited by RottenMind
                    if (slot && _profitems[i].pattern.test(slot.name) && Inventory_bagspace() <= 7) { // !slot.bound && _profitems[i].count > 3 &&, edited by RottenMind
                        var vendor = {
                            vendor: "Nw_Gateway_Professions_Merchant"
                        };
                        vendor.id = slot.uid;
                        vendor.count = 1;
                        console.log('Selling', vendor.count, slot.name, 'to vendor.');
                        window.setTimeout(function() {
                            client.sendCommand('GatewayVendor_SellItemToVendor', vendor);
                        }, _delay);
                        _profitems[i].count--;
                        break;
                    }
                }
            });
        }

        _tmpBag.forEach(function(slot) {
            for (i = 0; i < _items.length; i++) {
                var _Limit = (parseInt(_items[i].limit) > 99) ? 99 : _items[i].limit;
                if (slot && _items[i].pattern.test(slot.name) && !slot.bound) {
                    // Node Kits vendor logic for restricted bag space
                    if (getSetting('vendorSettings', 'vendorKitsLimit') && /^Item_Consumable_Skill/.test(slot.name)) {
                        if (_bagCount < 2 || _bagUnused < 6 ||
                            (slot.name == "Item_Consumable_Skill_Dungeoneering" && (_classType == "Player_Guardian" || _classType == "Player_Greatweapon")) ||
                            (slot.name == "Item_Consumable_Skill_Arcana" && (_classType == "Player_Controller" || _classType == "Player_Scourge")) ||
                            (slot.name == "Item_Consumable_Skill_Religion" && _classType == "Player_Devoted") ||
                            (slot.name == "Item_Consumable_Skill_Thievery" && _classType == "Player_Trickster") ||
                            (slot.name == "Item_Consumable_Skill_Nature" && _classType == "Player_Archer")) {
                            _Limit = 0;
                        }
                    }
                    // Sell Items
                    if (slot.count > _Limit) {
                        _sellCount++;
                        var vendor = {
                            vendor: "Nw_Gateway_Professions_Merchant"
                        };
                        vendor.id = slot.uid;
                        vendor.count = slot.count - _Limit;
                        console.log('Selling', vendor.count, slot.name, 'to vendor.');
                        window.setTimeout(function() {
                            client.sendCommand('GatewayVendor_SellItemToVendor', vendor);
                        }, _delay);
                        _delay = _delay + 400;
                        break;
                    }
                }
            }
        });

        return _sellCount;
    }

    function switchChar() {

        // detect if daily reset occurs (no more frequently than every 16 hours)
        var oldRefineToday = charStatisticsList[curCharName].general.refined | 0;
        var newRefineToday = unsafeWindow.client.dataModel.model.ent.main.currencies.diamondsconverted | 0;
        if (newRefineToday < oldRefineToday) {
            if (accountSettings.generalSettings.SCADailyReset < Date.now() - 16*60*60*1000) {
                accountSettings.generalSettings.SCADailyReset = Date.now();
                GM_setValue("settings__account__" + loggedAccount, JSON.stringify(accountSettings));
            }
        }

        var refined_diamonds = 0;
        if (getSetting('generalSettings', 'refineAD')) {
            var _currencies = unsafeWindow.client.dataModel.model.ent.main.currencies;
            if (_currencies.diamondsconvertleft && _currencies.roughdiamonds) {
                if (_currencies.diamondsconvertleft < _currencies.roughdiamonds) {
                    refined_diamonds = _currencies.diamondsconvertleft
                } else {
                    refined_diamonds = _currencies.roughdiamonds
                }
                chardiamonds[curCharNum] += refined_diamonds
                console.log("Refining AD for", curCharName + ":", refined_diamonds);
                console.log(curCharName + "'s", "Astral Diamonds:", chardiamonds[curCharNum]);
                unsafeWindow.client.sendCommand('Gateway_ConvertNumeric', 'Astral_Diamonds');
                WaitForState("button.closeNotification").done(function() {
                    $("button.closeNotification").click();
                });
                charStatisticsList[curCharName].general.refineCounter += refined_diamonds;

            }
        }

        // MAC-NW -- AD Consolidation
        //if (accountSettings.consolidationSettings.consolidate) {
        if (getSetting('consolidationSettings','consolidate')) {
            // Check that we dont take money from the character assigned as the banker // Zen Transfer / Listing
            if ((accountSettings.consolidationSettings.bankCharName) && (accountSettings.consolidationSettings.bankCharName !== unsafeWindow.client.dataModel.model.ent.main.name)) {
                // Check the required min AD amount on character
                if (getSetting('consolidationSettings','minToTransfer') && 
                        parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds) >= (parseInt(getSetting('consolidationSettings','minToTransfer')) + parseInt(getSetting('consolidationSettings','minCharBalance')))) {
                    // Check that the rate is not less than the min & max
                    if (accountSettings.consolidationSettings.transferRate && parseInt(accountSettings.consolidationSettings.transferRate) >= 50 && parseInt(accountSettings.consolidationSettings.transferRate) <= 500) {
                        window.setTimeout(postZaxOffer, delay.SHORT);
                    } else {
                        console.log("Zen transfer rate does not meet the minimum (50) or maximum (500). Skipping ZAX Posting..");
                    }
                } else {
                    console.log("Character does not have minimum AD balance to do funds transfer. Skipping ZAX Posting..");
                }
            }
            else {
                console.log("Bank char not set or bank char, skipping posting.");
            }
        } else {
            console.log("Zen Exchange AD transfer not enabled. Skipping ZAX Posting..");
        }

        if (getSetting('generalSettings','openRewards')) {
            var _pbags = unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags;
            var _cRewardPat = /Reward_Item_Chest|Gateway_Rewardpack/;
            console.log("Opening Rewards");
            $.each(_pbags, function(bi, bag) {
                bag.slots.forEach(function(slot) {
                    if (slot && _cRewardPat.test(slot.name)) {
                        if (slot.count >= 99)
                            slot.count = 99;
                        
                        var reserve = getSetting('generalSettings', 'keepOneUnopened') ? 1 : 0;
                        for (i = 1; i <= (slot.count - reserve); i++) {
                            window.setTimeout(function() {
                                client.sendCommand('GatewayInventory_OpenRewardPack', slot.uid);
                            }, 500);
                        }
                    }
                });
            });
        }

        if (getSetting('generalSettings','openCelestialBox')) {
            var _pbags = unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags;
            var _cRewardPat = /Invocation_Reward_Celestial_Artifact_Equipment_Box|Invocation_Reward_Celestial_Artifacts_Box|Invocation_Reward_Celestial_Enchantments_Box/;
            console.log("Opening Celestial Boxes");
            $.each(_pbags, function(bi, bag) {
                bag.slots.forEach(function(slot) {
                    if (slot && _cRewardPat.test(slot.name)) {
                        if (slot.count >= 99)
                            slot.count = 99;

                        var reserve = getSetting('generalSettings', 'keepOneUnopened') ? 1 : 0;
                        for (i = 1; i <= (slot.count - reserve); i++) {
                            window.setTimeout(function() {
                                client.sendCommand('GatewayInventory_OpenRewardPack', slot.uid);
                            }, 500);
                        }
                    }
                });
            });
        }

        if (getSetting('generalSettings','openInvocation')) {
            var _pbags = unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags;
            var _cRewardPat = /Invocation_Rp_Bag/;
            console.log("Opening Invocation Rewards");
            $.each(_pbags, function(bi, bag) {
                bag.slots.forEach(function(slot) {
                    if (slot && _cRewardPat.test(slot.name)) {
                        window.setTimeout(function() {
                            client.sendCommand('GatewayInventory_OpenRewardPack', slot.uid);
                        }, 500);
                    }
                });
            });
        }
        // Check Vendor Options & Vendor matched items
        vendorJunk();

        // MAC-NW (endchanges)

        // Updating statistics
        console.log('Updating statistics');
        var _stat = charStatisticsList[curCharName].general;
        var _chardata = unsafeWindow.client.dataModel.model.ent.main.currencies;
        _stat.lastVisit = Date.now();
        _stat.gold = parseInt(_chardata.gold);
        _stat.rad = parseInt(_chardata.roughdiamonds - refined_diamonds);  // refined_diamonds: removing and adding manually to compensate for slow model update
        _stat.diamonds = parseInt(_chardata.diamonds + refined_diamonds);
        _stat.rBI = parseInt(_chardata.rawblackice);
        _stat.BI = parseInt(_chardata.blackice);
        _stat.refined = parseInt(_chardata.diamondsconverted + refined_diamonds);
        _stat.diamondsconvertleft = parseInt(_chardata.refineLimitLeft);
        _stat.activeSlots = unsafeWindow.client.dataModel.model.ent.main.itemassignments.active;

        //clearing
        charStatisticsList[curCharName].trackedResources = [];
        $.each(charStatisticsList[curCharName].tools, function(name, obj) {
            obj.used = [];
            obj.unused = [];
        });
        $.each(charStatisticsList[curCharName].professions, function(name, obj) {
            obj.workersUsed = [];
            obj.workersUnused = [];
            obj.level = 0;
        });

        trackResources.forEach(function(resource, ri) {
            charStatisticsList[curCharName].trackedResources[ri] = 0;
        });

        // Counting main inventory bags
        charStatisticsList[curCharName].general.emptyBagSlots = 0;
        unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags
        .forEach(function (bag) {
            bag.slots.forEach( function (slot, slotNum) {
                if (!slot) {
                    charStatisticsList[curCharName].general.emptyBagSlots += 1;
                    return;
                }
                trackResources.forEach(function(resource, ri) {
                    if (slot.name === resource.name) {
                        if ((resource.unbound && !slot.bound && !slot.boundtoaccount) ||
                            (resource.btc && slot.bound && !slot.boundtoaccount) ||
                            (resource.bta && slot.boundtoaccount)) {
                            charStatisticsList[curCharName].trackedResources[ri] += slot.count;
                        }
                    }
                });
            });
        });

        // Counting the rest of the bags
        trackResources.forEach(function(resource, ri) {
            unsafeWindow.client.dataModel.model.ent.main.inventory.bags
            .filter(function(bag) {
                    return ((["CraftingResources", "Overflow", "CraftingInventory"].indexOf(bag.bagid) > -1) || (resource.bank && bag.bagid == "Bank"));
                })
                .forEach(function(bag) {
                    bag.slots.forEach( function (slot, slotNum) {
                        if (slot && slot.name === resource.name) {
                            if ((resource.unbound && !slot.bound && !slot.boundtoaccount) ||
                                (resource.btc && slot.bound && !slot.boundtoaccount) ||
                                (resource.bta && slot.boundtoaccount)) {
                                charStatisticsList[curCharName].trackedResources[ri] += slot.count;
                            }
                        }
                    });                    
                });
        });
        
        // Slot assignment
        unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(slot, ix) {
            if (!slot.islockedslot && slot.category !== "None") {
                charStatisticsList[curCharName].slotUse[ix] = slot.category;
            } else if (slot.islockedslot) {
                charStatisticsList[curCharName].slotUse[ix] = "----"; // Locked Slot
            } else {
                charStatisticsList[curCharName].slotUse[ix] = "OPEN"; // Un-Assigned Slot!!!
            }
        });

        // Workers and tools assignment and qty
        unsafeWindow.client.dataModel.model.ent.main.inventory.assignedslots
            .forEach(function(item) {
                $.each(workerList, function(pName, pList) {
                    var index = pList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[curCharName].professions[pName].workersUsed[index] = item.count;
                    }
                });
                $.each(toolList, function(tName, tList) {
                    var index = tList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[curCharName].tools[tName].used[index] = item.count;
                    }
                });
            });

        unsafeWindow.client.dataModel.model.ent.main.inventory.notassignedslots
            .forEach(function(item) {
                $.each(workerList, function(pName, pList) {
                    var index = pList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[curCharName].professions[pName].workersUnused[index] = item.count;
                    }
                })
                $.each(toolList, function(tName, tList) {
                    var index = tList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[curCharName].tools[tName].unused[index] = item.count;
                    }
                })
            });

        // getting profession levels from currentrank, model has displayname, name, and category, using displayname (platesmithing)
        // Must match the names in charStatisticsList[curCharName].professions
        unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories
            .forEach(function(prof) {
                if (charStatisticsList[curCharName].professions[prof.displayname]) {
                    charStatisticsList[curCharName].professions[prof.displayname].level = prof.currentrank;
                }
            });

        charStatisticsList[curCharName].general.nextTask = chartimers[curCharNum];
        GM_setValue("statistics__char__" + curCharFullName , JSON.stringify(charStatisticsList[curCharName]));
        updateCounters();

        // TODO: refactor this block into function and merge with the similar in charSCA()
        console.log("Switching Characters");
        lastCharNum = curCharNum;

        var chardelay,
            chardate = null,
            nowdate = new Date();
        nowdate = nowdate.getTime();
        
        var not_active = 0;
        charNamesList.every( function (charName, idx) {
            if (!charSettingsList[charName].general.active) {
                not_active++;
                return true;
            }
            if (chartimers[idx] != null) {
                console.log("Date found for " + charName);
                if (!chardate || chartimers[idx] < chardate) {
                    chardate = chartimers[idx];
                    curCharNum = idx;
                    chardelay = chardate.getTime() - nowdate - unsafeWindow.client.getServerOffsetSeconds() * 1000;
                    if (chardelay < delay.SHORT) {
                        chardelay = delay.SHORT;
                    }
                }
                return true;
            } 
            
            curCharNum = idx;
            chardelay = delay.SHORT;
            chardate = null;
            console.log("No date found for " + charName + ", switching now.");
            return false; // = break; 
        });
        // Change to optional ?
        if (chardelay > delay.SHORT) chardelay = chardelay + (Math.random() + 0.3) * delay.DEFAULT;  

        curCharName = charNamesList[curCharNum];
        curCharFullName = curCharName + "@" + loggedAccount;
        failedTasksList = [];
        failedProfiles = {};
        var k = 9; while (k) {collectTaskAttempts[--k] = 0}; //collectTaskAttempts.fill(0);

        if (getSetting('consolidationSettings','consolidate')) {
            // Withdraw AD from the ZAX into the banker character
            if (accountSettings.consolidationSettings.bankCharName == curCharName) {
                window.setTimeout(cancelZaxOffer, delay.SHORT);
            }
        }

        // Count AD & Gold
        var curdiamonds = zaxdiamonds;
        var curgold = 0;
        charNamesList.forEach( function (charName, idx) {
            if (chardiamonds[idx] != null) {
                curdiamonds += Math.floor(chardiamonds[idx] / 50) * 50;
            }

            if (chargold[idx] != null) {
                curgold += chargold[idx];
            }
        });

        console.log("Next run for " + curCharName + " in " + parseInt(chardelay / 1000) + " seconds.");
        $("#prinfopane").empty();
        var ptext = $("<h3 class='promo-image copy-top prh3'>Professions Robot<br />Next task for " + curCharName + "<br /><span data-timer='" + chardate + "' data-timer-length='2'></span><br />Diamonds: " + curdiamonds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br />Gold: " + curgold + (pleaseBuy.length > 0 ? "<br />" : "") + pleaseBuy.join("<br />") + "</h3>")
            .appendTo("#prinfopane");
        
        if (not_active == charNamesList.length) {
            ptext.append("<div class='h_warning'>No Active chars found!</div>");
            console.warn("No Active chars found!");
        }
        
        GM_setValue("curCharNum_" + loggedAccount, curCharNum);


        var runSCAtime = !charStatisticsList[charNamesList[lastCharNum]].general.lastSCAVisit 
                      || ((charStatisticsList[charNamesList[lastCharNum]].general.lastSCAVisit + (1000*60*60*24)) < Date.now())
                      || (charStatisticsList[charNamesList[lastCharNum]].general.lastSCAVisit < accountSettings.generalSettings.SCADailyReset)
                      || (charStatisticsList[charNamesList[lastCharNum]].general.lastSCAVisit < lastDailyResetTime.getTime());
       
        var sca_setting = getSetting('generalSettings','runSCA'); 
        var runSCA = (runSCAtime && (sca_setting !== 'never'));
        runSCA = runSCA && (sca_setting === 'always' || (sca_setting === 'free' && chardelay > 7000)); // More than 7 seconds for the next char swap
        console.log("Check if need to run SCA for " + charNamesList[lastCharNum] + ":  " + sca_setting + " " + runSCAtime);                
        
        if (runSCA) {
            unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/, ')' + "/adventures");
            processCharSCA(lastCharNum);
            return;
        }
        dfdNextRun.resolve(chardelay);
    }
    /**
     * Waits for the loading symbol to be hidden.
     *
     * @return {Deferred} A jQuery defferred object that will be resolved when loading is complete
     */

    function WaitForLoad() {
        return WaitForState("");
    }
    /**
     * Creates a deferred object that will be resolved when the state is reached
     *
     * @param {string} query The query for the state to wait for
     * @return {Deferred} A jQuery defferred object that will be resolved when the state is reached
     */

    function WaitForState(query) {
        var dfd = $.Deferred();
        window.setTimeout(function() {
            AttemptResolve(query, dfd);
        }, delay.SHORT); // Doesn't work without a short delay
        return dfd;
    }

    function WaitForNotState(query) {
        var dfd = $.Deferred();
        window.setTimeout(function() {
            AttemptNotResolve(query, dfd);
        }, delay.SHORT); // Doesn't work without a short delay
        return dfd;
    }
    /**
     * Will continually test for the given query state and resolve the given deferred object when the state is reached
     * and the loading symbol is not visible
     *
     * @param {string} query The query for the state to wait for
     * @param {Deferred} dfd The jQuery defferred object that will be resolved when the state is reached
     */

    function AttemptResolve(query, dfd) {
        if ((query === "" || $(query).length) && $("div.loading-image:visible").length === 0) {
            dfd.resolve();
        } else {
            window.setTimeout(function() {
                AttemptResolve(query, dfd);
            }, delay.SHORT); // Try again in a little bit
        }
    }
    /* Opposite of AttemptResolve, will try to resolve query until it doesn't resolve. */

    function AttemptNotResolve(query, dfd) {
        if (!$(query).length && $("div.loading-image:visible").length === 0) {
            dfd.resolve();
        } else {
            window.setTimeout(function() {
                AttemptNotResolve(query, dfd);
            }, delay.SHORT); // Try again in a little bit
        }
    }
    /**
     * The main process loop:
     * - Determine which page we are on and call the page specific logic
     * - When processing is complete, process again later
     *  - Use a short timer when something changed last time through
     *  - Use a longer timer when waiting for tasks to complete
     */

    function process() {
        waitingNextChar = false;
    
        // Calculating last daily reset time
        var today = new Date();
        var todayRest = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate(), 10,0,0));
        if (today > todayRest) lastDailyResetTime = todayRest;
        else lastDailyResetTime = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()-1, 10,0,0));  
        
        // Make sure the settings button exists
        addSettings();

        // Enable/Disable the unconditional page reload depending on settings
        loading_reset = scriptSettings.general.scriptAutoReload;
        // Check if timer is paused
        s_paused =  scriptSettings.general.scriptPaused; // let the Page Reloading function know the pause state
        if (s_paused) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            timerHandle = window.setTimeout(function() {
                process();
            }, delay.DEFAULT);
            return;
        }

        // Check for Gateway down
        if (window.location.href.indexOf("gatewaysitedown") > -1) {
            // Do a long delay and then retry the site
            console.log("Gateway down detected - relogging in " + (delay.MINS / 1000) + " seconds");
            window.setTimeout(function() {
                unsafeWindow.location.href = current_Gateway;
            }, delay.MINS);
            return;
        }

        // Check for login or account guard and process accordingly
        var currentPage = GetCurrentPage();
        if (currentPage === "Login") {
            page_LOGIN();
            return;
        } else if (currentPage === "Guard") {
            page_GUARD();
            return;
        }

        if (pleaseBuy.length == 0) {
            pleaseBuy['ts'] = Date.now() + 15*60*1000;
        } else if ((pleaseBuy['ts']||0) < Date.now()) {
            pleaseBuy.shift();
            pleaseBuy['ts'] = Date.now() + 15*60*1000;
        }
        
        window.setTimeout(function() {
            loginProcess();
        }, delay.SHORT);

        // Continue again later
        dfdNextRun.done(function(delayTimer) {
            waitingNextChar = true;
            dfdNextRun = $.Deferred();
            timerHandle = window.setTimeout(function() {
                process();
            }, typeof delayTimer !== 'undefined' ? delayTimer : delay.DEFAULT);
        });
        //console.log("Process Timer Handle: " + timerHandle);
    }

    function loginProcess() {
        // Get logged on account details
        var accountName;
        try {
            accountName = unsafeWindow.client.dataModel.model.loginInfo.publicaccountname;
        } catch(e) {
            // TODO: Use callback function
            window.setTimeout(function() {
                loginProcess();
            }, delay.SHORT);
            return;
        }

        // Check if timer is paused again to avoid starting new task between timers
        s_paused =  scriptSettings.general.scriptPaused; // let the Page Reloading function know the pause state
        if (s_paused) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            timerHandle = window.setTimeout(function() {
                process();
            }, delay.DEFAULT);
            return;
        }

        if (accountName) {
            if (!loggedAccount || (loggedAccount != accountName)) {
                loggedAccount = accountName;
                console.log("Loading settings for " + accountName);

                var tempAccountSetting;
                try {
                    tempAccountSetting = JSON.parse(GM_getValue("settings__account__" + accountName, "{}"));
                } catch (e) {
                    tempAccountSetting = null;
                }
                if (!tempAccountSetting) {
                    console.log('Account settings couldn\'t be retrieved, loading defaults.');
                    tempAccountSetting = {};
                };
                accountSettings = $.extend(true, {}, defaultAccountSettings, tempAccountSetting);

                console.log("Loading character list");
                charNamesList = [];
                client.dataModel.model.loginInfo.choices.forEach(function(char) {
                    if (char.shardname == "Dungeon") return;
                    charNamesList.push(char.name);
                });                
                console.log("Found names: " + charNamesList);

                charNamesList.forEach(function(charName) {
                    console.log("Loading settings for " + charName);

                    var tempCharsSetting;
                    try {
                        tempCharsSetting = JSON.parse(GM_getValue("settings__char__" + charName + "@" + accountName, "{}"));
                    } catch (e) {
                        tempCharsSetting = null;
                    }
                    if (!tempCharsSetting) {
                        tempCharsSetting = {};
                        console.log('Character settings couldn\'t be retrieved, loading defaults.');
                    };
                    charSettingsList[charName] = $.extend(true, {}, defaultCharSettings, tempCharsSetting);
                    charSettingsList[charName].charName = charName; // for compatibility 

                    console.log("Loading saved statistics for " + charName);
                    var tempCharsStatistics;
                    try {
                        tempCharsStatistics = JSON.parse(GM_getValue("statistics__char__" + charName + "@" + accountName, "{}"));
                    } catch (e) {
                        tempCharsStatistics = null;
                    }
                    if (!tempCharsStatistics) {
                        console.log('Character statistics couldn\'t be retrieved, loading defaults.');
                        tempCharsStatistics = {};
                    };
                    charStatisticsList[charName] = $.extend(true, {}, defaultCharStatistics, tempCharsStatistics);
                })
                
                
                if (scriptSettings.general.saveCharNextTime)
                    charNamesList.forEach( function(name, idx) {
                        chartimers[idx] = (new Date(charStatisticsList[name].general.nextTask));
                        chargold[idx]   = charStatisticsList[name].general.gold;
                        chardiamonds[idx] = charStatisticsList[name].general.diamonds;
                    });
                
                
                
                
                // Adding the Account and character settings / info to the UI
                addSettings();
            }

            // load current character position and values
            curCharNum = GM_getValue("curCharNum_" + accountName, 0);
            curCharName = charNamesList[curCharNum];
            curCharFullName = curCharName + '@' + accountName;

            if (unsafeWindow.client.getCurrentCharAtName() != curCharFullName) {
                loadCharacter(curCharFullName);
                return;
            }

            // Try to start tasks
            if (processCharacter()) {
                return;
            }

            // Switch characters as necessary
            switchChar();
        }
    }

    function loadCharacter(charname) {
        // Load character and restart next load loop
        console.log("Loading gateway script for", charname);
        if (unsafeWindow.location.hash != "#char(" + encodeURI(charname) + ")/professions") {
            unsafeWindow.location.hash = "#char(" + encodeURI(charname) + ")/professions";
        }
        unsafeWindow.client.dataModel.loadEntityByName(charname);

        try {
            var testChar = unsafeWindow.client.dataModel.model.ent.main.name;
            unsafeWindow.client.dataModel.fetchVendor('Nw_Gateway_Professions_Merchant');
            console.log("Loaded datamodel for", charname);
        } catch (e) {
            // TODO: Use callback function
            window.setTimeout(function() {
                loadCharacter(charname);
            }, delay.SHORT);
            return;
        }

        // MAC-NW -- AD Consolidation -- Banker Withdraw Section
        if (getSetting('consolidationSettings','consolidate')) {

            unsafeWindow.client.dataModel.fetchExchangeAccountData();

            try {
                var testExData = unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders;
                console.log("Loaded zen exchange data for", charname);
            } catch (e) {
                // TODO: Use callback function
                window.setTimeout(function() {
                    loadCharacter(charname);
                }, delay.SHORT);
                return;
            }

            // First check if there's anything we have to withdraw and claim it
            // Sometimes the system will literally overwrite canceled and unclaimed orders and return AD to that character
            // Example: if you cancel 5 orders, don't claim them, then create another order and cancel it, that last order
            //          will overwrite one of your previous orders and return the AD to that other character
            var exchangeDiamonds = parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
            if (exchangeDiamonds > 0) {
                claimZaxOffer();
            }

            // Domino effect: first check if we're out of space for new offers
            if (unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length == 5) {
                // Domino effect: then withdraw as much offers as we can and claim the diamonds
                window.setTimeout(cancelZaxOffer, delay.SHORT);
            }

            WaitForState("button.closeNotification").done(function() {
                $("button.closeNotification").click();
            });

            unsafeWindow.client.dataModel.loadEntityByName(charname);

        } else {
            console.log("Zen Exchange AD transfer not enabled. Skipping ZAX Posting..");
        }
        // MAC-NW

        // MAC-NW -- Moved Professoin Merchant loading here with testing/waiting to make sure it loads
        try {
            var testProfMerchant = client.dataModel.model.vendor.items;
            console.log("Loaded profession merchant for", charname);
        } catch (e) {
            // TODO: Use callback function
            window.setTimeout(function() {
                loadCharacter(charname);
            }, delay.SHORT);
            return;
        }

        // Check Vendor Options & Vendor matched items
        vendorJunk();

        dfdNextRun.resolve();
    }

    function addSettings() {
        
        var setEventHandlers = false;
        
        if (!($("#settingsButton").length)) {
            // Add the required CSS
            AddCss("\
                #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
                #pauseButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 23px; top: 0px; padding: 3px; z-index: 1000;}\
                #settingsPanel{position: fixed; overflow: auto; right: 0px; top: 0px; width: 650px;max-height:100%;font: 12px sans-serif; text-align: left; display: block; z-index: 1001;}\
                #settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
                #settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
                #charPanel {width:98%;max-height:550px;overflow:auto;display:block;padding:3px;}\
                .inventory-container {float: left; clear: none; width: 270px; margin-right: 20px;}\
                #prinfopane {position: fixed; top: 5px; left: 200px; display: block; z-index: 1000;}\
                .prh3 {padding: 5px; height: auto!important; width: auto!important; background-color: rgba(0, 0, 0, 0.7);}\
                .custom-radio{width:16px;height:16px;display:inline-block;position:relative;z-index:1;top:3px;background-color:#fff;margin:0 4px 0 2px;}\
                .custom-radio:hover{background-color:black;} .custom-radio.selected{background-color:red;} .custom-radio-selected-text{color:darkred;font-weight:500;}\
                .custom-radio input[type='radio']{margin:1px;position:absolute;z-index:2;cursor:pointer;outline:none;opacity:0;_nofocusline:expression(this.hideFocus=true);-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);filter:alpha(opacity=0);-khtml-opacity:0;-moz-opacity:0}\
                .charSettingsTab { overflow: auto; }\
                .charSettingsTab div { overflow: auto; }\
                #rcounters ul li span { display: inline-block; min-width: 125px; }\
                #settingsPanel table { width: 100%; }\
                .ranked:nth-child(6n+2) { color: purple; } .ranked:nth-child(6n+3) { color: blue; } .ranked:nth-child(6n+4) { color: green } \
                .ranked2:nth-child(6n+1) { color: purple; } .ranked2:nth-child(6n+2) { color: blue; } .ranked2:nth-child(6n+3) { color: green } \
                .tranked:nth-child(4n+2) { color: purple; } .tranked:nth-child(4n+3) { color: blue; } .tranked:nth-child(4n) { color: green } \
                .tranked2:nth-child(4n+1) { color: purple; } .tranked2:nth-child(4n+2) { color: blue; } .tranked2:nth-child(4n+3) { color: green } \
                table.professionRanks { border-collapse: collapse; } \
                table.professionRanks td { height: 14px; } \
                td.ranked2, td.tranked2 { border-bottom: solid 1px #555; border-top: dashed 1px #888 }\
                #resource_tracker {overflow-x:auto;}\
                table.withRotation td.rotate, table.withRotation th.rotate { height: 125px; } \
                table.withRotation td.rotate, table.withRotation th.rotate > div { transform: translate(0, 30px) rotate(290deg); width: 30px; } \
                table.withRotation td.rotate, table.withRotation th.rotate > div > span { border-bottom: 1px solid #ccc; padding: 5px 10px; white-space: nowrap; } \
                table.withRotation td { border-right: 1px solid #ccc;} \
                input[type='checkbox'].settingsInput { margin: 5px 10px 5px 5px;  }\
                input.settingsInput { margin: 5px 5px; }\
                label.settingsLabel { margin: 5px 5px; min-width: 150px; display: inline-block; }\
                .inputSaved { color: #66FF66; }\
                .inputSaved:after { content: \"\"; width: 8px; height: 8px; display: inline-block; background-color: #66FF66; position:relative; right: 10px; }\
                .h_warning { color: red !important; }\
                label.customProfiles {min-width: 150px; }\
                select.customProfiles { margin: 10px }\
                textarea.customProfiles { width: 500px; height: 350px; margin: 10px 0; }\
                .custom_profiles_delete { height: 16px; } #custom__profiles__viewbase_btn { height: 16px; } .custom_profiles_view {height: 16px; margin: 0 4px; }\
                .custom_resources_delete { height: 16px; } .customResources input:not([type='checkbox']) { margin: 3px 10px } .customResources label { margin-right: 10px; }\
                .customResources input[type='checkbox'] { margin-right: 10px } .customResources button { margin: 0 10px } div.customResources { margin: 10px 0;} \
                #settingsPanel table {border-collapse: collapse; }\
                tr.totals > td { border-top: 1px solid grey; padding-top: 3px; } \
                .rarity_Gold {color: blue; } .rarity_Silver {color: green; } .rarity_Special {color: purple; }  \
                #dialog-inventory { overflow-y: scroll; font: 10px Arial; } #dialog-inventory table { width: 100% } #dialog-inventory table th { text-align: left; font-weight: bold; }\
                .slt_None {color: red;} .slt_Lead {color: blue;} .slt_Alch {color: green;} .slt_Jewe {color: gold;} .slt_Leat {color: brown;}\
                #copy_settings_to { width: 200px; height: 350px; margin: 5px 0;} #copy_settings_from { margin: 5px 0;}\
                ");
            

            // Add settings panel to page body
            $("body").append(
                '<div id="settingsPanel" class="ui-widget-content">\
                <div id="settings_title">\
                <span class="ui-icon ui-icon-wrench" style="float: left;"></span>\
                <span id="settings_close" class="ui-icon ui-icon-closethick" title="Click to hide preferences" style="float: right; cursor: pointer; display: block;"\></span>\
                <span style="margin:3px">Settings (script version ' + scriptVersion + ')</span>\
                </div>\
                <div id="script_settings"><ul></ul></div>\
                <div id="account_settings">\
                    <div id="main_tabs"><ul></ul></div></div>\
                <div id="account_info">\
                    <div id="info_tabs"><ul></ul></div></div>\
                <div id="char_settings"></div>\
                </div>');
        
                // Add open settings button to page
                $("body").append('<div id="settingsButton"><span class="ui-icon ui-icon-wrench" title="Click to show preferences" style="cursor: pointer; display: block;"></span></div>');
                $("#settingsPanel").hide();
                $("#settingsButton").click(function() {
                    $("#settingsButton").hide();
                    $("#pauseButton").hide();
                    $("#settingsPanel").show();
                });

            // Add pause button to page
            $("body").append('<div id="pauseButton"></div>');
            displayPause();
            $("#pauseButton").click( function () {
                PauseSettings();
            });
            
            // Add info pane
            $("body").append("<div id='prinfopane' class='header-newrelease'>");

            $('#update-content-inventory-bags-0 .bag-header').waitUntilExists(function() {
                if ($('#update-content-inventory-bags-0 .bag-header div').length && !$('#update-content-inventory-bags-0 .bag-header div.autovendor').length) {
                    $('#update-content-inventory-bags-0 .bag-header').append('<div class="input-field button light autovendor"><div class="input-bg-left"></div><div class="input-bg-mid"></div><div class="input-bg-right"></div><button id="nwprofs-autovendor">Auto Vendor</button></div>');
                    $("button#nwprofs-autovendor").on("click", vendorJunk);
                }
            });


            $("#settings_close,settings_cancel").click(function() {
                $("#settingsButton").show();
                $("#pauseButton").show();
                $("#settingsPanel").hide();
            });
                
            
            //$('#script_settings').html('');
            var tab = addTab("#script_settings", tr('tab.scriptSettings'));
            addInputsUL(tab, 'script', 'main');
            
            tab = addTab("#script_settings", tr('tab.advanced'));
            var thtml = "<button id='reset_settings_btn'>Reset ALL Settings</button><br /><br />";
            thtml += "Must be logged in and at the correct charactar to list it's items.<br />";
            thtml += "<button id='list_inventory_btn'>List Inventory</button><br /><br />";
            thtml += "List settings (display all the configuration and obscure char names to char 1,2... and banker)<br />";
            thtml += "<button id='list_settings_btn'>Dump settings </button><br /><br />";
            tab.html(thtml);

            $('#reset_settings_btn').button();
            $('#reset_settings_btn').click(function() {
                window.setTimeout(function() {
                    GM_setValue("settings__char__" + c_name + "@" + loggedAccount, JSON.stringify(charSettingsList[c_name]));
                    console.log("Saved char_task setting: " + scope + "." + group + "." + name + "." + sub_name + " For: " + c_name);
                    
                    
                    var keys = GM_listValues();
                    for (i = 0; i < keys.length; i++) {
                        var key = keys[i];
                        GM_deleteValue(key);
                    }
                    GM_setValue("script_version", scriptVersion);
                    window.setTimeout(function() {
                        unsafeWindow.location.href = current_Gateway;
                    }, 0);
                }, 0);
            });

            $('#list_inventory_btn').button();
            $('#list_inventory_btn').click(function() {
                var _inventory;
                try {
                    _inventory = client.dataModel.model.ent.main.inventory;
                }
                catch (e) {
                    var str = "Inventory could not be loaded, make sure you are logged in and at the correct character."
                    $('<div id="dialog-error-inventory" title="Error loading inventory">' + str + '</div>').dialog({
                          resizable: true,
                          width: 500,
                          modal: false,
                        });        
                    return;
                }
                var inv_tbl_head = "<table><tr><th>Slot #</th><th>Qty</th><th>Item Name</th><th>Rarity</th><th>Bound</th></tr>";
                var str = '';
                var slotCnt = 0;
                _inventory.playerbags.forEach(function (bag) {
                    str += '<div>' + bag.name + '</div>';
                    str += inv_tbl_head;
                    bag.slots.forEach( function (slot, slotNum) {
                        if (!slot) return;
                        slotCnt++;
                        str += '<tr><td>' + slotNum + 
                            '</td><td>' + slot.count + '</td><td class=" rarity_' + slot.rarity + '">' + slot.name +
                            '</td><td>' + slot.rarity + '</td><td>' + (slot.bound || slot.boundtoaccount) +  '</td></tr>';
                    });
                    str += '</table><br/>';
                });


                _inventory.bags.filter(function(bag) {
                    return (["CraftingResources", "Overflow", "CraftingInventory", "Bank"].indexOf(bag.bagid) != -1);
                })
                .forEach(function(bag) {
                    str += '<div>' + bag.bagid + '</div>';
                    str += inv_tbl_head;
                    bag.slots.forEach( function (slot, slotNum) {
                        if (!slot) return;
                        str += '<tr><td>' + slotNum + 
                            '</td><td>' + slot.count + '</td><td class=" rarity_' + slot.rarity + '">' + slot.name +
                            '</td><td>' + slot.rarity + '</td><td>' + (slot.bound || slot.boundtoaccount) +  '</td></tr>';
                    });
                    str += '</table><br />';
                });
        
                
                
                $('<div id="dialog-inventory" title="Inventory listing">' + str + '</div>').dialog({
                      resizable: true,
                      width: 550,
                      height: 550,
                      modal: false,
                    });        
            });

            $('#list_settings_btn').button();
            $('#list_settings_btn').click(function() {
                var str = 'Script Settings (script version ' + scriptVersion + ')\n';
                var tempObj;
                tempObj = $.extend(true, {}, scriptSettings);
                tempObj.autoLoginAccount = "";
                tempObj.autoLoginPassword = "";
                str += '' +  JSON.stringify(tempObj,null,4) + '\n';
                
                str += 'Account Settings\n';
                tempObj = $.extend(true, {}, accountSettings);
                if (accountSettings.consolidationSettings.bankCharName) {
                    var bankIndex = charNamesList.indexOf(accountSettings.consolidationSettings.bankCharName);
                    if (bankIndex == -1)  str += "Bank set but not found in charNamesList\n";
                    else  str += "Bank set and found at index:" + bankIndex + "\n";
                    tempObj.consolidationSettings.bankCharName = "Char " + bankIndex;
                }
                str += '' +  JSON.stringify(tempObj,null,4) + '\n';
                //str += '<pre>' +  JSON.stringify(tempObj,null,4) + '</pre>';

                str += 'Char Settings\n';
                charNamesList.forEach(function (charName, idx){
                    tempObj = $.extend(true, {}, charSettingsList[charName]);
                    str += 'Char ' + idx  + '\n';
                    tempObj.charName = "Char " + idx;
                    str += '' +  JSON.stringify(tempObj,null,4) + '\n';
                })

                $('<div id="dialog-settings" title="Settings listing"><textarea style=" width: 98%; height: 98%;">' + str + '</textarea></div>').dialog({
                      resizable: true,
                      width: 550,
                      height: 750,
                      modal: false,
                    });        
            });

            // Custom profiles
            tab = addTab("#script_settings", tr('tab.customProfiles'));
            var temp_html = '';
            temp_html += '<div><label class="customProfiles">Task name: </label><select class=" custom_input customProfiles " id="custom_profiles_taskname">';
            tasklist.forEach(function(task) {
                if (!task.taskActive) return;
                temp_html += '<option value="' + task.taskListName + '">' + task.taskListName + '</option>';
            })
            temp_html += '</select>';
            temp_html += '<label class="customProfiles">Base Profile: </label><select class=" custom_input customProfiles " id="custom__profiles__baseprofile"></select>';
            temp_html += '<button id="custom__profiles__viewbase_btn"></button>';
            temp_html += '</div>';
            temp_html += 'Input must be valid JSON: double quotes on property names & no trailing commas. <br /> Use any online validator to easily find errors. <br /> like: http://jsonformatter.curiousconcept.com/ <br /> http://json.parser.online.fr/';
            temp_html += '<div><textarea id="custom_profile_textarea" class=" custom_input customProfiles ">';
            temp_html += '{\n    "profileName": "Example",\n    "isProfileActive": true,\n    "level": {\n        "0": ["Alchemy_Tier0_Intro_1"],\n        "1": ["Alchemy_Tier1_Refine_Basic", "Alchemy_Tier1_Gather_Components"]\n    }\n}';
            temp_html += '</textarea></div>';
            temp_html += '<div><button id="custom__profiles__import_btn">Import</button></div>';
            temp_html += '<table><tr><th>#</th><th>Task Name</th><th>Base Profile</th><th>Profile Name</th><th><th></tr>';
            
            customProfiles.forEach(function (cProfile, idx) {
                temp_html += '<tr><td>' + (idx+1) + '</td>';
                temp_html += '<td>' + cProfile.taskName + '</td>';
                temp_html += '<td>' + cProfile.baseProfile + '</td>';
                if (typeof cProfile.profile === 'object')
                    temp_html += '<td>' + cProfile.profile.profileName + '</td>';
                temp_html += '<td><button class="custom_profiles_view" value=' + idx + '></button><button class="custom_profiles_delete" value=' + idx + '></button></td></tr>';
            });
            temp_html += '</table>';
            tab.html(temp_html);
            
            $( ".custom_profiles_view" ).button({
                icons: {
                    primary: "ui-icon-zoomin"
                },
                text: false
            });
            $( ".custom_profiles_view" ).click( function(e) {
                var pidx = $(this).val();                    
                var str = "Task name : " + customProfiles[pidx].taskName + "\n";
                    str += "Base Profile : " + customProfiles[pidx].baseProfile + "\n"
                    str += "Profile : \n\n";
                    str += JSON.stringify(customProfiles[pidx].profile,null,4);

                $('<div id="dialog-display-custom-profile" title="Custom profile"><textarea style=" width: 98%; height: 98%;">' + str + '</textarea></div>').dialog({
                      resizable: true,
                      width: 550,
                      height: 750,
                      modal: false,
                    });        
            });

            $( ".custom_profiles_delete" ).button({
                icons: {
                    primary: "ui-icon-trash"
                },
                text: false
            });
            $( ".custom_profiles_delete" ).click( function(e) {
                var pidx = $(this).val();                    
                customProfiles.splice(pidx,1);
                GM_setValue("custom_profiles", JSON.stringify(customProfiles));
                console.log('Deleted custom profile ' + pidx);
                window.setTimeout(function() {
                    unsafeWindow.location.href = current_Gateway;
                }, 0);
            });
            
            // Set up the advanced slot selects 
            $("#custom_profiles_taskname").change(function(e) {
                var _taskname = $(this).val();
                var _profiles = tasklist.filter(function(task) {
                    return task.taskListName == _taskname;
                })[0].profiles.filter(function(profile) {
                    return profile.isProfileActive
                });
                var profileSelect = $("#custom__profiles__baseprofile").html("");
                profileSelect.append($("<option />").val(null).text("new"));
                _profiles.forEach(function(profile) {
                    profileSelect.append($("<option />").val(profile.profileName).text(profile.profileName));
                });
            });
            $("#custom_profiles_taskname").change();

            $('#custom__profiles__viewbase_btn').button({
                icons: {
                    primary: "ui-icon-zoomin"
                },
                text: false
            });
            $('#custom__profiles__viewbase_btn').click(function() {
                var _taskName = $("#custom_profiles_taskname").val();
                var _baseProfile = $("#custom__profiles__baseprofile").val();
                
                var _profiles = tasklist.filter(function(task) {
                    return task.taskListName == _taskName;
                })[0].profiles.filter(function(profile) {
                    return profile.profileName === _baseProfile;
                });
                var str = JSON.stringify(_profiles,null,4);

                $('<div id="dialog-display-profile" title="Profile"><textarea style=" width: 98%; height: 98%;">' + str + '</textarea></div>').dialog({
                    resizable: true,
                    width: 550,
                    height: 750,
                    modal: false,
                });        
            });


            $('#custom__profiles__import_btn').button();
            $('#custom__profiles__import_btn').click(function() {
                window.setTimeout(function() {
                    var taskName = $("#custom_profiles_taskname").val();
                    var baseProfile = $("#custom__profiles__baseprofile").val();
                    var profile;
                    try {
                        profile = JSON.parse($('#custom_profile_textarea').val());
                    }
                    catch (e) {
                        alert("Failed to parse custom profile. JSON not valid.");
                        return;
                    }
                    customProfiles.push({ taskName: taskName, baseProfile: baseProfile, profile: profile });
                    GM_setValue("custom_profiles", JSON.stringify(customProfiles));
                    window.setTimeout(function() {
                        unsafeWindow.location.href = current_Gateway;
                    }, 0);
                }, 0);
            });
            
            //Tracked resources tab
            tab = addTab("#script_settings", tr('tab.trackedResources'));
            var temp_html = 'Insert human readable resource name and NeverWinter gateway internal resource name (from Inventory Listing)';
            temp_html += '<div class="customResources"><label>Resource name: </label>';
            temp_html += '<input type="text" name="" id="custom_resource_fname" \>';
            temp_html += '<label>Inventory name: </label>';
            temp_html += '<input type="text" name="" id="custom_resource_name" \>';
            temp_html += '<br />'
            temp_html += '<input type="checkbox" name="" id="custom_resource_countbank" \><label>Count in bank</label>';
            temp_html += '<input type="checkbox" name="" id="custom_resource_unbound" checked="checked" \><label>unbound </label>';
            temp_html += '<input type="checkbox" name="" id="custom_resource_btc" checked="checked" \><label>BtC </label>';
            temp_html += '<input type="checkbox" name="" id="custom_resource_bta" checked="checked" \><label>BtA </label>';
            temp_html += '<button id="custom_resources_add_btn">Add</button>';
            temp_html += '</div>';
            temp_html += '<table><tr><th>#</th><th>Resource Name</th><th>bank</th><th>unbound</th><th>BtC</th><th>BtA</th><th><th></tr>';

            trackResources.forEach(function (trRes, idx) {
                temp_html += '<tr><td>' + (idx+1) + '</td>';
                temp_html += '<td>' + trRes.fname + '</td>';
                temp_html += '<td><span class=" ui-icon ' + (trRes.bank ? 'ui-icon-check' : 'ui-icon-close') + '"></span></td>'; 
                temp_html += '<td><span class=" ui-icon ' + (trRes.unbound ? 'ui-icon-check' : 'ui-icon-close') + '"></span></td>'; 
                temp_html += '<td><span class=" ui-icon ' + (trRes.btc ? 'ui-icon-check' : 'ui-icon-close') + '"></span></td>'; 
                temp_html += '<td><span class=" ui-icon ' + (trRes.bta ? 'ui-icon-check' : 'ui-icon-close') + '"></span></td>'; 
                temp_html += '<td><button class="custom_resources_delete" value=' + idx + '></button></td></tr>';
            });
            temp_html += '</table><br /><button id="custom_resources_reset">Reset to default</button>';
            tab.html(temp_html);

            $( ".custom_resources_delete" ).button({
                icons: {
                    primary: "ui-icon-trash"
                },
                text: false
            });
            $( ".custom_resources_delete" ).click( function(e) {
                if ( !loggedAccount ) {
                    var str = "Tracked resource could not be removed, make sure you are logged in.";
                    $('<div id="dialog-error-inventory" title="Error deleting tracked resource">' + str + '</div>').dialog({
                          resizable: true,
                          width: 500,
                          modal: false,
                        });
                    return;
                }
                var pidx = $(this).val();
                trackResources.splice(pidx,1);
                GM_setValue("tracked_resources", JSON.stringify(trackResources));
                charNamesList.forEach( function (charName) {
                    charStatisticsList[charName].trackedResources.splice(pidx, 1);
                    GM_setValue("statistics__char__" + charName + "@" + loggedAccount , JSON.stringify(charStatisticsList[charName]));
                });
                window.setTimeout(function() {
                    unsafeWindow.location.href = current_Gateway;
                }, 0);
            });
            
            $( "#custom_resources_reset" ).button();
            $( "#custom_resources_reset" ).click( function(e) {
                if ( !loggedAccount ) {
                    var str = "Tracked resource could not be removed, make sure you are logged in.";
                    $('<div id="dialog-error-inventory" title="Error deleting tracked resource">' + str + '</div>').dialog({
                          resizable: true,
                          width: 500,
                          modal: false,
                        });
                    return;
                }
                GM_deleteValue("tracked_resources");
                charNamesList.forEach( function (charName) {
                    charStatisticsList[charName].trackedResources = [];
                    GM_setValue("statistics__char__" + charName + "@" + loggedAccount , JSON.stringify(charStatisticsList[charName]));
                });
                window.setTimeout(function() {
                    unsafeWindow.location.href = current_Gateway;
                }, 0);
            });

            $('#custom_resources_add_btn').button();
            $('#custom_resources_add_btn').click( function (e) {
                var _fname = $("#custom_resource_fname").val();
                var _name = $("#custom_resource_name").val();
                var _bank = $("#custom_resource_countbank").prop('checked');
                var _unbound = $("#custom_resource_unbound").prop('checked');
                var _btc = $("#custom_resource_btc").prop('checked');
                var _bta = $("#custom_resource_bta").prop('checked');
                if ( _fname.length == 0 || _name.length == 0) {
					var str = "Tracked resource could not be added. You have to enter both values!";
                    $('<div id="dialog-error-inventory" title="Error adding tracked resource">' + str + '</div>').dialog({
                          resizable: true,
                          width: 500,
                          modal: false,
                        });
                    return;
                }
                trackResources.push({ fname: _fname, name: _name, bank: _bank, unbound: _unbound, btc: _btc, bta: _bta });
                GM_setValue("tracked_resources", JSON.stringify(trackResources));
                window.setTimeout(function() {
                    unsafeWindow.location.href = current_Gateway;
                }, 0);
            });



            $("#script_settings").tabs({ active: false, collapsible: true });
            setEventHandlers = true;
        }

        // Refresh is needed / Loading all the info (account, statistics and chars)
        if (UIaccount != loggedAccount) {
            UIaccount = loggedAccount;

            var tabs = {
                main: tr('tab.general'),
                prof: tr('tab.professions'),
                vend: tr('tab.vendor'),
                bank: tr('tab.consolidation')
            };

            for (var key in tabs) {
                var temp_tab = addTab("#main_tabs", tabs[key]);
                addInputsUL(temp_tab, 'account', key);
            }
            var settings_copy_tab = addTab("#main_tabs", tr('tab.copySettings'));
            $("div#main_tabs").tabs({ active: false, collapsible: true });                            

            // Settings copy Tab
            var temp_html = '';
            temp_html += '<div><label class="">Copy settings from: </label><select class=" custom_input " id="copy_settings_from">';
            charNamesList.forEach( function (charName) {
                temp_html += '<option value="' + charName + '">' + charName + '</option>';
            })
            temp_html += '</select></div>';
            temp_html += '<div><label class="">Copy settings to: (multiple select by holding ctrl/shift)</label></div><div><select multiple="multiple" class=" custom_input " id="copy_settings_to">';
            charNamesList.forEach( function (charName) {
                temp_html += '<option value="' + charName + '">' + charName + '</option>';
            })
            temp_html += '</select></div><div><button id="copy_settings_button" class="" value="">copy</button></div>';
            settings_copy_tab.html(temp_html);            
            
            $( "#copy_settings_button" ).button();
            $( "#copy_settings_button" ).click( function(e) {
                var _from = $("#copy_settings_from").val();
                var _fromSettings = charSettingsList[_from];
                if (!_fromSettings) return;
                var _to = $("#copy_settings_to").val();
                _to.forEach(function (toName){
                    if (charNamesList.indexOf(toName) == -1) return;
                    var newSettings = $.extend(true, {}, _fromSettings);
                    newSettings.charName = toName;
                    charSettingsList[toName] = newSettings;
                    GM_setValue("settings__char__" + toName + "@" + loggedAccount, JSON.stringify(newSettings));
                    console.log("Copied settings from: ", _from, " to: ", toName);
                })
                window.setTimeout(function() {
                    unsafeWindow.location.href = current_Gateway;
                }, 0);
            });

            //Statisitcs Tabs
            var temp_tab = addTab("#info_tabs", tr('tab.counters'));
            temp_tab.append("<div id='rcounters'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.visits'));
            temp_tab.append("<div id='sca_v'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.workers'));
            temp_tab.append("<div id='worker_overview'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.tools'));
            temp_tab.append("<div id='tools_overview'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.resources'));
            temp_tab.append("<div id='resource_tracker'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.levels'));
            temp_tab.append("<div id='profession_levels'></div>");
            
            temp_tab = addTab("#info_tabs", tr('tab.slots'));
            temp_tab.append("<div id='slot_tracker'></div>");
            $("#info_tabs").tabs({ active: false, collapsible: true });                

            
            // Adding per char settings UI
            var wrp = $('<div id="charSettingsAccordion">');
            $("#char_settings").append(wrp);
            charNamesList.forEach( function(charName, idx) {
                wrp.append('<h3>' + charName + '</h3>');
                var wrp2 = $('<div id="charContainer' + idx + '">');
                wrp.append(wrp2);
                addInputsUL(wrp2[0], 'char', 'main_not_tab', charName);
                
                var char_tabs = $('<div class="charSettingsTabs" id="char_tabs_' + idx + '"><ul></ul></div>');
                wrp2.append(char_tabs);
                
                var task_tab = addTab(char_tabs[0], "Tasks");

                // Creating the Tasks custom tab
                var tableHTML = $('<table><thead><tr><th>Task name</th><th># of slots</th><th>profile</th><th>priority</th><th>stop at lvl</th></tr></thead><tbody>');
                
                var _slotOptions = [];
                for (var i = 0; i < 10; i++) 
                    _slotOptions.push({
                        name: i,
                        value: i
                    });
                var _priorityOptions = [{name:'high',value:0},{name:'medium',value:1},{name:'low',value:2}];
                var _stopTaskAtLevelOptions = []; 
                    _stopTaskAtLevelOptions.push({name: 'none', value: 0}); 
                    for (var i = 1; i < 26; i++) _stopTaskAtLevelOptions.push({name: i, value: i});

                tasklist.forEach(function(task) {
                    if (!task.taskActive) return;
                    var _profileNames = [];
                    task.profiles.forEach(function(profile) {
                        if (profile.isProfileActive) _profileNames.push({
                            name: profile.profileName,
                            value: profile.profileName
                        });
                    });
                    var _slots = {scope: 'char_task', group: 'taskListSettings', name: task.taskListName, sub_name: 'taskSlots', opts: _slotOptions ,title: task.taskListName, type: 'select', pane: 'tasks1', tooltip: 'Number of slots to assign to ' + task.taskListName};
                    var _profile = {scope: 'char_task', group: 'taskListSettings', name: task.taskListName, sub_name: 'taskProfile', opts: _profileNames ,title: task.taskListName, type: 'select', pane: 'tasks1', tooltip: ''};
                    var _priority = {scope: 'char_task', group: 'taskListSettings', name: task.taskListName, sub_name: 'taskPriority', opts: _priorityOptions ,title: task.taskListName, type: 'select', pane: 'tasks1', tooltip: ''};
                    var _stop = {scope: 'char_task', group: 'taskListSettings', name: task.taskListName, sub_name: 'stopTaskAtLevel', opts: _stopTaskAtLevelOptions ,title: task.taskListName, type: 'select', pane: 'tasks1', tooltip: ''};                    

                    var _slt = createInput(_slots, charName, 'settingsInput', 'settingsLabel');
                    var _prf = createInput(_profile, charName, 'settingsInput', 'settingsLabel');
                    var _pr = createInput(_priority, charName, 'settingsInput', 'settingsLabel');
                    var _stp = createInput(_stop, charName, 'settingsInput', 'settingsLabel');
                    
                    var tr = $("<tr>");
                    $("<td>").append(_slt.label).appendTo(tr);
                    $("<td>").append(_slt.input).appendTo(tr);
                    $("<td>").append(_prf.input).appendTo(tr);
                    $("<td>").append(_pr.input).appendTo(tr);
                    $("<td>").append(_stp.input).appendTo(tr);
                    tr.appendTo(tableHTML);
                });
                task_tab.append(tableHTML);

                
                // Manual Slots allocation tab
                var task2_tab = addTab(char_tabs[0], "Manual Tasks");
                
                var tableHTML2 = $('<table><thead><tr><th>Slot #</th><th>Profession</th><th>Profile</th></tr></thead><tbody>');

                var taskOpts = [];
                tasklist.forEach(function(task) {
                    if (!task.taskActive) return;
                    taskOpts.push({ name: task.taskListName, value: task.taskListName  });
                    
                })
                
                function fillProfile(taskName) {
                    var _profiles = tasklist.filter(function(task) {
                        return task.taskListName == taskName;
                    })[0].profiles.filter(function(profile) {
                        return profile.isProfileActive
                    });
                    var options = [];
                    _profiles.forEach(function(profile) {
                        options.push({ name: profile.profileName, value: profile.profileName });
                    });
                    return options;
                }
                
                // 9 slots
                for (var j = 0; j < 9; j++) {
                    var _tasks = {scope: 'char_task', group: 'taskListSettingsManual', name: j, sub_name: 'Profession', opts: taskOpts ,title: 'Assign to slot #' +(j+1), type: 'select', pane: 'tasks2', tooltip: '',
                            onchange: function (newValue, elm) {
                                var profileId = $(elm).attr('id').split('__');
                                profileId[profileId.length-1] = 'Profile';
                                profileId = profileId.join('__');
                                var profileSelect = $("[id='" + profileId + "']").empty();
                                fillProfile(newValue).forEach(function(option) {
                                    profileSelect.append($("<option />").val(option.value).text(option.name));
                                });
                                profileSelect.change();
                            }
                        };
                    var _tsk = createInput(_tasks, charName, 'settingsInput taskListSettingsManual taskListSettingsManualTask', 'settingsLabel');
                    
                    var _profile = {scope: 'char_task', group: 'taskListSettingsManual', name: j, sub_name: 'Profile', opts: fillProfile($(_tsk.input).val()) ,title: '', type: 'select', pane: 'tasks2', tooltip: ''};
                    var _prf = createInput(_profile, charName, 'settingsInput taskListSettingsManual taskListSettingsManualProfile', 'settingsLabel');
                    
                    var tr = $("<tr>");
                    //$("<td>").append(_slt.label).appendTo(tr);
                    $("<td>").append(_tsk.label).appendTo(tr);
                    $("<td>").append(_tsk.input).appendTo(tr);
                    $("<td>").append(_prf.input).appendTo(tr);
                    tr.appendTo(tableHTML2);
                }
                task2_tab.append(tableHTML2);

                // Char settings tabs
                var tabs_c = {
                    main: 'General settings',
                    prof: 'Professions',
                    vend: 'Vendor options',
                    bank: 'AD Consolidation'
                };

                for (var key in tabs_c) {
                    var temp_tab = addTab(char_tabs[0], tabs_c[key]);
                    addInputsUL(temp_tab, 'char', key, charName);
                }
            }); 
            
            $("#charSettingsAccordion").accordion({
                heightStyle: "content",
                autoHeight: false,
                clearStyle: true,
                active: false,
                collapsible: true,
            });
            $(".charSettingsTabs").tabs();
  
            setEventHandlers = true;
            updateCounters();
        }

        // Adding the save events
        if (setEventHandlers) {
            $("#settingsPanel input[type='checkbox'], #settingsPanel select").not(".custom_input").unbind("change");
            $("#settingsPanel input[type='checkbox'], #settingsPanel select").change(function (evt) {
                saveSetting(evt.target);
            });
            $("#settingsPanel input[type='text'], #settingsPanel input[type='password']").not(".custom_input").unbind("input");
            $("#settingsPanel input[type='text'], #settingsPanel input[type='password']").on('input', function (evt) {
                var value = $(evt.target).val();
                setTimeout(function(value) {
                    if ($(evt.target).val() !== value) return;
                    saveSetting(evt.target);
                }, 1000, value);
            });
        }
        
        function saveSetting(elm) {
            var scope = $(elm).data('scope');
            var group = $(elm).data('group');
            var name =  $(elm).data('name');

            var value;
            if ($(elm).prop('type') === 'checkbox') value = $(elm).prop('checked');
            else value = $(elm).val();

            var fun = $(elm).data('onchange');
            if (typeof fun === 'function') {
                var retval = fun(value, elm);
                if (retval === false ) return;  // Allowing the onchange function to stop the save
            }
            
            switch (scope) {
                case 'script':
                    scriptSettings[group][name] = value;
                    setTimeout(function() {
                        GM_setValue("settings__script", JSON.stringify(scriptSettings));
                        console.log("Saved script setting: " + scope + "." + group + "." + name + " Value: " + value);
                        $(elm).addClass("inputSaved");
                        setTimeout(function() {
                            $(elm).removeClass("inputSaved");
                        },1500);
                    }, 0);
                    break;
                case 'account':
                    accountSettings[group][name] = value;
                    setTimeout(function() {
                        GM_setValue("settings__account__" + loggedAccount, JSON.stringify(accountSettings));
                        console.log("Saved account setting: " + scope + "." + group + "." + name + " Value: " + value + " For: " + loggedAccount);
                        $(elm).addClass("inputSaved");
                        setTimeout(function() {
                            $(elm).removeClass("inputSaved");
                        },1500);
                        
                    }, 0);
                    break;
                case 'char':
                    var c_name = $(elm).data('charName');
                    if (c_name && charSettingsList[c_name]) {
                        charSettingsList[c_name][group][name] = value;
                        setTimeout(function() {
                            GM_setValue("settings__char__" + c_name + "@" + loggedAccount, JSON.stringify(charSettingsList[c_name]));
                            console.log("Saved char setting: " + scope + "." + group + "." + name + " Value: " + value + " For: " + c_name);
                            $(elm).addClass("inputSaved");
                            setTimeout(function() {
                                $(elm).removeClass("inputSaved");
                            },1500);
                        }, 0);
                    }
                    break;
                case 'char_task':
                    var sub_name = $(elm).data('sub_name');
                    var c_name = $(elm).data('charName');
                    if (c_name && charSettingsList[c_name]) {
                        charSettingsList[c_name][group][name][sub_name] = value;
                        setTimeout(function() {
                            GM_setValue("settings__char__" + c_name + "@" + loggedAccount, JSON.stringify(charSettingsList[c_name]));
                            console.log("Saved char_task setting: " + scope + "." + group + "." + name + "." + sub_name + " Value: " + value + " For: " + c_name);
                            $(elm).addClass("inputSaved");
                            setTimeout(function() {
                                $(elm).removeClass("inputSaved");
                            },1500);
                        }, 0);
                    }
                    break;
           }
        }
        

        // Helper function to create input elements
        function createInput( settingsItem, charName , input_css_classes, label_css_classes) {
            var input;
            var label;

            var id_name; 
            var value;
            switch (settingsItem.scope) {
                case 'script':
                    value = scriptSettings[settingsItem.group][settingsItem.name];
                    id_name = "setting__script__" + settingsItem.group + "__" +  settingsItem.name;
                    break;
                case 'account':
                    id_name = "setting__account__" + settingsItem.group + "__" +  settingsItem.name;
                    value = accountSettings[settingsItem.group][settingsItem.name];
                    break;
                case 'char':
                    id_name = "setting__char__" + charName + "__" + settingsItem.group + "__" +  settingsItem.name;
                    value = charSettingsList[charName][settingsItem.group][settingsItem.name];
                    break;
                case 'char_task':
                    id_name = "setting__char__" + charName + "__" + settingsItem.group + "__" +  settingsItem.name+ "__" +  settingsItem.sub_name;
                    value = charSettingsList[charName][settingsItem.group][settingsItem.name][settingsItem.sub_name];
                    break;

            } 

            switch (settingsItem.type) {
                case 'checkbox':
                case 'text':
                case 'password':
                    input = $("<input type=\"" + settingsItem.type + "\" name=\"" + id_name + "\" id=\"" + id_name + "\" class=\"" + input_css_classes + "\" \>");
                    break;
                case 'select':
                    input = $("<select name=\"" + id_name + "\" id=\"" + id_name + "\" class=\"" + input_css_classes + "\" >");
                    settingsItem.opts.forEach( function (option) {
                       input.append($("<option value=\"" + option.value + "\">" + option.name + "</option>")); 
                    });
                    break;
                case 'void':
                    break;
                default:
                    break;

            } 
            if (settingsItem.type == 'checkbox') input.prop('checked', value);
            else input.val(value);
            input.data('scope', settingsItem.scope);
            input.data('group', settingsItem.group);
            input.data('name', settingsItem.name);
            if (settingsItem.sub_name) input.data('sub_name', settingsItem.sub_name);
            if (charName) input.data('charName', charName);
            if (settingsItem.onchange) input.data('onchange', settingsItem.onchange);
            label = $('<label title="' + settingsItem.tooltip + '" class="' + label_css_classes + '" for="' + id_name + '">' + settingsItem.title + '</label>');
            return { input: input, label: label };
        }


        function addInputsUL(parentSelector, scope, pane, charName) {

            var settingListToAdd = settingnames.filter(function(element) {
                return (element.scope == scope && element.pane == pane);
            });

            if (!charName) charName = '';
            var ul = $("<ul></ul>");
            settingListToAdd.forEach( function (setting) {
                var to_add = createInput(setting, charName, 'settingsInput', 'settingsLabel');
                var li = $("<li>");
                switch (setting.type) {
                    case 'checkbox':
                        li.append(to_add.input);
                        li.append(to_add.label);
                        break;
                    case 'text':
                    case 'password':
                    case 'select':
                    case 'void':
                        li.append(to_add.label);
                        li.append(to_add.input);
                        break;
                } 
                ul.append(li);
            })
            $(parentSelector).append(ul);
        }

        function addTab(parentSelector, tabTitle, tabId) {
            if (!tabId) {
                var tabs_num = $(" > ul > li", parentSelector).length + 1;
                tabId = $(parentSelector).attr('id') + "_tab_" + tabs_num;
            }
            $(" > ul", parentSelector).append("<li><a href='#" + tabId + "'>" + tabTitle + "</a></li>");
            var tab = $("<div id='" + tabId + "'></div>");
            $(parentSelector).append(tab);
            return tab;
        }
    
        // Close the panel
        /*
        $("#settingsButton").show();
        $("#pauseButton img").attr("src", (settings["paused"] ? image_play : image_pause));
        $("#pauseButton img").attr("title", "Click to " + (settings["paused"] ? "resume" : "pause") + " task script");
        $("#pauseButton").show();
        $("#settingsPanel").hide();
        */
    }

    
    function displayPause() {
       if (scriptSettings.general.scriptPaused) {
           $('#pauseButton').html('<span class="ui-icon ui-icon-play" title="Click to resume task script" style="cursor: pointer; display: block;"></span>');
       }
       else {
           $('#pauseButton').html('<span class="ui-icon ui-icon-pause" title="Click to pause task script" style="cursor: pointer; display: block;"></span>');
       }
    }
    
    
    function PauseSettings(_action) {
        switch (_action) {
            case true:
            case "pause":
                scriptSettings.general.scriptPaused = true;
                break;
            case false:
            case 'unpause':
                scriptSettings.general.scriptPaused = false;
                break;
            default:
                scriptSettings.general.scriptPaused = !scriptSettings.general.scriptPaused;
                break;
        }
        setTimeout(function() {
            //console.log("Pause set to", scriptSettings.general.scriptPaused);
            GM_setValue("settings__script", JSON.stringify(scriptSettings));
        }, 0);        
        displayPause();        
    }


    function updateCounters() {

        function formatNum(num) {
            if ((num / 1000000) > 1)
                return ((num / 1000000).toFixed(1) + 'm');
            if ((num / 1000) > 1)
                return ((num / 1000).toFixed(1) + 'k');
            return Math.floor(num);
        }

        var total = [0, 0, 0, 0];
        var html = '<table>';
        html += "<tr><th>Character Name</th><th>#slots</th><th>R.Counter</th><th>~ad/h</th>";
        html += "<th>RAD</th><th>AD</th><th>gold</th><th>rBI</th><th>BI</th><th>R.today<th></th></tr>";


        charNamesList.forEach(function(charName) {
            var counterTime = (Date.now() - charStatisticsList[charName].general.refineCounterReset) / 1000 / 60 / 60; // in hours.
            var radh = 0;
            if (counterTime > 0) radh = charStatisticsList[charName].general.refineCounter / counterTime;
            var outdated = (charStatisticsList[charName].general.lastVisit < lastDailyResetTime);

            total[0] += charStatisticsList[charName].general.refineCounter;
            total[1] += charStatisticsList[charName].general.diamonds;
            total[2] += charStatisticsList[charName].general.gold;
            total[3] += outdated ? 0 : charStatisticsList[charName].general.refined;

            html += "<tr>";
            html += "<td>" + charName + "</td>";
            html += "<td>" + charStatisticsList[charName].general.activeSlots + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.refineCounter) + "</td>";
            html += "<td>" + formatNum(radh) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.rad) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.diamonds) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.gold) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.rBI) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.BI) + "</td>";
            html += "<td>" + (outdated ? "0*" : formatNum(charStatisticsList[charName].general.refined)) + "</td>";
            //html += "<td>" + formatNum(charStatisticsList[charName].general.refineLimitLeft) + "</td>";
            html += "</tr>";
        });
        html += "<tr class='totals'><td>Totals (without AD in ZAX):</td><td></td><td>" +  formatNum(total[0]) +  "</td><td></td>";
        html += "<td></td><td>" + formatNum(total[1]) + "</td><td>" + formatNum(total[2]) + "</td>";
        html += "<td></td><td></td><td>" + formatNum(total[3]) + "<td></td></tr>";
        html += "</table>";
        html += "*No info for this reset yet. <br />";
        html += "<button>Reset Refined Counter</button>";
        $('#rcounters').html(html);

        $('#rcounters button').button();
        $('#rcounters button').click(function() {
            charNamesList.forEach(function(charName) {
                charStatisticsList[charName].general.refineCounter = 0;
                charStatisticsList[charName].general.refineCounterReset = Date.now();
                // !! This can couse a freeze on slow computers.                
                GM_setValue("statistics__char__" + charName + "@" + loggedAccount , JSON.stringify(charStatisticsList[charName]));
            });
            updateCounters();
        });

        // Worker tab update.
        html = '<table class="professionRanks">';
        var temp = "";
        html += "<tr><th>Char name</th>";
        var options = "";
        var workerTabSelects = ["Leadership", "Alchemy", "Leadership"];
        $.each(charStatisticsList[charNamesList[0]].professions, function(profession) {
            options += "<option value='" + profession + "'>" + profession + "</option>";
        })

        for (var i = 0; i < 3; i++) {
            //saving current select values
            if ($('#setting__worker__tab__p' + i).val()) workerTabSelects[i] = $('#setting__worker__tab__p' + i).val();
            html += "<th colspan=6>" + "<select name='setting__worker__tab__p" + i + "' id='setting__worker__tab__p" + i + "'>" + options + "</select></th>";
            temp += "<th>p</th><th>b</th><th>g</th><th>t3</th><th>t2</th><th>t1</th>";
        }
        html += "</tr><tr><th></th>" + temp + "</tr>";
        charNamesList.forEach(function(charName) {
            temp = "";
            html += "<tr><td rowspan=2>" + charName + "</td>";
            for (var i = 0; i < 3; i++) {
                var list = charStatisticsList[charName].professions[workerTabSelects[i]];
                for (var ix = 0; ix < 6; ix++) {
                    html += "<td class='ranked'>" + $.trim(list.workersUsed[ix]) + "</td>";
                    temp += "<td class='ranked2'>" + $.trim(list.workersUnused[ix]) + "</td>";
                };
            }
            /*
            $.each(charStatisticsList[charName].workers, function (pf, list) {
                for (var ix = 0; ix < 6; ix++)  {
                    html += "<td class='ranked'>" + $.trim(list.used[ix]) + "</td>";
                    temp += "<td class='ranked2'>" + $.trim(list.unused[ix]) + "</td>";
                };
            })
            */
            html += "</tr><tr>" + temp + "</tr>";
        })

        html += "</table>";
        $('#worker_overview').html(html);
        for (var i = 0; i < 3; i++) {
            $('#setting__worker__tab__p' + i).val(workerTabSelects[i]);
            $('#setting__worker__tab__p' + i).change(function() {
                updateCounters();
            });
        }

        // Tools tab update.
        html = '<table class="professionRanks">';
        var temp = "";
        html += "<tr><th>Char name</th>";
        var options = "";
        var toolsTabSelects = ["Crucible", "Mortar", "Philosophersstone", "Graver"];
        $.each(charStatisticsList[charNamesList[0]].tools, function(tool) {
            options += "<option value='" + tool + "'>" + tool + "</option>";
        });

        for (var i = 0; i < 4; i++) {
            //saving current select values
            if ($('#setting__tools__tab__p' + i).val()) toolsTabSelects[i] = $('#setting__tools__tab__p' + i).val();
            html += "<th colspan=4>" + "<select name='setting__tools__tab__p" + i + "' id='setting__tools__tab__p" + i + "'>" + options + "</select></th>";
            temp += "<th>p</th><th>b</th><th>g</th><th>w</th>";
        }
        html += "</tr><tr><th></th>" + temp + "</tr>";
        charNamesList.forEach(function(charName) {
            temp = "";
            html += "<tr><td rowspan=2>" + charName + "</td>";
            for (var i = 0; i < 4; i++) {
                var list = charStatisticsList[charName].tools[toolsTabSelects[i]];
                for (var ix = 0; ix < 4; ix++) {
                    html += "<td class='tranked'>" + $.trim(list.used[ix]) + "</td>";
                    temp += "<td class='tranked2'>" + $.trim(list.unused[ix]) + "</td>";
                };
            }
            html += "</tr><tr>" + temp + "</tr>";
        })

        html += "</table>";
        $('#tools_overview').html(html);
        for (var i = 0; i < 4; i++) {
            $('#setting__tools__tab__p' + i).val(toolsTabSelects[i]);
            $('#setting__tools__tab__p' + i).change(function() {
                updateCounters();
            });
        }


        // Resource tracker update.
        html = "<table class='withRotation'><tr><th class='rotate'><div><span>Character Name</div></span></th>";
        html += "<th class='rotate'><div><span>Main bags empty slots</div></span></th>";
        trackResources.forEach(function(item) {
            html += "<th class='rotate'><div><span>" + item.fname + "</div></span></th>";
        })
        html += '</tr>';
        charNamesList.forEach(function(charName) {
            html += '<tr><td>' + charName + '</td>';
            html += '<td>' + charStatisticsList[charName].general.emptyBagSlots + '</td>';
            charStatisticsList[charName].trackedResources.forEach(function(count) {
                html += '<td>' + count + '</td>';
            })
            html += '</tr>';
        })
        html += "</table>";
        $('#resource_tracker').html(html);


        // 'profession_levels' tab
        html = '<table class="withRotation">';
        html += "<tr><th class='rotate'><div><span>Character Name</div></span></th>";
        html += "<th class='rotate'><div><span>#slots</div></span></th>";
        $.each(charStatisticsList[charNamesList[0]].professions, function(profession) {
            html += "<th class='rotate'><div><span>" + profession + "</div></span></th>";
        });
        html += "</tr>";
        charNamesList.forEach(function(charName) {
            html += "<tr>";
            html += "<td>" + charName + "</td>";
            html += "<td>" + charStatisticsList[charName].general.activeSlots + "</td>";
            $.each(charStatisticsList[charName].professions, function(name, profData) {
                html += "<td>" + profData.level + "</td>";
            });
            html += "</tr>";
        });
        html += "</table>";
        $('#profession_levels').html(html);

        // 'slot_tracker' tab
        html = '<table>';
        html += "<tr><th>Character Name</th>";
        for (var i = 0; i < 9; i++) {
            html += "<th> #" + (i + 1) + " </th>";
        }
        html += "</tr>";

        charNamesList.forEach(function(charName) {
            html += "<tr>";
            html += "<td>" + charName + "</td>";
            for (var i = 0; i < 9; i++) {
                var _slot = charStatisticsList[charName].slotUse[i];
                html += "<td class=' slt_"+ $.trim(_slot).substring(0, 4) + "'>" + $.trim(_slot).substring(0, 4) + " </td>";
            }
            html += "</tr>";
        });
        html += "</table>";
        $('#slot_tracker').html(html);
        
        
        // Visit times and SCA tab
        html = '<table>';
        html += "<tr><th>Character Name</th><th>Next Profession</th><th>Last SCA</th><th>Override</th></tr>";
        charNamesList.forEach(function(charName, idx) {
            html += "<tr>";
            html += "<td>" + charName + "</td>";
            
            if (!chartimers[idx]) html += "<td>No data</td>";
            else    html += "<td><button class=' visitReset ' value=" + (idx + 1) + ">reset</button><span data-timer='" + chartimers[idx] + "' data-timer-length='2'></span></td>";
            
            if (!charStatisticsList[charName].general.lastSCAVisit) html += "<td>No data</td>";
            else html += "<td>" +  (new Date(charStatisticsList[charName].general.lastSCAVisit)).toLocaleString() + "</td>";
            
            if (charSettingsList[charName].general.overrideGlobalSettings) html += "<td><span class='ui-icon  ui-icon-check '></span></td>";
            else html += "<td></td>";
            html += "</tr>";
        });
        html += "</table>";
        html += "<div style='margin: 5px 0;'> Last SCA reset (test #1): " + (new Date(accountSettings.generalSettings.SCADailyReset)).toLocaleString() + "</div>";
        html += "<div style='margin: 5px 0;'> Last SCA reset (test #2): " + (new Date(lastDailyResetTime)).toLocaleString() + "</div>";
        $('#sca_v').html(html);
        $('#sca_v').append("<br /><br /><button id='settings_sca'>Cycle SCA</button>");
        
        $('#settings_sca').button();
        $("#settings_sca").click(function() {
            $("#settings_close").trigger("click");
            unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/, ')' + "/adventures");
            processSwordCoastDailies();
        });

        $('.visitReset').button();
        $(".visitReset").click(function() {
            var value = $(this).val();
            if (value) { 
                console.log("Reseting for " + charNamesList[value-1]);
                chartimers[parseInt(value)-1] = null;
                updateCounters();
                if (waitingNextChar) {
                    clearTimeout(timerHandle);
                    curCharNum = GM_setValue("curCharNum_" + loggedAccount, parseInt(value)-1);
                    timerHandle = window.setTimeout(function() {
                        process();
                    }, delay.SHORT);
                }
            } 
        });
    }

    function vendorJunk(evnt) {
        var _vendorItems = [];
        var _sellCount = 0;
        if (getSetting('vendorSettings', 'vendorKitsLimit')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Consumable_Skill/,
                limit: 50
            };
        }
        if (getSetting('vendorSettings', 'vendorAltarsLimit')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Portable_Altar$/,
                limit: 80
            };
        }
        if (getSetting('vendorSettings', 'vendorKitsAll')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Consumable_Skill/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorAltarsAll')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Portable_Altar$/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorEnchR1')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T1_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T1_Runestone/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorEnchR2')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T2_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T2_Runestone/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorEnchR3')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T3_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T3_Runestone/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorPots1')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)$/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorPots2')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_2$/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorPots3')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_3$/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorPots4')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_4$/,
                limit: 0
            };
        }
        if(getSetting('vendorSettings', 'vendorPots5')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_5$/,
                limit: 0
            };
        }
        if (getSetting('vendorSettings', 'vendorHealingPots')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_Healing(|_[1-5])$/,
                limit: 0
            };
        }        
        
        if (getSetting('vendorSettings', 'vendorJunk')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Snowworks_/,
                limit: 0
            }; // Winter Festival fireworks small & large
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Skylantern/,
                limit: 0
            }; // Winter Festival skylantern
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Partypopper/,
                limit: 0
            }; // Party Poppers
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Fireworks/,
                limit: 0
            }; // Fireworks
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Plate_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Decoration_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Gem_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Jewelry_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Mug_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Object_Trinket_/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /_Green_T[1-5]_Unid$/,
                limit: 0
            }; // Unidentified Green Gear
        }
        
        if (getSetting('vendorSettings', 'vendorProfResults')) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Waist_Offense_3|Jewelcrafting_Neck_Defense_3|Jewelcrafting_Waist_Defense_3|Med_Armorsmithing_T3_Chain_Armor_Set_1|Med_Armorsmithing_T3_Chain_Pants2|Med_Armorsmithing_T3_Chain_Shirt2|Med_Armorsmithing_T3_Chain_Helm_Set_1|Med_Armorsmithing_T3_Chain_Pants|Med_Armorsmithing_T3_Chain_Boots_Set_1|Hvy_Armorsmithing_T3_Plate_Armor_Set_1|Hvy_Armorsmithing_T3_Plate_Pants2|Hvy_Armorsmithing_T3_Plate_Shirt2|Hvy_Armorsmithing_T3_Plate_Helm_Set_1|Hvy_Armorsmithing_T3_Plate_Boots_Set_1|Leatherworking_T3_Leather_Armor_Set_1|Leatherworking_T3_Leather_Pants2|Leatherworking_T3_Leather_Shirt2|Leatherworking_T3_Leather_Helm_Set_1|Leatherworking_T3_Leather_Boots_Set_1|Tailoring_T3_Cloth_Armor_Set_3|Tailoring_T3_Cloth_Armor_Set_2|Tailoring_T3_Cloth_Armor_Set_1|Tailoring_T3_Cloth_Pants2_Set2|Tailoring_T3_Cloth_Shirt2|Tailoring_T3_Cloth_Helm_Set_1|Artificing_T3_Pactblade_Temptation_5|Artificing_T3_Icon_Virtuous_5|Weaponsmithing_T3_Dagger_4)$/,
                limit: 0
            };
        }
        
        if (_vendorItems.length > 0) {
            console.log("Attempting to vendor selected items...");
            _sellCount = vendorItemsLimited(_vendorItems);
            if (_sellCount > 0 && !evnt) {
                var _sellWait = _sellCount * 1000;
                PauseSettings("pause");
                window.setTimeout(function() {
                    PauseSettings("unpause");
                }, _sellWait);
            }
        }
    }

    function addTranslation() {
        var lang = GM_getValue('language', 'en');
        translation = {
            'currLang': lang,
            'en': {
                'translation.needed': 'translation needed',
                'tab.scriptSettings': 'Script settings',
                'tab.advanced': 'Advanced',
                'tab.customProfiles': 'Custom profiles',
                'tab.trackedResources': 'Tracked resources',
                'tab.general': 'General settings',
                'tab.professions': 'Professions',
                'tab.vendor': 'Vendor options',
                'tab.consolidation': 'AD Consolidation',
                'tab.copySettings': 'Settings Copy',
                'tab.other': 'Other',
                'tab.counters': 'Refine Counters',
                'tab.visits': 'SCA & Visits',
                'tab.workers': 'Workers',
                'tab.tools': 'Tools',
                'tab.resources': 'Resource Tracker',
                'tab.levels': 'Prof levels',
                'tab.slots': 'Slots',
                'static.settings': 'Settings',
                'button.save&apply': 'Save and Apply',
                'button.close': 'Close',
                'button.cycle': 'Cycle SCA',
                //'settings.main.paused': 'Pause Script',
                //'settings.main.paused.tooltip': 'Disable All Automation',
                'settings.main.debug': 'Enable Debug',
                'settings.main.debug.tooltip': 'Enable all debug output to console',
                'settings.main.autoreload': 'Auto Reload',
                'settings.main.autoreload.tooltip': 'Enabling this will reload the gateway periodically. (Ensure Auto Login is enabled)',
                'settings.main.incdelay': 'Increase script delays by',
                'settings.main.incdelay.tooltip': 'Increase the delays the script waits before attempting the actions.',
                'settings.main.language': 'Script language',
                'settings.main.language.tooltip': 'Set GUI language of this script (change requires reloading the page)',
                'settings.main.autologin': 'Attempt to login automatically',
                'settings.main.autologin.tooltip': 'Automatically attempt to login to the neverwinter gateway site',
                'settings.main.nw_username': 'Neverwinter Username',
                'settings.main.nw_username.tooltip': '',
                'settings.main.nw_password': 'Neverwinter Password',
                'settings.main.nw_password.tooltip': '',
                'settings.main.savenexttime': 'Save next process times',
                'settings.main.savenexttime.tooltip': 'Save the next proffesion times persistently',
                'settings.general.openrewards': 'Open Reward Chests',
                'settings.general.openrewards.tooltip': 'Enable opening of leadership chests on character switch',
                'settings.general.opencelestial': 'Open Celestial Chests',
                'settings.general.opencelestial.tooltip': 'Open Chests buyed for Celestial Coins',
                'settings.general.openInvocation': 'Open Invocation Rewards',
                'settings.general.openInvocation.tooltip': 'Enable opening rewards from invocation',
                'settings.general.keepOneUnopened': 'Keep one reward box unopened',
                'settings.general.keepOneUnopened.tooltip': 'Used to reserve the slots for the reward boxes',
                'settings.general.refinead': 'Refine AD',
                'settings.general.refinead.tooltip': 'Enable refining of AD on character switch',
                'settings.general.runSCA': 'Run SCA',
                'settings.general.runSCA.tooltip': 'Running SCA adventures reward after professions',
                'settings.profession.fillOptionals': 'Fill Optional Assets',
                'settings.profession.fillOptionals.tooltip': 'Enable to include selecting the optional assets of tasks',
                'settings.profession.autoPurchase': 'Auto Purchase Resources',
                'settings.profession.autoPurchase.tooltip': 'Automatically purchase required resources from gateway shop (100 at a time)',
                'settings.profession.trainAssets': 'Train Assets',
                'settings.profession.trainAssets.tooltip': 'Enable training/upgrading of asset worker resources',
                'settings.profession.smartLeadership': 'Smart Asset allocation for leadership',
                'settings.profession.smartLeadership.tooltip': 'Try to spread and fill non-common assets and supplement with common if needed',
                'settings.profession.skipPatrol': 'Skip Patrol task if > 10 claims',
                'settings.profession.skipPatrol.tooltip': 'Skip &quot;Patrol the Mines&quot; leadership task if there are more than 10 mining claims in the inventory (Never, Always, On AD profile, if Leadership level is &gt;= 20, or both of the above )',
                'settings.profession.stopNotLeadership': 'Stop NON-Leadership task at level: ',
                'settings.profession.stopNotLeadership.tooltip': 'Block All professions except Leadership at level 20 or 25 and above. Make sure you have Leadership set.',
                'settings.profession.stopAlchemyAt3': 'Stop Alchemy leveling at level 3',
                'settings.profession.stopAlchemyAt3.tooltip': 'Block Alchemy tasks at level 3 and above. Make sure you have other tasks set.',
                'settings.consolid.consolidate': 'Consolidate AD via ZAX',
                'settings.consolid.consolidate.tooltip': 'Automatically attempt to post, cancel and withdraw AD via ZAX and consolidate to designated character',
                'settings.consolid.bankerName': 'Character Name of Banker',
                'settings.consolid.bankerName.tooltip': 'Enter name of the character to hold account AD',
                'settings.consolid.minToTransfer': 'Min AD for Transfer',
                'settings.consolid.minToTransfer.tooltip': 'Enter minimum AD limit for it to be considered for transfer off a character',
                'settings.consolid.minCharBalance': 'Min Character balance',
                'settings.consolid.minCharBalance.tooltip': 'Enter the amount of AD to always keep available on characters',
                'settings.consolid.transferRate': 'AD per Zen Rate (in zen)',
                'settings.consolid.transferRate.tooltip': 'Enter default rate to use for transferring through ZAX',

            },
            'pl': {
                'translation.needed': 'wymagane tłumaczenie',
                'tab.scriptSettings': 'Ustawienia skryptu',
                'tab.advanced': 'Zaawansowane',
                'tab.customProfiles': 'Własne profile',
                'tab.trackedResources': 'Śledzone surowce',
                'tab.general': 'Ogólne',
                'tab.professions': 'Profesje',
                'tab.vendor': 'Kupiec',
                'tab.consolidation': 'Konsolidacja AD',
                'tab.copySettings': 'Kopiuj ustawienia',
                'tab.other': 'Pozostałe',
                'tab.counters': 'Liczniki szlifowania',
                'tab.visits': 'Nast.zadanie i SCA',
                'tab.workers': 'Pracownicy',
                'tab.tools': 'Narzędzia',
                'tab.resources': 'Surowce',
                'tab.levels': 'Poziomy prof.',
                'tab.slots': 'Sloty',
                'static.settings': 'Ustawienia',
                'button.save&apply': 'Zapisz i zastosuj',
                'button.close': 'Zamknij',
                'button.cycle': 'Runda SCA',
                //'settings.main.paused': 'Zatrzymaj skrypt',
                //'settings.main.paused.tooltip': 'Wyłącz wszelką automatyzację',
                'settings.main.debug': 'Włącz debugowanie',
                'settings.main.debug.tooltip': 'Wyświetl wszystkie komunikaty na konsoli (Ctrl+Shift+i w Chrome/Chromium)',
                'settings.main.autoreload': 'Automatyczne przeładowanie',
                'settings.main.autoreload.tooltip': 'Włączenie tej opcji powoduje okresowe przeładowanie strony (Upewnij się, że Automatyczne logowanie jest włączone)',
                'settings.main.incdelay': 'Zwiększ opóżnienia skryptu o...',
                'settings.main.incdelay.tooltip': 'Zwiększenie opóźnień, gdy skrypt czeka przed próbą działania (pomocne przy wolnych połączeniach).',
                'settings.main.language': 'Język skryptu',
                'settings.main.language.tooltip': 'Język interfejsu tego skryptu (zmiana wymaga przeładowania strony)',
                'settings.main.autologin': 'Próbuj logować automatycznie',
                'settings.main.autologin.tooltip': 'Próbuj logować automatycznie do strony gateway',
                'settings.main.nw_username': 'Nazwa użytkownika Neverwinter',
                'settings.main.nw_username.tooltip': '',
                'settings.main.nw_password': 'Hasło do Neverwinter',
                'settings.main.nw_password.tooltip': '',
                'settings.main.savenexttime': 'Zapisuj czas następnego zadania',
                'settings.main.savenexttime.tooltip': 'Zapisuj czas następnego zadania w danych międzysesyjnych',
                'settings.general.openrewards': 'Otwieraj skrzynki',
                'settings.general.openrewards.tooltip': 'Otwieraj skrzynki z zadań Przywództwa przy zmianie postaci',
                'settings.general.openInvocation': 'Otwieraj nagrody z inwokacji',
                'settings.general.openInvocation.tooltip': 'Otwieraj nagrody z inwokacji - zajmują masę miejsca, bo się nie łączą w stosy',
                'settings.general.opencelestial': 'Otwieraj skrzynki za monety',
                'settings.general.opencelestial.tooltip': 'Otwieraj skrzynki kupione za 13 monet z inwokacji',
                'settings.general.keepOneUnopened': 'Pozostaw jedną skrzynkę nieotwartą',
                'settings.general.keepOneUnopened.tooltip': 'Potrzebne do zarezerwowania miejsca na nagrody',
                'settings.general.refinead': 'Szlifuj diamenty',
                'settings.general.refinead.tooltip': 'Przy zmianie postaci szlifuj diamenty astralne jeśli to możliwe',
                'settings.general.runSCA': 'Uruchom Wybrzeże Mieczy',
                'settings.general.runSCA.tooltip': 'Uruchom Wybrzeże Mieczy po wybraniu zadań profesji',
                'settings.profession.fillOptionals': 'Wypełniaj opcjonalnych pracowników',
                'settings.profession.fillOptionals.tooltip': 'Pozwól na używanie większej ilości pracowników dla zadań, które na to pozwalają',
                'settings.profession.autoPurchase': 'Autozakup surowców',
                'settings.profession.autoPurchase.tooltip': 'Automatycznie kupuj wynagane surowce profesji ze sklepu (po 100 sztuk równocześnie)',
                'settings.profession.trainAssets': 'Trenuj pracowników',
                'settings.profession.trainAssets.tooltip': 'Pozwól na trenowanie/ulepszanie zwykłych pracowników',
                'settings.profession.smartLeadership': 'Inteligentny przydział pracowników do Przywództwa',
                'settings.profession.smartLeadership.tooltip': 'Próbuje przydzielić jak najmniej zwykłych pracowników do zadań przywództwa',
                'settings.profession.skipPatrol': 'Pomiń zadanie Patrol jeśli masz >10 zezwoleń',
                'settings.profession.skipPatrol.tooltip': 'Pomiń zadanie Przywództwa &quot;Patroluj kopalnie&quot; jeśli masz więcej niż 10 pozwoleń górniczych (Nigdy, Zawsze, Gdy wybrany profil to AD, jeśli poziom Przywództwa is &gt;= 20, lub jeśli obydwa poprzednie)',
                'settings.profession.stopNotLeadership': 'Wstrzymaj profesje inne od Przywództwa na poziomie',
                'settings.profession.stopNotLeadership.tooltip': 'Nie uruchamiaj zadań profesji innej od Przywództwa po osiągnięciu poziomu. Upewnij się, ze masz ustawione Przywództwo.',
                'settings.profession.stopAlchemyAt3': 'Wstrzymaj naukę Alchemii na poziomie 3',
                'settings.profession.stopAlchemyAt3.tooltip': 'Wstrzymaj naukę Alchemii na poziomie 3 lub wyższym. Upewnij się, że masz ustawione inne profesje.',
                'settings.consolid.consolidate': 'Konsoliduj AD przez ZAX',
                'settings.consolid.consolidate.tooltip': 'Automatycznie próbuj wysyłać Diamenty Astralne przez wymianę ZEN i wypłacać na jednej postaci',
                'settings.consolid.bankerName': 'Nazwa Bankiera',
                'settings.consolid.bankerName.tooltip': 'Wprowadź nazwę postaci, która ma zbierać wszystkie Diamenty Astralne konta',
                'settings.consolid.minToTransfer': 'Min AD do transferowania',
                'settings.consolid.minToTransfer.tooltip': 'Minimalna ilość Diamentów Astralnych, przy której nastąpi próba przeniesienia do bankiera',
                'settings.consolid.minCharBalance': 'Min AD do pozostawienia',
                'settings.consolid.minCharBalance.tooltip': 'Minimalna ilość Diamentów Astralnych, które powinny pozostać na koncie postaci',
                'settings.consolid.transferRate': 'Stawka AD za Zen',
                'settings.consolid.transferRate.tooltip': 'Domyślna stawka Diamentów Astralnych za ZEN użyta do transferowania',
            },
            'fr': {
                'translation.needed': 'traduction nécessaire',
           }
        };
    }

    function tr(key) {
        var lang = translation['currLang'];
        if (translation['en'][key] === undefined) {
            console.log("translation: unknown key " + key);
            return "unknown key: " + key;
        }
        if (translation[lang][key] === undefined) {
            console.log('translation needed: lang: ' + lang + ", key: " + key);
            return '/-/ ' + translation['en'][key] + ' /-/';
        }
        return translation[lang][key];
    }

    /** Start, Helpers added by users.
     * Adds fetures, options to base script and can be easily removed if needed
     * Add description so anyone can see if they can use Function somewhere
     * Use "brackets" around function start and end //yourname
     */
    //RottenMind, returns inventory space, use Inventory_bagspace(); gives current free bags slots, from MAC-NW function

    function Inventory_bagspace() {
        var _pbags = client.dataModel.model.ent.main.inventory.playerbags;
        var _bagUnused = 0;
        $.each(_pbags, function(bi, bag) {
            bag.slots.forEach(function(slot) {
                if (slot === null || !slot || slot === undefined) {
                    _bagUnused++;
                }
            });
        });
        return _bagUnused;
    }
    //RottenMind
    /** End, Helpers added by users.*/

    // Add the settings button and start a process timer
    addSettings();
    timerHandle = window.setTimeout(function() {
        process();
    }, delay.SHORT);
})();




function workerDefinition() {
    return {
        // purple, blue, green, t3, t2, t1
        "Leadership": ["Crafting_Asset_Craftsman_Leadership_T3_Epic", "Crafting_Asset_Craftsman_Leadership_T3_Rare", "Crafting_Asset_Craftsman_Leadership_T3_Uncommon",
            "Crafting_Asset_Craftsman_Leadership_T3_Common", "Crafting_Asset_Craftsman_Leadership_T2_Common", "Crafting_Asset_Craftsman_Leadership_T1_Common_1"
        ],
        "Alchemy": ["Asset_Craftsman_Alchemy_T3_Epic", "Asset_Craftsman_Alchemy_T3_Rare", "Asset_Craftsman_Alchemy_T3_Uncommon",
            "Asset_Craftsman_Alchemy_T3_Common", "Asset_Craftsman_Alchemy_T2_Common", "Asset_Craftsman_Alchemy_T1_Common"
        ],
        "Jewelcrafting": ["Crafting_Asset_Craftsman_Jewelcrafter_T3_Epic", "Crafting_Asset_Craftsman_Jewelcrafter_T3_Rare", "Crafting_Asset_Craftsman_Jewelcrafter_T3_Uncommon",
            "Crafting_Asset_Craftsman_Jewelcrafter_T3_Common", "Crafting_Asset_Craftsman_Jewelcrafter_T2_Common", "Crafting_Asset_Craftsman_Jewelcrafter_T1_Common"
        ],
        "Weaponsmithing": ["Crafting_Asset_Craftsman_Weaponsmith_T3_Epic", "Crafting_Asset_Craftsman_Weaponsmith_T3_Rare", "Crafting_Asset_Craftsman_Weaponsmith_T3_Uncommon",
            "Crafting_Asset_Craftsman_Weaponsmith_T3_Common", "Crafting_Asset_Craftsman_Weaponsmith_T2_Common", "Crafting_Asset_Craftsman_Weaponsmith_T1_Common"
        ],
        "Artificing": ["Crafting_Asset_Craftsman_Artificing_T3_Epic", "Crafting_Asset_Craftsman_Artificing_T3_Rare", "Crafting_Asset_Craftsman_Artificing_T3_Uncommon",
            "Crafting_Asset_Craftsman_Artificing_T3_Common", "Crafting_Asset_Craftsman_Artificing_T2_Common", "Crafting_Asset_Craftsman_Artificing_T1_Common"
        ],
        "Mailsmithing": ["Crafting_Asset_Craftsman_Armorsmithing_Med_T3_Epic", "Crafting_Asset_Craftsman_Armorsmithing_Med_T3_Rare", "Crafting_Asset_Craftsman_Armorsmithing_Med_T3_Uncommon",
            "Crafting_Asset_Craftsman_Armorsmithing_Med_T3_Common", "Crafting_Asset_Craftsman_Armorsmithing_Med_T2_Common", "Crafting_Asset_Craftsman_Armorsmithing_Med_T1_Common"
        ],
        "Platesmithing": ["Crafting_Asset_Craftsman_Armorsmithing_Hvy_T3_Epic", "Crafting_Asset_Craftsman_Armorsmithing_Hvy_T3_Rare", "Crafting_Asset_Craftsman_Armorsmithing_Hvy_T3_Uncommon",
            "Crafting_Asset_Craftsman_Armorsmithing_Hvy_T3_Common", "Crafting_Asset_Craftsman_Armorsmithing_Hvy_T2_Common", "Crafting_Asset_Craftsman_Armorsmithing_Hvy_T1_Common"
        ],
        "Leatherworking": ["Crafting_Asset_Craftsman_Leatherworking_T3_Epic", "Crafting_Asset_Craftsman_Leatherworking_T3_Rare", "Crafting_Asset_Craftsman_Leatherworking_T3_Uncommon",
            "Crafting_Asset_Craftsman_Leatherworking_T3_Common", "Crafting_Asset_Craftsman_Leatherworking_T2_Common", "Crafting_Asset_Craftsman_Leatherworking_T1_Common"
        ],
        "Tailoring": ["Crafting_Asset_Craftsman_Tailoring_T3_Epic", "Crafting_Asset_Craftsman_Tailoring_T3_Rare", "Crafting_Asset_Craftsman_Tailoring_T3_Uncommon",
            "Crafting_Asset_Craftsman_Tailoring_T3_Common", "Crafting_Asset_Craftsman_Tailoring_T2_Common", "Crafting_Asset_Craftsman_Tailoring_T1_Common"
        ],
        "Black Ice Shaping": ["Crafting_Asset_Craftsman_Blackice_T3_Epic", "Crafting_Asset_Craftsman_Blackice_T3_Rare", "Crafting_Asset_Craftsman_Blackice_T3_Uncommon",
            "Crafting_Asset_Craftsman_Blackice_T3_Common"
        ],
        /*
            "Winter Event":     ["Crafting_Asset_Craftsman_Winter_Event_T1_Common"],
            "Siege Event":      [],
            */
    }
}

function toolListDefinition() {
    return {
        "Awl": ["Crafting_Asset_Tool_Awl_Epic", "Crafting_Asset_Tool_Awl_Rare", "Crafting_Asset_Tool_Awl_Uncommon", "Crafting_Asset_Tool_Awl_Common"],
        "Shears": ["Crafting_Asset_Tool_Shears_Epic", "Crafting_Asset_Tool_Shears_Rare", "Crafting_Asset_Tool_Shears_Uncommon", "Crafting_Asset_Tool_Shears_Common"],
        "Hammer": ["Crafting_Asset_Tool_Hammer_Epic", "Crafting_Asset_Tool_Hammer_Rare", "Crafting_Asset_Tool_Shears_Uncommon", "Crafting_Asset_Tool_Hammer_Common", ],
        "Needle": ["Crafting_Asset_Tool_Needle_Epic", "Crafting_Asset_Tool_Needle_Rare", "Crafting_Asset_Tool_Needle_Uncommon", "Crafting_Asset_Tool_Needle_Common", ],
        "Bellows": ["Crafting_Asset_Tool_Bellows_Epic", "Crafting_Asset_Tool_Bellows_Rare", "Crafting_Asset_Tool_Bellows_Uncommon", "Crafting_Asset_Tool_Bellows_Common"],
        "Bezelpusher": ["Crafting_Asset_Tool_Bezelpusher_Epic", "Crafting_Asset_Tool_Bezelpusher_Rare", "Crafting_Asset_Tool_Bezelpusher_Uncommon", "Crafting_Asset_Tool_Bezelpusher_Common"],
        "Mortar": ["Asset_Tool_Mortar_Epic", "Asset_Tool_Mortar_Rare", "Asset_Tool_Mortar_Uncommon", "Asset_Tool_Mortar_Common"],
        "Anvil": ["Crafting_Asset_Tool_Anvil_Epic", "Crafting_Asset_Tool_Anvil_Rare", "Crafting_Asset_Tool_Anvil_Uncommon", "Crafting_Asset_Tool_Anvil_Common", ],
        "Grindstone": ["Crafting_Asset_Tool_Grindstone_Epic", "Crafting_Asset_Tool_Grindstone_Rare", "Crafting_Asset_Tool_Grindstone_Uncommon", "Crafting_Asset_Tool_Grindstone_Common", ],
        "Philosophersstone": ["Asset_Tool_Philosophersstone_Epic", "Asset_Tool_Philosophersstone_Rare", "Asset_Tool_Philosophersstone_Uncommon", "Asset_Tool_Philosophersstone_Common"],
        "Loupe": ["Crafting_Asset_Tool_Loupe_Epic", "Crafting_Asset_Tool_Loupe_Rare", "Crafting_Asset_Tool_Loupe_Uncommon", "Crafting_Asset_Tool_Loupe_Common", ],
        "Graver": ["Crafting_Asset_Tool_Graver_Epic", "Crafting_Asset_Tool_Graver_Rare", "Crafting_Asset_Tool_Graver_Uncommon", "Crafting_Asset_Tool_Graver_Common", ],
        "Crucible": ["Asset_Tool_Crucible_Epic", "Asset_Tool_Crucible_Rare", "Asset_Tool_Crucible_Uncommon", "Asset_Tool_Crucible_Common", ],
        "Tongs": ["Crafting_Asset_Tool_Tongs_Epic", "Crafting_Asset_Tool_Tongs_Rare", "Crafting_Asset_Tool_Tongs_Uncommon", "Crafting_Asset_Tool_Tongs_Common", ],
        /*
        "Crafting_Asset_Tool_Leatherworking_T1_Epic",
        "Crafting_Asset_Tool_Gauntlets_Common"
        "Crafting_Asset_Tool_Leadership_T3_Common","Crafting_Asset_Tool_Leadership_T2_Common"
        */
    }
}

