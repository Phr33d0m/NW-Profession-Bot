// ==UserScript==
// @name Neverwinter gateway - Professions Robot
// @description Automatically selects professions for empty slots
// @namespace https://greasyfork.org/scripts/7061-neverwinter-gateway-professions-robot/
// @include http://gateway*.playneverwinter.com/*
// @include https://gateway*.playneverwinter.com/*
// @include http://gateway.*.perfectworld.eu/*
// @include https://gateway.*.perfectworld.eu/*
// @require http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/jquery-ui.min.js
// @resource jqUI_CSS http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/cupertino/jquery-ui.css
// @originalAuthor Mustex/Bunta
// @modifiedBy NW gateway Professions Bot Developers & Contributors

/*

Developers & Contributors:
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

 */

// @version 3.0
// @license http://creativecommons.org/licenses/by-nc-sa/3.0/us/
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_addStyle
// @grant GM_getResourceText
// ==/UserScript==

/* RELEASE NOTES
(ninja release)
- added new recursive tasklist 
- flag "recursiveList" to mark lists of new type,
- flag "useMassTask" for list witch should use " _Mass" tasks,
- new profiles "mass gathering" for every profile,
- "Gond task" profiles redefined,
- "gathering 20 -25" profiles removed
- rename WithdrawZexOrder() to CancelZexOrder() according to what this function do
- PostZexOrder() now count AD from ZEX too
- Elemental_Aggregate & Elemental_Unified tracked (noonereally)

3.0
- Fix the Domino Effect, now correctly withdraws to banker
- Add Black Ice lvl 4 & 5 professions
- Added gathering profiles for 21-25 levels
- Added active slot column to the profession levels tab
- Tools overview tab working
- Delays changed to select
- Added dobule delays option
- tweaks for leadership 20-25 AD/XP profiles
- Added more menu options for Skip "Patrol the Mines" to allow more flexability (Until per char options implemented).
- Better use of leadership assets (white used only if heros, adventurers & man-at-arms to low). WloBeb
- Added level +20 tasks for Leadership, Mailsmithing, Jewelcrafting by dlebedynskyi 
- Fix the AD counter when AD is in ZEX transition by BigRedBrent
- Added overview tabs for profession levels and profession slots
- More info in the Counter Tab
- Added Resources overview
- Added Profession assets overview tabs (needs more work)
- Moved more statistic gathering into JSON object and added per char name settings load
- Added "Load Character Names" button and reset settings button
- Separated vendoring of altars and node kits
- UI added for manual slot task allocations
- Initial structures for JSON settings
2.2-hotfix
- Fix broken ZEX Domino effect logic
- Really really really fix that tabmenu padding
2.1
- Professions profiles related fixes by dlebedynskyi
- Mailsmithing stuck fix by dlebedynskyi
- Create a claimZexOffer() function that withdraws already canceled orders
- Now cancelZexOffer() also calls claimZexOffer()
- Implement ZEX "Domino effect" by Rotten_mind's idea (there's still room for improvement here)
- Always cancelZexOffer() before posting an offer
2.0
- Additional UI changes.
- Added resetable counters for refined AD.
- Added stuck task trap (repeatition trap and restart). Thanks WloBeb 
- Added profession profiles by dlebedynskyi.
1.10.2RC1 for Greasyfork
- UI improvement
- removed "Save Task" & "Clear Task" buttons, on current build they do nothing
- replaced JAVA string search(partially) for better multilingual support(tooltip translation not included)
- reverted tasklist order to old(cosmetic change)
- Replaced defaultTasklist with tasklist
- Clear saved settings before re-saving
- Added leadership asset auto buy
- Improvements for AD transfer and reports to console log
- added missing asset names
- Added "Leadership XP" use second tasklist
- Added "Gateway_Reward" collection
- Added vendoring Rank 3 enchantments and runestones to UI
- Added "Vendor all Altar Node skill kits" to UI
- Edited vendoring rank 1 and rank 2 enchantments
1.10.1
- Patern undefined bug fix
1.10.0 - Release Candidate
- Vendor exclude filter has now higher "Safeguards" (it still might need added some unbound items eg. Glyphs, potions, etc)
- Added vendor safeguards
- Separated autovendor and profession items vendor
- SCA daily reward collection  by cycling through all configured characters (leaving SCA page will cancel the collection)
- Multi URL support for testing
- Support for gatewaytest, RU gateway (gateway.nw.ru.perfectworld.eu) and regular gateway
1.05.0.1k
- RC2 for ver. 1.0.05.2
- Added vendoring to UI
- Added vendoring "safety" setting what check item is "unbound"
- Code clearing
1.05.0.1j
- RC1 for ver. 1.05.0.2
- Rebuild sell items selection method making it more comprehensive
- Vendoring function now use array to vendor item objects
- Updated vendoring list
- Sell all runestones and enchantments rank 1 & rank 2
- Limit, altars 80, skill kits 50, healing potions T 1 - 3 10
- Re-edited warning "Tooltip"- selecting "what skill kit character not need" when selling
- Merged back the split of the pause function
- Added a parameter to specify pause/unpause/toggle (defaults to toggle as in original behavior)
- Tasklist updates
BETA 1.05.0.1i
- Edited "sell items" list
- Edited/added WARNING´s on tooltip
BETA 1.05.0.1h
- Added "sell skill kits", works same as "open_rewards" (experimental, inventory cleaning needs more specific "sell filter" and event what trigger "sell")
- Changed switching character and completing character task logic, trying prevent wrong task execution after  switch
- Refined "save settings" function
- WinterEvent tasklist got new additions
1.05.01G
- Github release
1.05.0.1f
- Minor tasklist updates
- Added button "open all(99)", opens rewardchest
- Fixed "open rewardchest" disconnect issues(need furter testing, RM)
- Fixed unnecessary ZEX visit´s
-
1.05.0.1e
- Info page updates for non-compatible browser/XXXmonkey
1.05.0.1d
- WinterEvent tasks added
- Added AD transfer automation
- Settings Panel UI: Increased size and implemented two columns for options to minimize vertical length. Also implemented new radio and button styles.
1.05.0.1c
- UI feature: Limit the gateway popup notification messages that appear at the top of the screen to a max of 2 notifications. The oldest (first) notification will always be removed when reaching the limit.
1.05.0.1b
- Added Reward Chest Opening Option
- Added All button when selling from inventory
- Added condition check for profession slot input val > 0 when processing tasks
1.05.0.1 (v1, mod 5)
- Started with bluep's edits (https://greasyfork.org/en/forum/discussion/270/x)
- Edited back in leadership asset priority (https://greasyfork.org/en/forum/discussion/comment/7213/#Comment_7213)
- Edited in Jewelcrafting for Mod5 (https://greasyfork.org/en/forum/discussion/comment/6930/#Comment_6930)
- Modified the default leadership tasks to prioritize AD generation (feel free to rever)
/* End Bunta's Edits?
1.0.0.3
- Fix some gem trading tasks not being filtered correctly
- Add check for gateway disconnected
1.0.0.2
- Fix leadership tasks not creating assets correctly
- Add option to save task lists per character (experimental)
1.0.0.1
- Rewrite script using client.dataModel methods to massively improve reliability and performance (thanks Msc)
- AD refining will now only attempt to refine if you are able to collect diamonds
- Change task lists to use exact task names so no ambiguity exists (no longer requires excluderare option)
- Asset resources are now trained as needed (only for required slots)
0.3.0.5
- Fix resources not buying correctly in all cases
- Fix pause button state saving correctly in firefox
0.3.0.4
- Add page timeout reloading functions outside of main function (thanks Kreese and Frabtik)
- Add check to ensure tasks are being started for the correct character
- Alter next run resolve function to use delay parameter to allow for unique delay timers to be used in certain cases
0.3.0.3
- Fix ingredient task selection to correctly iterate through all ingredient tasks
- Alter character selection to pick only exact character name matches
- Update leadership tasks
0.3.0.2
- Exclude alchemy from rare task exclusions due to Aqua Regia (thanks Eversor)
- Reduce GM_setValue calls to avoid tampermonkey failing to save settings (thanks miah)
0.3.0.1
- Altered mutichar selector to be faster (thanks miah)
- Updated rare tasks selector (thanks Traktor)
- Add option to refine AD during character switching (thanks Eversor)
- Added some level 20 gather tasks
- Increased supply buying to 100 units
0.3.0.0
- Added Multi-Character support
- Added function to clear all saved settings for script
- Remove disable sound functionality (now configurable in gateway)
0.2.0.1.8
- Added pause button to allow easy on/off switching
0.2.0.1.7
- Added option to enable/disable filling optional asset slots
- Added batch potions tasks to be skipped in ingredient selection
- Added timer to reload page if stuck loading for too long
- Added option to disable page sounds
- Updated license to by-nc-sa
0.2.0.1.6
- Add configurable option for excluding rare tasks
0.2.0.1.5
- Add ability to specify specific level for tasks and configure same named artificing resource tasks to request correct level of task
- Remove purchase notification that never times out
0.2.0.1.4
- Added functionality to purchase required resources from gateway shop
0.2.0.1.3
- Add Artificing and Weaponsmithing to Robot
(Artificing will not work properly yet as all three tiers of gather and craft tasks have the same task name)
0.2.0.1.2
- Update reload process
- Fix optional asset selector with gateway update
0.2.0.1.1
- Simplify asset selection after they fixed bug in previous gateway update
- Update level 20 leadership tasks
- Update with changes in Mustex's script (version 15)
 * Added a secondary timer that will reload the gateway every few hours. This should help with disconnects from the server
 * Implemented tooltips for settings panel
0.1.9.1.15
- Repeat task reordering for +2 armor
0.1.9.1.14
- Fix selection of assets after gateway update
- Skip intensive gather tasks added after gateway update
0.1.9.1.13
- Change ordering of tasks and ingredient checks
The purpose of this is to allow crafting of +4 armors if you have +2 ingredients in your inv but to not create them if you don't.
Creating the ingredients for them is less efficient than crafting ingredients for pants but is more efficient if you already have the ingredients from earlier tasks.
0.1.9.1.12
- Optimise crafting tasks for highest exp/min gains due to ingredient requirements
0.1.9.1.11
- Add extra craft tasks for when residuum runs out
0.1.9.1.10
- Only allow rare tasks to be selected for Leadership
This avoids craft loops where higher quality rare crafts require ingredients with the same name
0.1.9.1.9
- Alter craft tasks to favour armor to optimise inventory space
0.1.9.1.8
- Fix script restart bug when no tasks found
0.1.9.1.7
- Update search string for Potions (After the task names for elxiirs have been changed)
- Remove logon error skips to avoid logons sometimes failing on first load (ensure logon details are correct!)
0.1.9.1.6
- Update tasks for all professions
- Update ingredient search lists for all professions
0.1.9.1.5
- Fix regular expression used in potion ingredient search
0.1.9.1.4
- Alter default timeouts (makes script a lot more stable and less prone to errors)
- Remove unused variable
- Add extra logging for task ingredient searches
0.1.9.1.3
- Fix bug with required resource checks getting stuck on non craftable resources
0.1.9.1.2
- Added method to check for required task ingredients and choose tasks to create them
Method is currently hard coded to specify certain search strings for ingredient types
Currently working for all Alchemy tasks
There is a current problem that if you have the required potion ingredient but it is in your belt slots
the task is uncraftable but the ingredients show as available and it will not craft a new one
0.1.9.1
- Update with changes in Mustex's script (version 12)
 * Added tasks for Platesmithing, Leatherworking, Tailoring
 * Added detection for the gateway being down
0.1.8.3.8
- Update asset selection to avoid using coloured assets in junk slots for leadership
0.1.8.3.7
- Update leadership tasks table due to task reward/duration alterations
0.1.8.3.6
- Add option to enable/disable automation process
- Update alchemy tasks some more
0.1.8.3.5
- Add ability to select from multiple tasks with same name (eg Alchemical Research)
- Add craft options for alchemy potions (need to be manually switched since they use the same ingredients)
0.1.8.3.4
- Add alchemy tasks up to level 20
0.1.8.3.3
- Change task slot selection to be user configurable options in settings window
- Add level 1 alchemical research
0.1.8.3.2
- Added ability to specify how many tasks of each profession to train multiple professions at once
- Updated mailsmithing level 0 tasks
0.1.8.3.1
- Changed asset selection to only update Junk assets
- Leadership asset selection for bronze tier picks lowest asset first
- Modified Leadership tasks
0.1.8.3
- Tweaked Leadership tasks grid
- Added task grid for Alchemy (Partial)
0.1.8.2
- onsave handlers for settings are now called before the settings values are saved
- Added onsave handler for console to enable/disable using the window console
0.1.8.1
- Added checking for errors (using the window title) and will navigate back to the main login page if autologin is enabled
0.1.8
- Added popup for altering settings
- Settings are saved to script cache
- Added mailsmithing tasks to task grid
0.1.7
- Added lower level leadership tasks to grid
- Added hiring tasks to leadership task
- Uses saved values to determine which profession type to level (Defaults to Leadership, currently no way to change it)
0.1.5
- Is now able to recover from missing assets
- Uses a configurable grid to determine what the next task is to complete
0.1.0
- Is now able to select some hard coded leadership tasks
- Can now collect from any completed slot
 */

// Make sure it's running on the main page, no frames
if (window.self !== window.top) {
    throw "";
}
var current_Gateway = _select_Gateway(); // edited by RottenMind
// Set global console variables
var fouxConsole = {
    log: function() {},
    info: function() {},
    error: function() {},
    warn: function() {},
    time: function() {},
    timeEnd: function() {}

};
var console = unsafeWindow.console || fouxConsole;
var chardiamonds = {};
var zexdiamonds = 0;
var chargold = {};
var definedTask = {};
var antiInfLoopTrap = { // without this script sometimes try to start the same task in infinite loop (lags?) 
    prevCharName: "unknown", // character name which recently launched a task
    prevTaskName: "unknown", // name of the task previously launched
    startCounter: 0, // how many times the same character starts the same task 
    currCharName: "unknown", // character name which try to launch new task
    currTaskName: "unknown", // name of the new task to launch
    trapActivation: 15 // number of repetition to activation trap 
};
// Page Reloading function
// Every second the page is idle or loading is tracked
var loading_reset = false; // Enables a periodic reload if this is toggled on by the Auto Reload check box on the settings panel
var s_paused = false; // extend the paused setting to the Page Reloading function

// Include JqueryUI CSS
var jqUI_CssSrc = GM_getResourceText("jqUI_CSS");
/*jqUI_CssSrc = jqUI_CssSrc.replace (/url\(images\//g, "url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.2/themes/dark-hive/images/");*/
jqUI_CssSrc = jqUI_CssSrc.replace(/url\(images\//g, "url(http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/themes/cupertino/images/");
jqUI_CssSrc = jqUI_CssSrc.replace(/font-size: 1\.1em/g, "font-size: 0.9em");
GM_addStyle(jqUI_CssSrc);

// RottenMind (start), multi Url support

function _select_Gateway() { // Check for Gateway used to
    if (window.location.href.indexOf("gatewaytest") > -1) { // detect gatewaytest Url
        console.log("GatewayTEST detected");
        return "http://gatewaytest.playneverwinter.com";
    } else if (window.location.href.indexOf("nw.ru.perfectworld") > -1) {
        console.log("GatewayRU detected");
        return "http://gateway.nw.ru.perfectworld.eu";
    } else { // must go somewhere
        console.log("Gateway detected");
        return "http://gateway.playneverwinter.com";
    }
}
// RottenMind (END)

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

    var image_pause = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAY" +
        "AAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2" +
        "ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG" +
        "8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNR" +
        "NYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMBy" +
        "H/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAI" +
        "Cd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOE" +
        "AuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dX" +
        "Lh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJ" +
        "iYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PE" +
        "WhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJh" +
        "GLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+" +
        "AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlT" +
        "Ksz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKm" +
        "Av1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIB" +
        "BKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3" +
        "GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7E" +
        "irAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJy" +
        "KTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksq" +
        "Zs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZl" +
        "mDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5" +
        "Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVV" +
        "gqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU" +
        "2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2" +
        "KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVx" +
        "rqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri" +
        "6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxb" +
        "zwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppS" +
        "TbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo" +
        "5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8" +
        "Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLK" +
        "cRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p" +
        "7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc" +
        "+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+H" +
        "p8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw" +
        "34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8Yu" +
        "ZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIh" +
        "OOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hC" +
        "epkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa" +
        "7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZL" +
        "Vy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wt" +
        "VCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZt" +
        "Jm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkV" +
        "PRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvtt" +
        "Xa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fc" +
        "J3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5Sv" +
        "NUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2" +
        "+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3d" +
        "vfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/c" +
        "GhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0Z" +
        "jRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0" +
        "Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgA" +
        "ABdvkl/FRgAAAZ9JREFUeNqU0z+LE2EQBvDfvsuZ3IkoFzSJiuCfeAkWFmJnkz5wjVjlK4i" +
        "tnR9BrP0E4uewE/bQwKko2CjR88+BuSMhycbm3RjjNk41z7szz8w8O5Motzqu4iwW+Ir3+L" +
        "YemKzh07iLGziJPL4HjPAKz3FcRnAJD3AKXzBb+b7ABhr4jscYQhoDzuBhrDQsIU9iNz9j7" +
        "G28wLQg6OMyhrVaLd3Z2dFoNBwdHdna2tJut9XrdZPJJIzH4xHOo4rXAU3cjJXTfr8vyzJZ" +
        "lul2u3q9nizL7O3t2d3dLbr+jFvYDuiggjlMp9Nl3/P53Gw2W+IVfxZFbgecw7SYOc/zZUK" +
        "e5//gNU22QxRu4f9tgSTE5ThRkIQQ/kifJJIk+QuvJKc4DHizOsLm5uYyoVKpqFarS7zipx" +
        "jjXUF5P4o5bDabodVqgcFgIE1TnU4H7O/vOzg4yHEBL/G0IGjgUVzXX1GXMsvjIm3E+B/FI" +
        "o3wEXfi7zkuRFoVLBYKeIJPZcd0EfdwLc5ZaLMR/bd4Fm+l9BoLu44rsd0FDuM5f1gP/D0A" +
        "BNp57TyT3+MAAAAASUVORK5CYII=";
    var image_play = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYA" +
        "AAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2Z" +
        "pbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8" +
        "igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRN" +
        "YAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH" +
        "/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAIC" +
        "d+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEA" +
        "uyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXL" +
        "h4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJi" +
        "YuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEW" +
        "hkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhG" +
        "Lc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+A" +
        "XuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTK" +
        "sz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmA" +
        "v1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBB" +
        "KLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3G" +
        "oRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7Ei" +
        "rAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyK" +
        "TqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZ" +
        "s0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlm" +
        "DJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5O" +
        "l9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVg" +
        "qtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2" +
        "epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2K" +
        "ruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxr" +
        "qpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6" +
        "qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbz" +
        "wdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppST" +
        "bmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5" +
        "WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8W" +
        "uw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKc" +
        "RpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7" +
        "ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+" +
        "9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp" +
        "8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw3" +
        "4MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZ" +
        "lnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhO" +
        "OJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCe" +
        "pkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7" +
        "OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLV" +
        "y0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtV" +
        "CuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJ" +
        "m6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVP" +
        "RU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttX" +
        "a1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ" +
        "3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvN" +
        "UyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+" +
        "UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dv" +
        "fN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cG" +
        "hYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0Zj" +
        "RoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0K" +
        "f7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAA" +
        "Bdvkl/FRgAAAYZJREFUeNqk08+KklEYBvDf9+lIEYZDZQ0OIrQZahEuBoLuQqiWIl5BG2k5" +
        "W5dzA15AF9EFJOiiRRNkSIw4lTAfCQNmzrToOIkc2nRW5z3n/fe8z/Mm4mcfD3EfCb5hhC/" +
        "bjsmWXcJLPMJNLMP7DhY4wRt8jyWo4hVu4Qyrjf8rpKGjJY7xCXLB4TZeB/ssBCaRTn+ggG" +
        "d4h4s0fDRQxAy5arWq0+nEZpMiQx7P1w938SRUzkGWZbrdrsFgoFarxZJ8xWPspzgIuH+tP" +
        "ZbLpfl8rl6vG41GWq3WdpLLAOUgxb0QfI05Sf7CT9NUr9fT7/dVKpXNmSxRSv3nSQOn+UDV" +
        "H86urq9Wq5V2u+3w8NBkMrFB6w7O80EcFyHJCgqFgmKxaDgcajQaxuNxrPBPnORC8IOgvgx" +
        "puVw2nU41m01ZlsUGuIf3eJtsCOko0DjbEFgsuBQYOMJs7bjABzzFndDVZUTKe8E+xmlsmX" +
        "bxIsC5sZ5J6GiBj/9aptg67wafc3yOrfPvAQDwi2sWVdJBsgAAAABJRU5ErkJggg==";
    var image_prefs = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AMAAAAoLQ9TAAAAllBMVEUAGQASEhIfHx8fJy8pKSk2NjZBQUFJR0ZQUE9RUVFSUlJNX3No" +
        "aGhsaWdramlycG1meY98fHx+fn5wgpV0iqKKh4R4jaR9jJx8kad9kad/mbONmaWEnrmEnrq" +
        "koZy3t7fIx8bKyMHT0c3S0dDU09DV1NPP1t3W1dXY2Njb2tfe29bf3tzj4uHr6+js6+r39/" +
        "f5+PgAAABrL3yvAAAAAXRSTlMAQObYZgAAAAFiS0dEAIgFHUgAAAAJcEhZcwAACxMAAAsTA" +
        "QCanBgAAAAHdElNRQfWBRoFKh31UQ8DAAAAgUlEQVQY022OxxLCMAwFRSc4BEIPJZQQ08v+" +
        "/8+RsTExDDpIe3ijfSJ/hx9g62Dt4GaAI+8YT0t27+BxxvvE/no5pYT10lGFrE34Ja40W3g" +
        "1oMGmW7YZ6hnCYexKTPVkXivuvWe1Cz1aKqPNI3N0slI2TNYZiARJX30qERc7wBPKC4WRDz" +
        "WdWHfmAAAAAElFTkSuQmCC";
    var image_close = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQC" +
        "AQAAAC1+jfqAAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAACxMAAAsTAQCanBgAAAAHdElNRQfW" +
        "BRkTNhxuPxLkAAAAHXRFWHRDb21tZW50AENyZWF0ZWQgd2l0aCBUaGUgR0lNUO9kJW4AAAE" +
        "KSURBVCjPhdGxSgNBFAXQMzpgYWwsLEQUDBJBQgqFIChZEPR7/DA/QCGQTgQtJE1ENoWohY" +
        "UgbGKQyFjErNv52nObe19wqGWg7z0l5YVgVdOu+wUt507tqIVQ4Zodp861ooELe15M5KFI6" +
        "Zfr9u25MIj6Jl4cmSIPBWrq2o5cufO4aOJDYSozNTa2pK4t03PtwUdMKRRykAmW0dTRcyNX" +
        "pBQpI8GJDTR050zkNzK0bMMZLvUNZ8yCfy6Wvbc1NVyi4dloXjqWvds6uvp41pFmpVOKJWd" +
        "6bgwxkmTMIotWKpwrfBkZl7uMonUHf5wSlV2+fUZrjnXdzrmyy7djD8GWTW9e51z557o1Tz" +
        "85FH/WkOkaHQAAAABJRU5ErkJggg==";

    // Setup global closure variables
    var $ = unsafeWindow.jQuery;
    var timerHandle = 0;
    var dfdNextRun = $.Deferred();
    var charcurrent = 0; // current character counter
    var charlast = charcurrent;
    var chartimers = {};
    var delay = {
        SHORT: 1000,
        MEDIUM: 5000,
        LONG: 30000,
        MINS: 300000,
        DEFAULT: 10000, // default delay
        TIMEOUT: 60000, // delay for cycle processing timeout
    };

    /*
     * Helper function to define extended profiles on top of existing ones. Extends
     * prof - profession name
     * newProfile - new profile definition.
     * baseProfile - name of base profile to extend. Default is "default" or "XP" in case of Leadership
     */

    function addProfileToDefined(prof, newProfile, baseProfile) {
        baseProfile = baseProfile || (prof === "Leadership" ? "XP" : "default");
        var profSet = definedTask[prof];
        if (!profSet) {
            return;
        }
        var bp = {};
        for (var entry in profSet.profiles) {
            if (profSet.profiles[entry] && profSet.profiles[entry].profileName == baseProfile) {
                bp = profSet.profiles[entry];
                break;
            }
        }
        var cloneBase = jQuery.extend(true, {}, bp);
        jQuery.extend(true, cloneBase, newProfile);
        profSet.profiles.push(cloneBase);
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
        taskListName: "Leadership", // Friendly name used at the UI
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

    addProfileToDefined("Leadership", {
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

    definedTask["Winter Event"] = {
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

    definedTask["Siege Event"] = {
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

    definedTask["Black Ice Shaping"] = {
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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Jewelcrafting_Tier0_Intro"],
                1 : ["Jewelcrafting_Tier1_Refine_Basic_Mass", "Jewelcrafting_Tier1_Gather_Basic"],
                7 : ["Jewelcrafting_Tier2_Refine_Basic_Mass"],
                14 : ["Jewelcrafting_Tier3_Refine_Basic_Mass"],
                21 : ["Jewelcrafting_Tier4_Refine_Basic_Mass"],
            },
        }]
    };

    addProfileToDefined("Jewelcrafting", {
        profileName : "Craft Purple Neck",
        isProfileActive : true,
        level : {
            // we care only about neck items that we can start pile up at lvl 16
            16 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            17 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            18 : ["Jewelcrafting_Tier3_Neck_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            19 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            20 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            21 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            22 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            23 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            24 : ["Jewelcrafting_Tier3_Neck_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            25 : ["Jewelcrafting_Tier4_Neck_Offense_4_Purple", //Exquisite Adamant Necklace of Piercing
                  "Jewelcrafting_Tier4_Neck_Misc_4_Purple", // Exquisite Adamant Necklace of Recovery 
                  "Jewelcrafting_Tier4_Neck_Defense_4_Purple",//Exquisite Adamant Necklace of Regeneration
                  "Jewelcrafting_Tier4_Ring_Offense_4_Purple",//Exquisite Adamant Ring of Piercing
                  "Jewelcrafting_Tier4_Ring_Misc_4_Purple",//Exquisite Adamant Ring of Recovery
                  "Jewelcrafting_Tier4_Ring_Defense_4_Purple",//Exquisite Adamant Ring of Regeneration
                  "Jewelcrafting_Tier3_Neck_Offense_3", 
                  "Jewelcrafting_Tier2_Refine_Basic", "Jewelcrafting_Tier1_Refine_Basic"],
        },
    });
    
    addProfileToDefined("Jewelcrafting", {
        profileName : "Craft Purple Rings",
        isProfileActive : true,
        level : {
            // we care only about neck items that we can start pile up at lvl 15
            15 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            16 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            17 : ["Jewelcrafting_Tier3_Ring_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            18 : ["Jewelcrafting_Tier3_Ring_Offense_3", "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            19 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            20 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            21 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            22 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            23 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            24 : ["Jewelcrafting_Tier3_Ring_Offense_3",  "Jewelcrafting_Tier3_Refine_Basic", "Jewelcrafting_Tier3_Gather_Basic", "Jewelcrafting_Tier2_Gather_Basic", "Jewelcrafting_Tier1_Gather_Basic"],
            25 : ["Jewelcrafting_Tier4_Ring_Offense_4_Purple",//Exquisite Adamant Ring of Piercing
                  "Jewelcrafting_Tier4_Ring_Misc_4_Purple",//Exquisite Adamant Ring of Recovery
                  "Jewelcrafting_Tier4_Ring_Defense_4_Purple",//Exquisite Adamant Ring of Regeneration
                  "Jewelcrafting_Tier4_Neck_Offense_4_Purple", //Exquisite Adamant Necklace of Piercing
                  "Jewelcrafting_Tier4_Neck_Misc_4_Purple", // Exquisite Adamant Necklace of Recovery 
                  "Jewelcrafting_Tier4_Neck_Defense_4_Purple",//Exquisite Adamant Necklace of Regeneration
                  "Jewelcrafting_Tier3_Ring_Offense_3",  
                  "Jewelcrafting_Tier3_Refine_Basic"]
        },
    });
    

    addProfileToDefined("Jewelcrafting", {
        profileName : "Craft Purple lvl 25",
        isProfileActive : true,
        level : {
            25 : ["Jewelcrafting_Tier4_Ring_Offense_4_Purple",//Exquisite Adamant Ring of Piercing
                  "Jewelcrafting_Tier4_Ring_Misc_4_Purple",//Exquisite Adamant Ring of Recovery
                  "Jewelcrafting_Tier4_Ring_Defense_4_Purple",//Exquisite Adamant Ring of Regeneration
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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Med_Armorsmithing_Tier0_Intro"],
                1 : ["Med_Armorsmithing_Tier1_Refine_Basic_Mass", "Med_Armorsmithing_Tier1_Gather_Basic"],
                7 : ["Med_Armorsmithing_Tier2_Refine_Basic_Mass"],
                14 : ["Med_Armorsmithing_Tier3_Refine_Basic_Mass"],
                21 : ["Crafted_Med_Armorsmithing_T4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Med_Armorsmithing_Tier0_Intro"],
                1 : ["Med_Armorsmithing_Tier1_Gather_Basic"],
                6 : ["Med_Armorsmithing_Tier1_Event_Gond"],
            },
        }]
    };
        
    addProfileToDefined("Mailsmithing", {
        profileName : "Berserker's Chausses and rares",
        isProfileActive : true,
        level : {                   
            25 : ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail
                  
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 

                  "Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Dps"//Berserker's Elemental Chausses
            ],
        },
    });

    addProfileToDefined("Mailsmithing", {
            profileName : "Soldier's Chausses and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 

                      "Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Tank"//Soldier's Elemental Chausses
                ],
            },
        });
    
    addProfileToDefined("Mailsmithing", {
            profileName : "Soldier's Chainmail and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 

                      "Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Tank"//Soldier's Elemental Chainmail
                ],
            },
        });

    addProfileToDefined("Mailsmithing", {
            profileName : "Berserker's Chainmail and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 

                      "Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Dps"//Berserker's Elemental Chainmail
                ],
            },
        });

    addProfileToDefined("Mailsmithing", {
            profileName : "Zealot's Chausses and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail                      

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Dps"//Berserker's Elemental Chainmail
                ],
            },
        });

    addProfileToDefined("Mailsmithing", {
            profileName : "Zealot's Chainmail and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 
                      
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Dps"//Zealot's Elemental Chainmail
                ],
            },
        });
   
   addProfileToDefined("Mailsmithing", {
            profileName : "Prelate's Chainmail and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 

                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Tank"//Prelate's Elemental Chainmail
                ],
            },
        });

    addProfileToDefined("Mailsmithing", {
            profileName : "Prelate's Chausses and rares",
            isProfileActive : true,
            level : {                   
                25 : ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail                      
                      
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                      "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                      
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                      "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail

                      "Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Tank"//Prelate's Elemental Chainmail
                ]
            },
        });

    addProfileToDefined("Mailsmithing", {
        profileName : "craft rares only",
        isProfileActive : true,
        level : {                   
            25 : ["Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Tank",//Prelate's Exquisite Elemental Chausses 
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Tank",//Prelate's Exquisite Elemental Chainmail                      
                      
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Pants_Dps",//Zealot's Exquisite Elemental Chausses 
                  "Crafted_Med_Armorsmithing_Chain_T4_Purple_Shirt_Dps",//Zealot's Exquisite Elemental Chainmail
                     
                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Soldier's Exquisite Elemental Chausses
                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Dps",//Soldier's Exquisite Elemental Chainmail

                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Pants_Dps",//Berserker's Exquisite Elemental Chausses
                  "Crafted_Med_Armorsmithing_Scale_T4_Purple_Shirt_Tank",//Berserker's Exquisite Elemental Chainmail
                   "Med_Armorsmithing_Tier2_Refine_Basic"]
        }
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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Hvy_Armorsmithing_Tier0_Intro"],
                1 : ["Hvy_Armorsmithing_Tier1_Refine_Basic_Mass", "Hvy_Armorsmithing_Tier1_Gather_Basic"],
                7 : ["Hvy_Armorsmithing_Tier2_Refine_Basic_Mass"],
                14 : ["Hvy_Armorsmithing_Tier3_Refine_Basic_Mass"],
                21 : ["Crafted_Hvy_Armorsmithing_T4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Hvy_Armorsmithing_Tier0_Intro"],
                1 : ["Hvy_Armorsmithing_Tier1_Gather_Basic"],
                6 : ["Hvy_Armorsmithing_Tier1_Event_Gond"],                
            },
        }]
    };

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
                20 : ["Leatherworking_Tier3_Leather_Pants"],
                21 : ["Leatherworking_Tier3_Leather_Pants"],
                22 : ["Leatherworking_Tier3_Leather_Pants"],
                23 : ["Leatherworking_Tier3_Leather_Pants"],
                24 : ["Leatherworking_Tier3_Leather_Pants"],
                25 : ["Leatherworking_Tier4_Refine_Basic", "Leatherworking_Tier4_Gather_Basic"],
            },
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Leatherworking_Tier0_Intro_1"],
                1 : ["Leatherworking_Tier1_Refine_Basic_Mass", "Leatherworking_Tier1_Gather_Basic"],
                7 : ["Leatherworking_Tier2_Refine_Basic_Mass"],
                14 : ["Leatherworking_Tier3_Refine_Basic_Mass"],
                21 : ["Leatherworking_Tier4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Leatherworking_Tier0_Intro_1"],
                1 : ["Leatherworking_Tier1_Gather_Basic"],
                6 : ["Leatherworking_Tier1_Event_Gond"],                
            },
        }]
    };

    addProfileToDefined("Leatherworking", {
        profileName : "craft purples only",
        level : {
            //purples  first. shirts > tunics > pants.
            25 : ["Leatherworking_Tier4_Leather_Shirt_Special_2",//Exquisite Elemental Shirt
                  "Leatherworking_Tier4_Leather_Shirt_Special_2_Set2",//Exquisite Elemental Tunic
                  "Leatherworking_Tier4_Leather_Pants_Special_2_Set2",//Exquisite Elemental Trousers
                  "Leatherworking_Tier4_Leather_Pants_Special_2", //Exquisite Elemental Pants
                  "Leatherworking_Tier3_Gather_Basic"]
        }
    });

    addProfileToDefined("Leatherworking", {
        profileName : "craft  Elemental Shirts",
        level : {
            //purples  first. shirts > tunics > pants.
            25 : ['Leatherworking_Tier4_Leather_Shirt_Special_2',//Exquisite Elemental Shirt
                  'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2',//Exquisite Elemental Tunic
                  'Leatherworking_Tier4_Leather_Pants_Special_2_Set2',//Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                  'Leatherworking_Tier4_Leather_Shirt2',//Elemental Leather Shirt 
                    ]
        }
    });

    addProfileToDefined("Leatherworking", {
        profileName : "craft  Elemental Tunic",
        level : {
            //purples  first. shirts > tunics > pants.
            25 : ['Leatherworking_Tier4_Leather_Shirt_Special_2_Set2',//Exquisite Elemental Tunic
                  'Leatherworking_Tier4_Leather_Shirt_Special_2',//Exquisite Elemental Shirt
                  'Leatherworking_Tier4_Leather_Pants_Special_2_Set2',//Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                  'Leatherworking_Tier4_Leather_Shirt2_Set2',//Elemental Leather Tunic 
                    ]
        }
    });
   
    addProfileToDefined("Leatherworking", {
        profileName : "craft  Elemental Trousers(?)",
        level : {
            //purples  first. shirts > tunics > pants.
            25 : ['Leatherworking_Tier4_Leather_Pants_Special_2_Set2',//Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                  'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2',//Exquisite Elemental Tunic
                  'Leatherworking_Tier4_Leather_Shirt_Special_2',//Exquisite Elemental Shirt
                  'Leatherworking_Tier4_Leather_Pants2_Set2',//Elemental Leather Trousers 
                    ]
        }
    });

    addProfileToDefined("Leatherworking", {
        profileName : "craft  Elemental Pants",
        level : {
            //purples  first. shirts > tunics > pants.
            25 : ['Leatherworking_Tier4_Leather_Pants_Special_2', //Exquisite Elemental Pants
                  'Leatherworking_Tier4_Leather_Pants_Special_2_Set2',//Exquisite Elemental Trousers
                  'Leatherworking_Tier4_Leather_Shirt_Special_2_Set2',//Exquisite Elemental Tunic
                  'Leatherdeworking_Tier4_Leather_Shirt_Special_2',//Exquisite Elemental Shirt
                  'Leatherworking_Tier4_Leather_Pants2',//Elemental Leather Trousers 
                    ]
        }
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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Tailoring_Tier0_Intro"],
                1 : ["Tailoring_Tier1_Refine_Basic_Mass", "Tailoring_Tier1_Gather_Basic"],
                7 : ["Tailoring_Tier2_Refine_Basic_Mass"],
                14 : ["Tailoring_Tier3_Refine_Basic_Mass"],
                21 : ["Crafted_Tailoring_T4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Tailoring_Tier0_Intro"],
                1 : ["Tailoring_Tier1_Gather_Basic"],
                6 : ["Tailoring_Tier1_Event_Gond"],                
            },
        }]
    };
    
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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Artificing_Tier0_Intro_1"],
                1 : ["Artificing_Tier1_Refine_Basic_Mass", "Artificing_Tier1_Gather_Basic"],
                7 : ["Artificing_Tier2_Refine_Basic_Mass"],
                14 : ["Artificing_Tier3_Refine_Basic_Mass"],
                21 : ["Artificing_Tier4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Artificing_Tier0_Intro_1"],
                1 : ["Artificing_Tier1_Gather_Basic"],
                6 : ["Artificing_Tier1_Event_Gond"],                
            },
        }]
    };

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
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Weaponsmithing_Tier0_Intro"],
                1 : ["Weaponsmithing_Tier1_Refine_Basic_Mass", "Weaponsmithing_Tier1_Gather_Basic"],
                7 : ["Weaponsmithing_Tier2_Refine_Basic_Mass"],
                14 : ["Weaponsmithing_Tier3_Refine_Basic_Mass"],
                21 : ["Weaponsmithing_Tier4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Weaponsmithing_Tier0_Intro"],
                1 : ["Weaponsmithing_Tier1_Gather_Basic"],
                6 : ["Weaponsmithing_Tier1_Event_Gond"],                
            },
        }]
    };

    definedTask["Alchemy"] = {
        taskListName : "Alchemy",
        taskName : "Alchemy",
        taskDefaultPriority : 1,
        taskDefaultSlotNum : 0,
        taskActive : true,
        taskDescription : "",
        profiles : [{
            profileName : "default",
            isProfileActive : true,
            level : {
                0 : ["Alchemy_Tier0_Intro_1"],
                1 : ["Alchemy_Tier1_Experiment_Rank2", "Alchemy_Tier1_Experimentation_Rank1", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                2 : ["Alchemy_Tier1_Experiment_Rank3", "Alchemy_Tier1_Experimentation_Rank2", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                3 : ["Alchemy_Tier1_Experiment_Rank4", "Alchemy_Tier1_Experimentation_Rank3", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                4 : ["Alchemy_Tier1_Experiment_Rank5", "Alchemy_Tier1_Experimentation_Rank4", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                5 : ["Alchemy_Tier1_Experiment_Rank6", "Alchemy_Tier1_Experimentation_Rank5", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                6 : ["Alchemy_Tier1_Experiment_Rank7", "Alchemy_Tier1_Experimentation_Rank6", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                7 : ["Alchemy_Tier2_Experiment_Rank08", "Alchemy_Tier2_Experimentation_Rank07", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                8 : ["Alchemy_Tier2_Experiment_Rank09", "Alchemy_Tier2_Experimentation_Rank08", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                9 : ["Alchemy_Tier2_Experiment_Rank10", "Alchemy_Tier2_Experimentation_Rank09", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                10 : ["Alchemy_Tier2_Experiment_Rank11", "Alchemy_Tier2_Experimentation_Rank10", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic"],
                11 : ["Alchemy_Tier2_Experiment_Rank12", "Alchemy_Tier2_Experimentation_Rank11", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic"],
                12 : ["Alchemy_Tier2_Experiment_Rank13", "Alchemy_Tier2_Experimentation_Rank12", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic"],
                13 : ["Alchemy_Tier2_Experiment_Rank14", "Alchemy_Tier2_Experimentation_Rank13", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special", "Alchemy_Tier1_Refine_Basic"],
                14 : ["Alchemy_Tier3_Experiment_Rank15", "Alchemy_Tier3_Experimentation_Rank14", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                15 : ["Alchemy_Tier3_Experiment_Rank16", "Alchemy_Tier3_Experimentation_Rank15", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                16 : ["Alchemy_Tier3_Experiment_Rank17", "Alchemy_Tier3_Experimentation_Rank16", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                17 : ["Alchemy_Tier3_Experiment_Rank18", "Alchemy_Tier3_Experimentation_Rank17", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                18 : ["Alchemy_Tier3_Experiment_Rank19", "Alchemy_Tier3_Experimentation_Rank18", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                19 : ["Alchemy_Tier3_Experiment_Rank20", "Alchemy_Tier3_Experimentation_Rank19", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier2_Refine_Basic", "Alchemy_Tier1_Refine_Special",  "Alchemy_Tier1_Refine_Basic"],
                20 : ["Alchemy_Tier3_Experiment_Rank21", "Alchemy_Tier3_Experimentation_Rank20", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],
                21 : ["Alchemy_Tier4_Experiment_Rank22", "Alchemy_Tier4_Experimentation_Rank21", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],
                22 : ["Alchemy_Tier4_Experiment_Rank23", "Alchemy_Tier4_Experimentation_Rank22", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],
                23 : ["Alchemy_Tier4_Experiment_Rank24", "Alchemy_Tier4_Experimentation_Rank23", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],
                24 : ["Alchemy_Tier4_Experiment_Rank25", "Alchemy_Tier4_Experimentation_Rank24", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],
                25 : [ "Alchemy_Tier4_Experimentation_Rank25", "Alchemy_Tier4_Create_Elemental_Unified", "Alchemy_Tier3_Protection_Potion_Major", "Alchemy_Tier3_Potency_Potion_Major", "Alchemy_Tier4_Refine_Basic", "Alchemy_Tier4_Gather_Components"],           
            },
        }, {
            profileName : "mass refining",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : true,
            level : {
                0 : ["Alchemy_Tier0_Intro_1"],
                1 : ["Alchemy_Tier1_Refine_Basic_Mass", "Alchemy_Tier1_Refine_Basic"],
                7 : ["Alchemy_Tier2_Refine_Basic_Mass"],
                14 : ["Alchemy_Tier3_Refine_Basic_Mass"],
                21 : ["Alchemy_Tier4_Refine_Basic_Mass"],
            },
        }, {
            profileName : "Aqua Regia",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : false,
            level : {
                0 : ["Alchemy_Tier0_Intro_1"],
                1 : ["Alchemy_Tier1_Refine_Basic"],
                13 : ["Alchemy_Tier2_Aquaregia"],
                22 : ["Alchemy_Tier4_Aquaregia_2"],
            },
        }, {
            profileName : "Aqua Vitae",
            isProfileActive : true,
            recursiveList : true,
            useMassTask : false,
            level : {
                0 : ["Alchemy_Tier0_Intro_1"],
                1 : ["Alchemy_Tier1_Refine_Basic"],
                4 : ["Alchemy_Tier1_Aquavitae"],
                8 : ["Alchemy_Tier2_Aquavitae_2"],
            },
        }, {
            profileName : "Wondrous Sprocket",
            isProfileActive : false,
            recursiveList : true,
            level : {
                0 : ["Alchemy_Tier0_Intro_1"],
                1 : ["Alchemy_Tier1_Refine_Basic"],
                6 : ["Alchemy_Tier1_Event_Gond"],                
            },
        }]
    };

    addProfileToDefined("Alchemy", {
        profileName : "Protection Superior",
        level: {
            25:["Alchemy_Tier4_Experimentation_Rank25","Alchemy_Tier4_Protection_Potion_Superior","Alchemy_Tier3_Protection_Potion_Major", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
        }
    });
    
    addProfileToDefined("Alchemy", {
        profileName : "Potency Superior",
        level: {
            25:["Alchemy_Tier4_Experimentation_Rank25","Alchemy_Tier4_Potency_Potion_Superior", "Alchemy_Tier3_Potency_Potion_Major", "Alchemy_Tier2_Aquaregia", "Alchemy_Tier3_Refine_Basic", "Alchemy_Tier3_Gather_Components"],
        }
    }); 

    addProfileToDefined("Alchemy", {
        profileName: "Blue & Green Vitriol",
        isProfileActive: true,
        level: {
            1: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            2: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            3: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            4: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            5: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            6: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            7: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            8: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            9: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            10: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            11: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            12: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            13: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            14: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            15: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            16: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            17: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            18: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            19: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            20: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            21: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            22: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            23: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            24: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
            25: ["Alchemy_Tier1_Refine_Basic","Alchemy_Tier1_Gather_Components"],
        },
    });


    // expand recursive tasklist
    for (var professionIdx in definedTask) {
        //console.log(definedTask[professionIdx].taskName); 
        for (var profileIdx in definedTask[professionIdx].profiles) {
            //console.log(definedTask[professionIdx].profiles[profileIdx]);
            var profile = definedTask[professionIdx].profiles[profileIdx];
            if ((profile.recursiveList !== undefined) && (profile.recursiveList === true)) {
                // console.log("list to expand: " + profile.profileName);
                if (profile.level[1] === undefined) {
                    profile.level[1] = [];
                }
                for (var i=2; i<=25; i++) {
                    if (profile.level[i] === undefined) {
                        profile.level[i] = profile.level[i-1];
                    } else {
                        profile.level[i] = profile.level[i].concat(profile.level[i-1]);
                    }
                }
                //console.log(profile);
                definedTask[professionIdx].profiles[profileIdx] = profile;
            } else {
               // console.log("old type list: " + profile.profileName);
            }
        }
    }

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
        definedTask["Black Ice Shaping"],
        definedTask["Winter Event"],
        definedTask["Siege Event"],
    ];

    var globalSettings = {
        scriptPaused: false,
        scriptDebugMode: false,
        autoLogin: false,
        autoLoginAccount: "",
        autoLoginPassword: "",
    };


    // Populated at login   
    var loggedAccount = null;
    var accountSettings = {};
    var charSettingsTest = {};
    var charNameList = [];
    var charStatisticsList = []; // array of char names with the charStatistics for each char.

    var defaultCharStatistics = {
        general: {
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
            "Leadership": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Alchemy": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Jewelcrafting": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Weaponsmithing": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Artificing": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Mailsmithing": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Platesmithing": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Leatherworking": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Tailoring": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            "Black Ice Shaping": {
                level: 0,
                workersUsed: [],
                workersUnused: []
            },
            /*
            "Winter Event":     { level: 0, workersUsed: [], workersUnused: [] },
            "Siege Event":      { level: 0, workersUsed: [], workersUnused: [] },
            */
        },
        tools: {
            "Awl": {
                used: [],
                unused: []
            },
            "Shears": {
                used: [],
                unused: []
            },
            "Hammer": {
                used: [],
                unused: []
            },
            "Needle": {
                used: [],
                unused: []
            },
            "Bellows": {
                used: [],
                unused: []
            },
            "Bezelpusher": {
                used: [],
                unused: []
            },
            "Mortar": {
                used: [],
                unused: []
            },
            "Anvil": {
                used: [],
                unused: []
            },
            "Grindstone": {
                used: [],
                unused: []
            },
            "Philosophersstone": {
                used: [],
                unused: []
            },
            "Loupe": {
                used: [],
                unused: []
            },
            "Graver": {
                used: [],
                unused: []
            },
            "Crucible": {
                used: [],
                unused: []
            },
            "Tongs": {
                used: [],
                unused: []
            },
        },
        trackedResources: [],
        slotUse: [],
    };

    /*  For searching unsafeWindow.client.dataModel.model.ent.main.inventory.assignedslots / unsafeWindow.client.dataModel.model.ent.main.inventory.notassignedslots  
    This needs some design change. */

    // purple, blue, green, t3, t2, t1
    var workerList = {
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

    var toolList = {
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
    }

    /*
    "Crafting_Asset_Tool_Leatherworking_T1_Epic",
    "Crafting_Asset_Tool_Gauntlets_Common"
    "Crafting_Asset_Tool_Leadership_T3_Common","Crafting_Asset_Tool_Leadership_T2_Common"
    */


    var trackResources = [{
        fname: 'Aqua Regia',
        name: 'Crafting_Resource_Aquaregia'
    }, {
        fname: 'Aqua Vitae',
        name: 'Crafting_Resource_Aquavitae'
    }, {
        fname: 'Residuum',
        name: 'Crafting_Resource_Residuum'
    }, {
        fname: 'Mining Claim',
        name: 'Crafting_Resource_Mining_Claim'
    }, {
        fname: 'e.Aggregate',
        name: 'Crafting_Resource_Elemental_Aggregate'
    }, {
        fname: 'EU',
        name: 'Crafting_Resource_Elemental_Unified'
    }, ];

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
            vendorEnchR1: false,
            vendorEnchR2: false,
            vendorEnchR3: false,
        },
        professionSettings: {
            fillOptionals: false,
            autoPurchaseRes: false,
            trainAssets: false,
        },
        generalSettings: {
            refineAD: false,
            openRewards: false,
        },
        consolidationSettings: {
            bankName: "",
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
            advancedTaskSlots: false,
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
            vendorEnchR1: false,
            vendorEnchR2: false,
            vendorEnchR3: false,
        },
        professionSettings: {
            fillOptionals: false,
            autoPurchaseRes: false,
            trainAssets: false,
        },
        generalSettings: {
            refineAD: false,
            openRewards: false,
        },
        consolidationSettings: {
            consolidate: false,
            minCharBalance: 10000,
            minToTransfer: 50000,
        },
        taskListSettigns: [],
        taskListSettingsAdvanced: [],
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
        defaultCharSettings.taskListSettigns[task.taskListName] = {};
        defaultCharSettings.taskListSettigns[task.taskListName].taskSlots = task.taskDefaultSlotNum;
        defaultCharSettings.taskListSettigns[task.taskListName].taskProfile = profileNames[0].value;
        defaultCharSettings.taskListSettigns[task.taskListName].taskPriority = task.taskDefaultPriority;
    });

    for (var i = 0; i < 9; i++) {
        defaultCharSettings.taskListSettingsAdvanced[i] = {};
        defaultCharSettings.taskListSettingsAdvanced[i].Profession = tasklist[0].taskListName;
        defaultCharSettings.taskListSettingsAdvanced[i].Profile = tasklist[0].profiles[0].profileName;
        defaultCharSettings.taskListSettingsAdvanced[i].fillAssets = 0;
    }
    // 0 - default, 1 - do not fill, 2 - people (white to purple), 3 - people (purple to white), 4 - tools
    var charSlotsFillAssetsOptions = ['default', 'Do not fill', 'people (white to purple)', 'people (purple to white)', 'tools'];



    // Load Settings
    var settingnames = [{
            name: 'paused',
            title: 'Pause Script',
            def: false,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Disable All Automation'
        }, {
            name: 'debug',
            title: 'Enable Debug',
            def: false,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Enable all debug output to console',
            onsave: function(newValue, oldValue) {
                console = newValue ? unsafeWindow.console || fouxConsole : fouxConsole;
            }
        }, {
            name: 'openrewards',
            title: 'Open Reward Chests',
            def: false,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Enable opeing of leadership chests on character switch'
        }, //MAC-NW
        {
            name: 'autoreload',
            title: 'Auto Reload',
            def: false,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Enabling this will reload the gateway periodically. (Ensure Auto Login is enabled)'
        }, {
            name: 'refinead',
            title: 'Refine AD',
            def: true,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Enable refining of AD on character switch'
        }, {
            name: 'incdelay',
            title: 'Increase script delays by',
            def: 1,
            type: 'select',
            opts: [{
                name: 'default - 1',
                path: '1'
            }, {
                name: '1.5',
                path: '1.5'
            }, {
                name: '2',
                path: '2'
            }, {
                name: '2.5',
                path: '2.5'
            }, {
                name: '3',
                path: '3'
            }],
            pane: 'main',
            tooltip: 'Increase the delays the script waits before attempting the actions.'
        }, {
            name: 'autologin',
            title: 'Attempt to login automatically',
            def: false,
            type: 'checkbox',
            pane: 'main',
            tooltip: 'Automatically attempt to login to the neverwinter gateway site',
            border: true
        }, {
            name: 'nw_username',
            title: 'Neverwinter Username',
            def: '',
            type: 'text',
            pane: 'main',
            tooltip: ''
        }, {
            name: 'nw_password',
            title: 'Neverwinter Password',
            def: '',
            type: 'password',
            pane: 'main',
            tooltip: ''
        },

        {
            name: 'optionals',
            title: 'Fill Optional Assets',
            def: true,
            type: 'checkbox',
            pane: 'prof',
            tooltip: 'Enable to include selecting the optional assets of tasks'
        }, {
            name: 'autopurchase',
            title: 'Auto Purchase Resources',
            def: true,
            type: 'checkbox',
            pane: 'prof',
            tooltip: 'Automatically purchase required resources from gateway shop (100 at a time)'
        }, {
            name: 'trainassets',
            title: 'Train Assets',
            def: true,
            type: 'checkbox',
            pane: 'prof',
            tooltip: 'Enable training/upgrading of asset worker resources'
        }, {
            name: 'smartleadassets',
            title: 'Smart Asset allocation for leadership',
            def: true,
            type: 'checkbox',
            pane: 'prof',
            tooltip: 'Try to spread adn fill non-common assets and suplement with common if needed'
        }, {
            name: 'skippatrol',
            title: 'Skip Patrol task if > 10 claims',
            def: 'AD&Lvl20',
            type: 'select',
            opts: [{
                name: 'never',
                path: 'never'
            }, {
                name: 'always',
                path: 'always'
            }, {
                name: 'AD profile',
                path: 'ad'
            }, {
                name: 'Leadership lvl 20',
                path: 'ld20'
            }, {
                name: 'AD&Lvl20',
                path: 'AD&Lvl20'
            }],
            pane: 'prof',
            tooltip: 'Skip \"Patrol the Mines\" leadership task if there are more than 10 mining claims in the inventory (Never, Always, On AD profile, if Leadership level is &gt;= 20, or both of the above )'
        },

        {
            name: 'autovendor_junk',
            title: 'Auto Vendor junk..',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all (currently) winterfest fireworks+lanterns'
        }, //MAC-NW
        {
            name: 'autovendor_kits_altars_limit',
            title: 'Vendor/Maintain Altar Node Kit Stacks',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Limit skill kits stacks to 50/Altars80, vendor kits unusable by class, remove all if player has one bag or full bags'
        }, // edited by RottenMind
        {
            name: 'autovendor_kits_all',
            title: 'Vendor All Node Kits',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Sell ALL skill kits.'
        }, {
            name: 'autovendor_altars_all',
            title: 'Vendor All Altar',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Sell ALL Altars.'
        }, {
            name: 'autovendor_profresults',
            title: 'Vendor/Maintain Prof Crafted Levelup Items',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor off Tier 1 to 5 items produced and reused for leveling crafting professions.'
        }, {
            name: 'autovendor_pots1',
            title: 'Auto Vendor minor potions (lvl 1)',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all minor potions (lvl 1) found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_pots2',
            title: 'Auto Vendor lesser potions (lvl 15)',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all lesser potions (lvl 15) found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_pots3',
            title: 'Auto Vendor potions (lvl 30)',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all potions (lvl 30) found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_pots4',
            title: 'Auto Vendor greater potions (lvl 45)',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all greater potions (lvl 45) found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_rank1',
            title: 'Auto Vendor enchants & runes Rank 1',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all Rank 1 enchantments & runestones found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_rank2',
            title: 'Auto Vendor enchants & runes Rank 2',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all Rank 2 enchantments & runestones found in player bags'
        }, //MAC-NW
        {
            name: 'autovendor_rank3',
            title: 'Auto Vendor enchants & runes Rank 3',
            def: false,
            type: 'checkbox',
            pane: 'vend',
            tooltip: 'Vendor all Rank 3 enchantments & runestones found in player bags'
        }, // edited by RottenMind
        // MAC-NW AD Consolidation
        {
            name: 'autoexchange',
            title: 'Consolidate AD via ZEX',
            def: false,
            type: 'checkbox',
            pane: 'bank',
            tooltip: 'Automatically attempt to post, cancel and withdraw AD via ZEX and consolidate to designated character',
            border: true
        }, {
            name: 'bankchar',
            title: 'Character Name of Banker',
            def: '',
            type: 'text',
            pane: 'bank',
            tooltip: 'Enter name of the character to hold account AD'
        }, {
            name: 'banktransmin',
            title: 'Min AD for Transfer',
            def: '22000',
            type: 'text',
            pane: 'bank',
            tooltip: 'Enter minimum AD limit for it to be cosidered for transfer off a character'
        }, {
            name: 'bankcharmin',
            title: 'Min Character balance',
            def: '8000',
            type: 'text',
            pane: 'bank',
            tooltip: 'Enter the amount of AD to always keep available on characters'
        }, {
            name: 'banktransrate',
            title: 'AD per Zen Rate (in zen)',
            def: '300',
            type: 'text',
            pane: 'bank',
            tooltip: 'Enter default rate to use for transfering through ZEX'
        }, {
            name: 'charcount',
            title: 'Enter number of characters to use (Save and Apply to update settings form)',
            def: '2',
            type: 'text',
            pane: 'main',
            tooltip: 'Enter number of characters to use (Save and Apply to update settings form)',
            border: true
        },
        // MAC-NW
    ];

    // Load local settings cache (unsecured)
    var settings = {};
    for (var i = 0; i < settingnames.length; i++) {
        // Ignore label types
        if (settingnames[i].type === 'label') {
            continue;
        }
        settings[settingnames[i].name] = GM_getValue(settingnames[i].name, settingnames[i].def);
        // call the onsave for the setting if it exists
        if (typeof(settingnames[i].onsave) === "function") {
            console.log("Calling 'onsave' for", settingnames[i].name);
            settingnames[i].onsave(settings[settingnames[i].name], settings[settingnames[i].name]);
        }
    }

    var delay_modifier = parseFloat(settings["incdelay"]);
    delay.SHORT *= delay_modifier;
    delay.MEDIUM *= delay_modifier;
    delay.LONG *= delay_modifier;
    //delay.MINS 
    delay.DEFAULT *= delay_modifier;
    delay.TIMEOUT *= delay_modifier;

    if (settings["charcount"] < 1) {
        settings["charcount"] = 1;
    }
    if (settings["charcount"] > 99) {
        settings["charcount"] = 99;
    }

    var priorityOptions = [{
        name: 'high',
        value: 0
    }, {
        name: 'medium',
        value: 1
    }, {
        name: 'low',
        value: 2
    }];

    var charSettings = [];
    for (var i = 0; i < settings["charcount"]; i++) {
        charSettings.push({
            name: 'nw_charname' + i,
            title: 'Character',
            def: 'Character ' + (i + 1),
            type: 'text',
            tooltip: 'Characters Name'
        });
        tasklist.forEach(function(task) {
            var profileNames = [];
            task.profiles.forEach(function(profile) {
                if (profile.isProfileActive) profileNames.push({
                    name: profile.profileName,
                    value: profile.profileName
                });
            });
            //charSettings.push({name: task["taskListName"] + i, title: task["taskListName"], profileNames: profileNames,  def: task["taskDefaultSlotNum"] , type: 'text', tooltip: 'Number of slots to assign to ' + task["taskListName"]});
            charSettings.push({
                name: task.taskListName + i,
                title: task.taskListName,
                def: task.taskDefaultSlotNum,
                type: 'text',
                type2: 'task',
                tooltip: 'Number of slots to assign to ' + task.taskListName,
                pane: "tasks"
            });
            charSettings.push({
                name: task.taskListName + i + '_profile',
                title: task.taskListName + '_profile',
                options: profileNames,
                def: profileNames[0].value,
                type: 'select',
                type2: 'task-property',
                tooltip: '',
                pane: "tasks"
            });
            charSettings.push({
                name: task.taskListName + i + '_priority',
                title: task.taskListName + '_priority',
                options: priorityOptions,
                def: task.taskDefaultPriority,
                type: 'select',
                type2: 'task-property',
                tooltip: '',
                pane: "tasks"
            });
        });

        charSettings.push({
            name: 'test' + i,
            title: 'test',
            def: 1,
            type: 'text',
            tooltip: 'test',
            pane: "settings"
        });
    }

    for (var i = 0; i < charSettings.length; i++) {
        settings[charSettings[i].name] = GM_getValue(charSettings[i].name, charSettings[i].def);
    }
    /*
    var refineCounters = JSON.parse(GM_getValue("refineCounters", "{}"));
    if (!refineCounters) {
        console.log('refineCounters couldn\'t be retrieved, reseting.');
        refineCounters = {};
    };
*/
    // Page Settings
    var PAGES = Object.freeze({
        LOGIN: {
            name: "Login",
            path: "div#login"
        },
        GUARD: {
            name: "Account Guard",
            path: "div#page-accountguard"
        },
    });

    /**
     * Uses the page settings to determine which page is currently displayed
     */

    function GetCurrentPage() {
        for each(var page in PAGES) {
            if ($(page["path"]).filter(":visible").length) {
                return page;
            }
        }
    }

    /**
     * Logs in to gateway
     * No client.dataModel exists at this stage
     */

    function page_LOGIN() {
        //if (!$("form > p.error:visible").length && settings["autologin"]) {
        // No previous log in error - attempt to log in
        console.log("Setting username");
        $("input#user").val(settings["nw_username"]);
        console.log("Setting password");
        $("input#pass").val(settings["nw_password"]);
        console.log("Clicking Login Button");
        $("div#login > input").click();
        //}
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
            unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(entry) {
                if (entry.hascompletedetails) {
                    unsafeWindow.client.professionTaskCollectRewards(entry.uassignmentid);
                }
            });
            dfdNextRun.resolve();
            return true;
        }

        // Check for available slots and start new task
        console.log("Looking for empty slots.");
        if (unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) {
            return (!entry.islockedslot && !entry.uassignmentid);
        }).length) {
            // Go through the professions to assign tasks until specified slots filled
            console.log("Prioritizing task lists.");
            var charTaskList = tasklist
                .filter(function(task) {
                    return (settings[task.taskListName] > 0);
                })
                .sort(function(a, b) {
                    return (settings[a.taskListName + '' + charcurrent + '_priority'] - settings[b.taskListName + charcurrent + '_priority']);
                });

            console.log("Attempting to fill the slot.");
            for (var i = 0; i < charTaskList.length; i++) {
                var currentTasks = unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.filter(function(entry) {
                    return entry.category == charTaskList[i].taskName;
                });
                if (currentTasks.length < settings[charTaskList[i].taskListName]) {
                    unsafeWindow.client.professionFetchTaskList('craft_' + charTaskList[i].taskName);
                    window.setTimeout(function() {
                        createNextTask(charTaskList[i], 0);
                    }, delay.SHORT);
                    return true;
                }
            }
            console.log("All task counts assigned");
        } else {
            console.log("No available task slots");
        }

        // TODO: Add code to get next task finish time
        chartimers[charcurrent] = getNextFinishedTask();

        // Add diamond count
        chardiamonds[charcurrent] = unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds;
        console.log(settings["nw_charname" + charcurrent] + "'s", "Astral Diamonds:", chardiamonds[charcurrent]);
        // Add gold count
        chargold[charcurrent] = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.gold);
        return false;
    }

    /**
     * Switch to a character's swordcoast adventures and collect the daily reward
     */

    function processSwordCoastDailies(_charStartIndex) {
        var _accountName = unsafeWindow.client.dataModel.model.loginInfo.publicaccountname;
        var _charIndex = (!_charStartIndex || parseInt(_charStartIndex) > (charSettings.length + 1) || parseInt(_charStartIndex) < 0) ? 0 : parseInt(_charStartIndex);
        var _fullCharName = settings["nw_charname" + _charIndex] + '@' + _accountName;
        var _hasLoginDaily = 0;
        var _isLastChar = false;
        var _scaHashMatch = /\/adventures$/;
        if (!settings["paused"])
            PauseSettings("pause");

        // Switch to professions page to show task progression
        if (!_scaHashMatch.test(unsafeWindow.location.hash)) {
            return;
        } else if (unsafeWindow.location.hash != "#char(" + encodeURI(_fullCharName) + ")/adventures") {
            unsafeWindow.location.hash = "#char(" + encodeURI(_fullCharName) + ")/adventures";
        }

        if (settings["nw_charname" + (_charIndex + 1)] === undefined)
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
        unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(entry) {
            if (entry.uassignmentid) {
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

    function createNextTask(prof, i) {
        // TODO: Use callback function
        if (!unsafeWindow.client.dataModel.model.craftinglist || unsafeWindow.client.dataModel.model.craftinglist === null || !unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] || unsafeWindow.client.dataModel.model.craftinglist['craft_' + prof.taskName] === null) {
            console.log('Task list not loaded for:', prof.taskName);
            window.setTimeout(function() {
                createNextTask(prof, i);
            }, delay.SHORT);
            return false;
        }

        // Check level
        var level = unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories.filter(function(entry) {
            return entry.name == prof.taskName;
        })[0].currentrank;
        var profiles = prof.profiles.filter(function(profile) {
            return profile.profileName == settings[prof.taskListName + charcurrent + '_profile'];
        });
        console.log('Selecting profile: ' + profiles[0].profileName);
        var list = profiles[0].level[level];
        if (list.length <= i) {
            console.log("Nothing Found");
            switchChar();
            return false;
        }
        console.log(prof.taskName, "is level", level);
        console.log("createNextTask", list.length, i);

        var taskName = list[i];
        console.log("Searching for task:", taskName);

        // Search for task to start
        var task = searchForTask(taskName, prof.taskName, profiles[0].profileName, level);

        /** TODO: Use this  code once below can be replaced properly
        if (task === null) {
        console.log("Skipping task selection to purchase resources");
        dfdNextRun.resolve();
        }
        else if (task) {
        startTask(task);
        dfdNextRun.resolve();
        }
        else {
        console.log('Finding next task');
        createNextTask(prof, i+1);
        }
         **/

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
                if (buttonList.length && settings["optionals"]) {
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
                            createNextTask(prof, i + 1);
                        });
                    }
                });
            });
        } else {
            console.log('Finding next task');
            createNextTask(prof, i + 1);
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

    function searchForTask(taskname, profname, profileName, professionLevel) {
        // Return first object that matches exact craft name
        // edited by WloBeb - start Patrol the Mines task only if char has less than 10 Mining Claims
        if (taskname == "Leadership_Tier3_13_Patrol" && (settings["skippatrol"] == 'always' ||
            (settings["skippatrol"] == 'ad' && profileName == "AD") || (settings["skippatrol"] == 'ld20' && professionLevel >= 20) ||
            (settings["skippatrol"] == 'AD&Lvl20' && professionLevel >= 20 && profileName == "AD"))) {
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
        if (!thisTask.failedrequirementsreasons.length) {
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
        if (thisTask.failsresourcesrequirements && profname == "Leadership" && settings["autopurchase"]) {
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
                if (failedCrafter.length && settings["trainassets"]) {
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
                if (settings["autopurchase"] && itemName.match(/^Crafting_Resource_(Charcoal|Rocksalt|Spool_Thread|Porridge|Solvent|Brimstone|Coal|Moonseasalt|Quicksilver|Spool_Threadsilk)$/)) {
                    // returns null if successful (task will try again) and false if unsuccessful (task will be skipped)
                    return buyResource(itemName);
                }
                // Matched profession auto-purchase item found but auto-purchase is not enabled
                else if (!settings["autopurchase"] && itemName.match(/^Crafting_Resource_(Charcoal|Rocksalt|Spool_Thread|Porridge|Solvent|Brimstone|Coal|Moonseasalt|Quicksilver|Spool_Threadsilk)$/)) {
                    console.log("Purchasable resource required:", itemName, "for task:", taskname, ". Recommend enabling Auto Purchase Resources.");
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

        var profession = tasklist.filter(function(entry) { return entry.taskName == profname; });
        var profile = profession[0].profiles.filter(function(entry) { return entry.profileName == profileName; });
        var massTaskAllowed = ((profile[0].useMassTask !== undefined) && (profile[0].useMassTask === true));

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
            
            // Skip mass production tasks (don't skip if "mass ...." profile selected)
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
            return false;
        }
        
        // for "mass ...." profile name select Mass task
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
            var task = searchForTask(taskList[i].def.name, profname, profileName, professionLevel);
            if (task === null || task) {
                return task;
            }
        }
        return false;
    }

    /** --------- MAC-NW : Unused old function
     * Fills resource slots and begins a profession task
     *
     * @param {string} taskDetail The craftindetail object for the task to be started
    function startTask(taskDetail) {
    return;

    unsafeWindow.client.professionFetchTaskDetail(taskDetail.def.name);
    //client.dataModel.addDefaultResources();
    client.professionStartAssignment(taskDetail.def.name);
    }*/

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
                if (settings["smartleadassets"]) {
                    T3_Epic = countResource("Crafting_Asset_Craftsman_Leadership_T3_Epic"); // number of heroes in inventory
                    T3_Rare = countResource("Crafting_Asset_Craftsman_Leadership_T3_Rare"); // number of adventurers in inventory
                    T3_Uncommon = countResource("Crafting_Asset_Craftsman_Leadership_T3_Uncommon"); // number of man-at-arms in inventory
                    usedCommon = countUsedResource("Crafting_Asset_Craftsman_Leadership_T3_Common") + countUsedResource("Crafting_Asset_Craftsman_Leadership_T2_Common") + countUsedResource("Crafting_Asset_Craftsman_Leadership_T1_Common_1"); //number of used mercenarys, guards and footmans
                }

                if (!(settings["smartleadassets"]) || (settings["smartleadassets"] && (T3_Epic + T3_Rare + T3_Uncommon + usedCommon < settings["Leadership" + charcurrent] * 2))) {
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

    /* ################# original
    function SelectItemFor(buttonListIn, i, def, prof) {
    buttonListIn[i].click();
    WaitForState("").done(function() {
    var specialItems = $("div.modal-item-list a.Special");
    var goldItems = $("div.modal-item-list a.Gold");
    var silverItems = $("div.modal-item-list a.Silver");
    var bronzeItems = $("div.modal-item-list a.Bronze");
    var clicked = false;
    // Try to avoid using up higher rank assets needlessly
    if (prof.taskName === "Leadership") {
    var mercenarys = $("div.modal-item-list a.Bronze:contains('Mercenary')");
    var guards = $("div.modal-item-list a.Bronze:contains('Guard')");
    var footmen = $("div.modal-item-list a.Bronze:contains('Footman')");
    if (mercenarys.length)  { clicked = true; mercenarys[0].click(); }
    else if (guards.length)     { clicked = true; guards[0].click(); }
    else if (footmen.length) { clicked = true; footmen[0].click(); }
    }
    // TODO: add remaining professions in the same way for bronze tier assets.
    if (!clicked) {
    // Click the highest slot
    if (specialItems.length)    { specialItems[0].click(); }
    else if (goldItems.length)  { goldItems[0].click(); }
    else if (silverItems.length) { silverItems[0].click(); }
    else if (bronzeItems.length) { bronzeItems[0].click(); }
    else { $("button.close-button").click(); }
    }
    console.log("Clicked item");
    WaitForState("").done(function() {
    // Get the new set of select buttons created since the other ones are removed when the asset loads
    var buttonList = $("h3:contains('Optional Assets:')").closest("div").find("button");
    if (i < buttonList.length - 1) {
    SelectItemFor(buttonList, i+1, def, prof);
    }
    else {
    // Let main loop continue
    def.resolve();
    }
    });
    });
    }
     */

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
            console.log("Purchasing profession resources failed for:", item);
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

    function postZexOffer() {
        // Make sure the exchange data is loaded to model
        if (unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            // Check that there is atleast 1 free zex order slot
            if (unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length < 5) {
                // Place the order
                var exchangeDiamonds = parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                if (exchangeDiamonds > 0) {
                    console.log("AD in exchange: " + exchangeDiamonds);
                }  
                // Domino effect: this new order will post all the gathered diamonds until now
                var charDiamonds = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds);
                var ZenRate = parseInt(settings["banktransrate"]);
                var ZenQty = Math.floor((charDiamonds + exchangeDiamonds - parseInt(settings["bankcharmin"])) / ZenRate);
                ZenQty = (ZenQty > 5000) ? 5000 : ZenQty;
                console.log("Posting Zex buy listing for " + ZenQty + " ZEN at the rate of " + ZenRate + " AD/ZEN. AD remainder: " + charDiamonds + " - " + ((ZenRate * ZenQty) - exchangeDiamonds) + " = " + (charDiamonds - (ZenRate * ZenQty) - exchangeDiamonds));
                unsafeWindow.client.createBuyOrder(ZenQty, ZenRate);
                // set moved ad to the ad counter zex log
                var ADTotal = ZenRate * ZenQty;
                if (ADTotal > 0) {
                    console.log("AD moved to ZEX from", settings["nw_charname" + charlast] + ":", ADTotal - exchangeDiamonds);
                    chardiamonds[charlast] -= (ADTotal - exchangeDiamonds);
                    console.log(settings["nw_charname" + charlast] + "'s", "Astral Diamonds:", chardiamonds[charlast]);
                    zexdiamonds += (ADTotal - exchangeDiamonds);
                    console.log("Astral Diamonds on the ZEX:", zexdiamonds);
                }
            } else {
                console.log("Zen Max Listings Reached (5). Skipping Zex Posting..");
            }
        } else {
            console.log("Zen Exchange data did not load in time for transfer. Skipping Zex Posting..");
        }
    }

    // Function used to check exchange data model and withdraw listed orders that use the settings zen transfer rate

    function cancelZexOffer() {
        // Make sure the exchange data is loaded to model
        if (unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            if (unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length >= 1) {
                console.log("Canceling ZEX orders");

                var charDiamonds = parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds);
                var ZenRate = parseInt(settings["banktransrate"]);

                // cycle through the zex listings
                unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.forEach(function(item) {
                    // find any buy orders in the list with our set zen rate
                    if (parseInt(item.price) == ZenRate && item.ordertype == "Buy") {
                        // cancel/withdraw the order
                        client.withdrawOrder(item.orderid);
                        console.log("Canceling Zex listing for " + item.quantity + " ZEN at the rate of " + item.price + " . Total value in AD: " + item.totaltc);
                    }
                });
            } else {
                console.log("No listings found on Zex. Skipping Zex Cancel..");
            }
        } else {
            console.log("Zen Exchange data did not load in time for transfer. Skipping Zex Withrdaw..");
        }
    }

    function claimZexOffer() {
        if (unsafeWindow.client.dataModel.model.exchangeaccountdata) {
            if (parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow) > 0) {
                unsafeWindow.client.sendCommand("GatewayExchange_ClaimTC", unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                console.log("Attempting to withdraw exchange balancees... ClaimTC: " + unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimescrow);
                // clear the ad counter zex log
                zexdiamonds = 0;
            }
            if (parseInt(unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc) > 0) {
                unsafeWindow.client.sendCommand("GatewayExchange_ClaimMTC", unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc);
                console.log("Attempting to withdraw exchange balancees... ClaimMT: " + unsafeWindow.client.dataModel.model.exchangeaccountdata.readytoclaimmtc);
            }
        } else {
            window.setTimeout(claimZexOffer, delay.SHORT);
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

        if (settings["autovendor_profresults"]) {
            /** Profession leveling result item cleanup logic for T1-4 crafted results
             * Created by RM on 14.1.2015.
             * List contains crafted_items, based "Mustex/Bunta NW robot 1.05.0.1L crafting list, can be used making list for items what are "Auto_Vendored".
             * Items on list must be checked and tested.
             */
            /*#1, Tier3, end list, sell allways all, "TierX" is here "TX" !!*/
            /*_profitems[_profitems.length] = {
            pattern : /^Crafted_(Jewelcrafting_Waist_Offense_3|Jewelcrafting_Neck_Defense_3|Jewelcrafting_Waist_Defense_3|Med_Armorsmithing_T3_Chain_Armor_Set_1|Med_Armorsmithing_T3_Chain_Pants2|Med_Armorsmithing_T3_Chain_Shirt2|Med_Armorsmithing_T3_Chain_Helm_Set_1|Med_Armorsmithing_T3_Chain_Pants|Med_Armorsmithing_T3_Chain_Boots_Set_1|Hvy_Armorsmithing_T3_Plate_Armor_Set_1|Hvy_Armorsmithing_T3_Plate_Pants2|Hvy_Armorsmithing_T3_Plate_Shirt2|Hvy_Armorsmithing_T3_Plate_Helm_Set_1|Hvy_Armorsmithing_T3_Plate_Boots_Set_1|Leatherworking_T3_Leather_Armor_Set_1|Leatherworking_T3_Leather_Pants2|Leatherworking_T3_Leather_Shirt2|Leatherworking_T3_Leather_Helm_Set_1|Leatherworking_T3_Leather_Boots_Set_1|Tailoring_T3_Cloth_Armor_Set_3|Tailoring_T3_Cloth_Armor_Set_2|Tailoring_T3_Cloth_Armor_Set_1|Tailoring_T3_Cloth_Pants2_Set2|Tailoring_T3_Cloth_Shirt2|Tailoring_T3_Cloth_Helm_Set_1|Artificing_T3_Pactblade_Temptation_5|Artificing_T3_Icon_Virtuous_5|Weaponsmithing_T3_Dagger_4)$/,
            limit : 0,
            count : 0
            };*/ // moved to selljunk filter, RottenMind
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
                    if (settings["autovendor_profresults"]) {
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

        if (settings["autovendor_profresults"]) {
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
                    if (settings["autovendor_kits_altars_limit"] && /^Item_Consumable_Skill/.test(slot.name)) {
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

        if (settings["refinead"]) {
            var _currencies = unsafeWindow.client.dataModel.model.ent.main.currencies;
            if (_currencies.diamondsconvertleft && _currencies.roughdiamonds) {
                var refined_diamonds;
                if (_currencies.diamondsconvertleft < _currencies.roughdiamonds) {
                    refined_diamonds = _currencies.diamondsconvertleft
                } else {
                    refined_diamonds = _currencies.roughdiamonds
                }
                chardiamonds[charcurrent] += refined_diamonds
                console.log("Refining AD for", settings["nw_charname" + charcurrent] + ":", refined_diamonds);
                console.log(settings["nw_charname" + charcurrent] + "'s", "Astral Diamonds:", chardiamonds[charcurrent]);
                unsafeWindow.client.sendCommand('Gateway_ConvertNumeric', 'Astral_Diamonds');
                WaitForState("button.closeNotification").done(function() {
                    $("button.closeNotification").click();
                });
                charStatisticsList[settings["nw_charname" + charcurrent]].general.refineCounter += refined_diamonds;

            }
        }

        // MAC-NW -- AD Consolidation
        if (settings["autoexchange"]) {

            // Check that we dont take money from the character assigned as the banker // Zen Transfer / Listing
            if (settings["bankchar"] != unsafeWindow.client.dataModel.model.ent.main.name) {
                // Check the required min AD amount on character
                if (settings["banktransmin"] && settings["bankcharmin"] && parseInt(unsafeWindow.client.dataModel.model.ent.main.currencies.diamonds) >= (parseInt(settings["banktransmin"]) + parseInt(settings["bankcharmin"]))) {
                    // Check that the rate is not less than the min & max
                    if (settings["banktransrate"] && parseInt(settings["banktransrate"]) >= 50 && parseInt(settings["banktransrate"]) <= 500) {
                        window.setTimeout(postZexOffer, delay.SHORT);
                    } else {
                        console.log("Zen transfer rate does not meet the minimum (50) or maximum (500). Skipping Zex Posting..");
                    }
                } else {
                    console.log("Character does not have minimum AD balance to do funds transfer. Skipping Zex Posting..");
                }
            }

        } else {
            console.log("Zen Exchange AD transfer not enabled. Skipping Zex Posting..");
        }

        if (settings["openrewards"]) {
            var _pbags = unsafeWindow.client.dataModel.model.ent.main.inventory.playerbags;
            var _cRewardPat = /Reward_Item_Chest|Gateway_Rewardpack/;
            console.log("Opening Rewards");
            $.each(_pbags, function(bi, bag) {
                bag.slots.forEach(function(slot) {
                    if (slot && _cRewardPat.test(slot.name)) {
                        if (slot.count >= 99)
                            slot.count = 99;
                        for (i = 1; i <= slot.count; i++) {
                            window.setTimeout(function() {
                                client.sendCommand('GatewayInventory_OpenRewardPack', slot.uid);
                            }, 500);
                        }
                    }
                });
            });
        }

        // Check Vendor Options & Vendor matched items
        vendorJunk();

        // MAC-NW (endchanges)


        // Updating statistics
        var _curCharName = settings["nw_charname" + charcurrent];
        var _stat = charStatisticsList[_curCharName].general;
        var _chardata = unsafeWindow.client.dataModel.model.ent.main.currencies;
        _stat.gold = parseInt(_chardata.gold);
        _stat.rad = parseInt(_chardata.roughdiamonds);
        _stat.diamonds = parseInt(_chardata.diamonds);
        _stat.rBI = parseInt(_chardata.rawblackice);
        _stat.BI = parseInt(_chardata.blackice);
        _stat.refined = parseInt(_chardata.diamondsconverted);
        _stat.diamondsconvertleft = parseInt(_chardata.refineLimitLeft);
        _stat.activeSlots = unsafeWindow.client.dataModel.model.ent.main.itemassignments.active;

        //clearing
        charStatisticsList[_curCharName].trackedResources = [];
        $.each(charStatisticsList[_curCharName].tools, function(name, obj) {
            obj.used = [];
            obj.unused = [];
        });
        $.each(charStatisticsList[_curCharName].professions, function(name, obj) {
            obj.workersUsed = [];
            obj.workersUnused = [];
            obj.level = 0;
        });

        trackResources.forEach(function(resource, ri) {
            charStatisticsList[_curCharName].trackedResources[ri] = 0;
        });

        // Counting tracked resources
        unsafeWindow.client.dataModel.model.ent.main.inventory.bags
            .filter(function(bag) {
                return bag.bagid == "CraftingResources"
            })
            .forEach(function(bag) {
                bag.slots.forEach(function(slot) {
                    trackResources.forEach(function(resource, ri) {
                        if (slot && slot.name === resource.name) {
                            charStatisticsList[_curCharName].trackedResources[ri] += slot.count;
                        }
                    });
                });
            });

        // Slot assignment
        unsafeWindow.client.dataModel.model.ent.main.itemassignments.assignments.forEach(function(slot, ix) {
            charStatisticsList[_curCharName].slotUse[ix] = slot.category;
        });

        // Workers and tools assignment and qty
        unsafeWindow.client.dataModel.model.ent.main.inventory.assignedslots
            .forEach(function(item) {
                $.each(workerList, function(pName, pList) {
                    var index = pList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[_curCharName].professions[pName].workersUsed[index] = item.count;
                    }
                });
                $.each(toolList, function(tName, tList) {
                    var index = tList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[_curCharName].tools[tName].used[index] = item.count;
                    }
                });
            });

        unsafeWindow.client.dataModel.model.ent.main.inventory.notassignedslots
            .forEach(function(item) {
                $.each(workerList, function(pName, pList) {
                    var index = pList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[_curCharName].professions[pName].workersUnused[index] = item.count;
                    }
                })
                $.each(toolList, function(tName, tList) {
                    var index = tList.indexOf(item.name);
                    if (index > -1) {
                        charStatisticsList[_curCharName].tools[tName].unused[index] = item.count;
                    }
                })
            });

        // getting profession levels from currentrank, model has displayname, name, and category, using displayname (platesmithing)
        // Must match the names in charStatisticsList[_curCharName].professions
        unsafeWindow.client.dataModel.model.ent.main.itemassignmentcategories.categories
            .forEach(function(prof) {
                if (charStatisticsList[_curCharName].professions[prof.displayname]) {
                    charStatisticsList[_curCharName].professions[prof.displayname].level = prof.currentrank;
                }
            });

        GM_setValue("chars__statistics__" + _curCharName, JSON.stringify(charStatisticsList[_curCharName]));
        updateCounters(false);





        console.log("Switching Characters");
        charlast = charcurrent;

        var chardelay,
            chardate = null,
            nowdate = new Date();
        nowdate = nowdate.getTime();
        for (var cc = 0; cc < settings["charcount"]; cc++) {
            if (chartimers[cc] != null) {
                console.log("Date found for " + settings["nw_charname" + cc]);
                if (!chardate || chartimers[cc] < chardate) {
                    chardate = chartimers[cc];
                    charcurrent = cc;
                    chardelay = chardate.getTime() - nowdate - unsafeWindow.client.getServerOffsetSeconds() * 1000;
                    if (chardelay < delay.SHORT) {
                        chardelay = delay.SHORT;
                    }
                }
            } else {
                charcurrent = cc;
                chardelay = delay.SHORT;
                chardate = null;
                console.log("No date found for " + settings["nw_charname" + cc] + ", switching now.");
                break;
            }
        }

        if (settings["autoexchange"]) {
            // Withdraw AD from the ZAX into the banker character
            if (settings["bankchar"] == settings["nw_charname" + charcurrent]) {
                window.setTimeout(cancelZexOffer, delay.SHORT);
            }
        }

        // Count AD & Gold
        var curdiamonds = zexdiamonds;
        var curgold = 0;
        for (var cc = 0; cc < settings["charcount"]; cc++) {
            if (chardiamonds[cc] != null) {
                curdiamonds += Math.floor(chardiamonds[cc] / 50) * 50;
            }

            if (chargold[cc] != null) {
                curgold += chargold[cc];
            }
        }

        console.log("Next run for " + settings["nw_charname" + charcurrent] + " in " + parseInt(chardelay / 1000) + " seconds.");
        $("#prinfopane").empty().append("<h3 class='promo-image copy-top prh3'>Professions Robot<br />Next task for " + settings["nw_charname" + charcurrent] + "<br /><span data-timer='" + chardate + "' data-timer-length='2'></span><br />Diamonds: " + curdiamonds.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "<br />Gold: " + curgold + "</h3>");
        GM_setValue("charcurrent", charcurrent);
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
        // Make sure the settings button exists
        addSettings();

        // Enable/Disable the unconditional page reload depending on settings
        loading_reset = settings["autoreload"];

        // Check if timer is paused
        s_paused = settings["paused"]; // let the Page Reloading function know the pause state
        if (settings["paused"]) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            var timerHandle = window.setTimeout(function() {
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
        if (currentPage == PAGES.LOGIN) {
            page_LOGIN();
            return;
        } else if (currentPage == PAGES.GUARD) {
            page_GUARD();
            return;
        }

        window.setTimeout(function() {
            loginProcess();
        }, delay.SHORT);

        // Continue again later
        dfdNextRun.done(function(delayTimer) {
            dfdNextRun = $.Deferred();
            timerHandle = window.setTimeout(function() {
                process();
            }, typeof delayTimer !== 'undefined' ? delayTimer : delay.DEFAULT);
        });
    }

    function loginProcess() {
        // Get logged on account details
        var accountName;
        try {
            accountName = unsafeWindow.client.dataModel.model.loginInfo.publicaccountname;
        } catch (e) {
            // TODO: Use callback function
            window.setTimeout(function() {
                loginProcess();
            }, delay.SHORT);
            return;
        }

        // Check if timer is paused again to avoid starting new task between timers
        s_paused = settings["paused"]; // let the Page Reloading function know the pause state
        if (settings["paused"]) {
            // Just continue later - the deferred object is still set and nothing will resolve it until we get past this point
            var timerHandle = window.setTimeout(function() {
                process();
            }, delay.DEFAULT);
            return;
        }

        if (accountName) {

            if (!loggedAccount) {
                loggedAccount = accountName;
                console.log("Loading settings for " + accountName);

                var tempAccountSetting;
                try {
                    tempAccountSetting = JSON.parse(GM_getValue("account__settings__" + accountName, "{}"));
                } catch (e) {
                    tempAccountSetting = null;
                }
                if (!tempAccountSetting) {
                    console.log('Account settings couldn\'t be retrieved, loading defaults.');
                    tempAccountSetting = {};
                };
                accountSettings = $.extend(true, {}, defaultAccountSettings, tempAccountSetting);

                console.log("Loading character list");
                charNameList = [];
                for(var i = 0; i < settings["charcount"]; i++) {
                    charNameList.push(settings["nw_charname" + i]);
                }
                console.log("Found names: " + charNameList);

                charNameList.forEach(function(charName) {
                    console.log("Loading settings for " + charName);

                    var tempCharsSetting;
                    try {
                        tempCharsSetting = JSON.parse(GM_getValue("chars__settings__" + charName, "{}"));
                    } catch (e) {
                        tempCharsSetting = null;
                    }
                    if (!tempCharsSetting) {
                        console.log('Character settings couldn\'t be retrieved, loading defaults.');
                        tempCharsSetting = {};
                    };
                    charSettingsTest[charName] = $.extend(true, {}, defaultCharSettings, tempCharsSetting);
                    charSettingsTest[charName].charName = charName; // for compatibility if charSettingsTest changed to simple array

                    console.log("Loading saved statistics for " + charName);
                    var tempCharsStatistics;
                    try {
                        tempCharsStatistics = JSON.parse(GM_getValue("chars__statistics__" + charName, "{}"));
                    } catch (e) {
                        tempCharsStatistics = null;
                    }
                    if (!tempCharsStatistics) {
                        console.log('Character statistics couldn\'t be retrieved, loading defaults.');
                        tempCharsStatistics = {};
                    };
                    charStatisticsList[charName] = $.extend(true, {}, defaultCharStatistics, tempCharsStatistics);

                })

                updateCounters(false); // updating the UI from saved list
                //if (JSON.stringify(accountSettings) !== GM_getValue("account_settings_" + accountName)) GM_setValue("account_settings_" + accountName, JSON.stringify(accountSettings));
                //if (JSON.stringify(charSettingsTest) !== GM_getValue("chars_settings_" + accountName)) GM_setValue("chars_settings_" + accountName, JSON.stringify(charSettingsTest));                
            }

            // load current character position and values
            charcurrent = GM_getValue("charcurrent", 0);
            for (var i = 0; i < (charSettings.length / settings["charcount"]); i++) {
                j = i + (charcurrent * charSettings.length / settings["charcount"]);
                settings[charSettings[j].name.replace(new RegExp(charcurrent + "$"), '')] = settings[charSettings[j].name];
            }

            var charName = settings["nw_charname"];
            var fullCharName = charName + '@' + accountName;

            if (unsafeWindow.client.getCurrentCharAtName() != fullCharName) {
                loadCharacter(fullCharName);
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
        if (settings["autoexchange"]) {

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
                claimZexOffer();
            }

            // Domino effect: first check if we're out of space for new offers
            if (unsafeWindow.client.dataModel.model.exchangeaccountdata.openorders.length == 5) {
                // Domino effect: then withdraw as much offers as we can and claim the diamonds
                window.setTimeout(cancelZexOffer, delay.SHORT);
            }

            WaitForState("button.closeNotification").done(function() {
                $("button.closeNotification").click();
            });

            unsafeWindow.client.dataModel.loadEntityByName(charname);

        } else {
            console.log("Zen Exchange AD transfer not enabled. Skipping Zex Posting..");
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
        if ($("#settingsButton").length)
            return;
        // Add the required CSS
        AddCss("\
            #settingsButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 0px; top: 0px; padding: 3px; z-index: 1000;}\
            #pauseButton{border-bottom: 1px solid rgb(102, 102, 102); border-right: 1px solid rgb(102, 102, 102); background: none repeat scroll 0% 0% rgb(238, 238, 238); display: block; position: fixed; overflow: auto; right: 23px; top: 0px; padding: 3px; z-index: 1000;}\
            /* MAC-NW -- Put Panel at a higher layer than status window */ \
            #settingsPanel{position: fixed; overflow: auto; right: 0px; top: 0px; width: 600px;max-height:100%;font: 12px sans-serif; text-align: left; display: block; z-index: 1001;}\
            #settings_title{font-weight: bolder; background: none repeat scroll 0% 0% rgb(204, 204, 204); border-bottom: 1px solid rgb(102, 102, 102); padding: 3px;}\
            #settingsPanelButtonContainer {background: none repeat scroll 0% 0% rgb(204, 204, 204); border-top: 1px solid rgb(102, 102, 102);padding: 3px;text-align:center} \
            #settingsPanel label.purple {font-weight:bold;color:#7C37F6}\
            #settingsPanel label.blue {font-weight:bold;color:#007EFF}\
            #settingsPanel label.green {font-weight:bold;color:#8AFF00}\
            #settingsPanel label.white {font-weight:bold;color:#FFFFFF}\
            #charPanel {width:98%;max-height:550px;overflow:auto;display:block;padding:3px;}\
            #charPanel div div ul li { display: inline-block; width: 48%; }\
            .inventory-container {float: left; clear: none; width: 270px; margin-right: 20px;}\
            #prinfopane {position: fixed; top: 5px; left: 200px; display: block; z-index: 1000;}\
            .prh3 {padding: 5px; height: auto!important; width: auto!important; background-color: rgba(0, 0, 0, 0.7);}\
            .custom-radio{width:16px;height:16px;display:inline-block;position:relative;z-index:1;top:3px;background-color:#fff;margin:0 4px 0 2px;}\
            .custom-radio:hover{background-color:black;} .custom-radio.selected{background-color:red;} .custom-radio-selected-text{color:darkred;font-weight:500;}\
            .custom-radio input[type='radio']{margin:1px;position:absolute;z-index:2;cursor:pointer;outline:none;opacity:0;_nofocusline:expression(this.hideFocus=true);-ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=0);filter:alpha(opacity=0);-khtml-opacity:0;-moz-opacity:0}\
            #settingsPanel input[type='button'].button-green,#settingsPanel input[type='button'].button-red,#settingsPanel input[type='button'].button-yellow,#settingsPanel input[type='button'].button-blue{color:#eff;border-radius:4px;text-shadow:0 1px 1px rgba(0,0,0,0.2);font-size:110%;font-weight:bold;}\
            .pure-button{display:inline-block;*display:inline;zoom:1;line-height:normal;white-space:nowrap;vertical-align:baseline;text-align:center;cursor:pointer;-webkit-user-drag:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.pure-button::-moz-focus-inner{padding:0;border:0}.pure-button{font-family:inherit;font-size:100%;*font-size:90%;*overflow:visible;padding:.5em 1em;color:#444;color:rgba(0,0,0,.8);*color:#444;border:1px solid #999;border:0 rgba(0,0,0,0);background-color:#E6E6E6;text-decoration:none;border-radius:2px}.pure-button-hover,.pure-button:hover,.pure-button:focus{filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#00000000', endColorstr='#1a000000', GradientType=0);background-image:-webkit-gradient(linear,0 0,0 100%,from(transparent),color-stop(40%,rgba(0,0,0,.05)),to(rgba(0,0,0,.1)));background-image:-webkit-linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));background-image:-moz-linear-gradient(top,rgba(0,0,0,.05) 0,rgba(0,0,0,.1));background-image:-o-linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1));background-image:linear-gradient(transparent,rgba(0,0,0,.05) 40%,rgba(0,0,0,.1))}.pure-button:focus{outline:0}.pure-button-active,.pure-button:active{box-shadow:0 0 0 1px rgba(0,0,0,.15) inset,0 0 6px rgba(0,0,0,.2) inset}.pure-button[disabled],.pure-button-disabled,.pure-button-disabled:hover,.pure-button-disabled:focus,.pure-button-disabled:active{border:0;background-image:none;filter:progid:DXImageTransform.Microsoft.gradient(enabled=false);filter:alpha(opacity=40);-khtml-opacity:.4;-moz-opacity:.4;opacity:.4;cursor:not-allowed;box-shadow:none}.pure-button-hidden{display:none}.pure-button::-moz-focus-inner{padding:0;border:0}.pure-button-primary,.pure-button-selected,a.pure-button-primary,a.pure-button-selected{background-color:#0078e7;color:#fff}\
            #settingsPanel input[type='button'].button-green{background:#1cb841; margin: 2px 20px 2px 2px;}\
            #settingsPanel input[type='button'].button-red{background:#ca3c3c; margin: 2px 2px 2px 2px;}\
            #settingsPanel input[type='button'].button-yellow{background:#df7514; margin: 2px 2px 2px 2px;}\
            #settingsPanel input[type='button'].button-blue{background:#42b8dd; margin: 2px 2px 2px 2px;}\
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
            table.professionLevels td.rotate, table.professionLevels th.rotate { height: 100px; } \
            table.professionLevels td.rotate, table.professionLevels th.rotate > div { transform: translate(0, 30px) rotate(290deg); width: 30px; } \
            table.professionLevels td.rotate, table.professionLevels th.rotate > div > span { border-bottom: 1px solid #ccc; padding: 5px 10px; } \
            ");

        // Add settings panel to page body
        $("body").append(
            '<div id="settingsPanel" class="ui-widget-content">\
            <div id="settings_title">\
            <img src=' + image_prefs + ' style="float: left; vertical-align: text-bottom;"\>\
            <img id="settings_close" src=' + image_close + ' title="Click to hide preferences" style="float: right; vertical-align: text-bottom; cursor: pointer; display: block;"\>\
            <span style="margin:3px">Settings</span>\
            </div>\
            <form style="margin: 0px; padding: 0px">\
            <div id="main_tabs">\
            <ul style="background:none;border:none;border-bottom:1px solid #aed0ea;padding:0;">\
            </ul>\
            </div>\
            </form>\
            </div>');

        $("div#main_tabs").tabs();
        var tabs = {
            main: 'General settings',
            prof: 'Professions',
            vend: 'Vendor options',
            bank: 'AD Consolidation'
        };
        for (var key in tabs) {
            var tabs_num = $("div#main_tabs > ul > li").length + 1;
            $("div#main_tabs > ul").append(
                "<li><a href='#main_tab" + tabs_num + "'>" + tabs[key] + "</a></li>");

            var tab = $("<div id='main_tab" + tabs_num + "'></div>");
            $("div#main_tabs").append(tab);

            // Add each setting input
            var settingsList = $('<ul style="list-style: none outside none; min-height: 300px; max-height: 500px; overflow: auto; margin: 3px; padding: 0px;"></ul>');
            var settingListToAdd = settingnames.filter(function(element) {
                return (element.pane == key);
            });

            for (var i = 0; i < settingListToAdd.length; i++) {
                var id = 'settings_' + settingListToAdd[i].name;
                var indent = (countLeadingSpaces(settingListToAdd[i].title) >= 1) ? 1 : 0;
                /*if ((settingnames[i].type == 'text' && settingnames[i-1].type == 'checkbox') || (settingnames[i-1] && settingnames[i].type == 'checkbox' && settingnames[i-1].type == 'text'))
                settingsList.append('<li style="margin-left:0em; width: 48%; display: inline-block;"/>&nbsp;</li>')*/
                var border = "";
                if (settingListToAdd[i].border)
                    border = "border-top: #000 solid 1px;"
                switch (settingListToAdd[i].type) {
                    case "checkbox":
                        var _checkWidth = "48%";
                        /*
                            if (i < 9)
                            _checkWidth = "31%";
                             */
                        if (settingListToAdd[i].border)
                            _checkWidth = "98%";
                        settingsList.append('<li title="' + settingListToAdd[i].tooltip + '" style="' + border + 'padding-left:' + indent + 'em; width: ' + _checkWidth + '; display: inline-block;"><input style="margin:4px" name="' + id + '" id="' + id + '" type="checkbox" /><label class="' + settingListToAdd[i].class + '" for="' + id + '">' + settingListToAdd[i].title + '</label></li>')
                        settingsList.find('#' + id).prop('checked', settings[settingListToAdd[i].name]);
                        break;
                    case "text":
                        if (settingListToAdd[i].border)
                            _inputkWidth = "95%; padding: 10px 0";
                        else
                            _inputkWidth = "46%";
                        settingsList.append('<li title="' + settingListToAdd[i].tooltip + '" style="' + border + 'padding-left:' + indent + 'em; margin-top:1em; width: ' + _inputkWidth + '; display: inline-block;"<label class="' + settingListToAdd[i].class + '" for="' + id + '">' + settingListToAdd[i].title + '</label><input style="margin:4px; padding: 2px; min-width: 80%;" name="' + id + '" id="' + id + '" type="text" /></li>')
                        settingsList.find('#' + id).val(settings[settingListToAdd[i].name]);
                        break;
                    case "password":
                        settingsList.append('<li title="' + settingListToAdd[i].tooltip + '" style="' + border + 'padding-left:' + indent + 'em; margin-top:1em; width: 46%; display: inline-block;"' + settingListToAdd[i].class + '" for="' + id + '">' + settingListToAdd[i].title + '</label><input style="margin:4px; padding: 2px; min-width: 80%;" name="' + id + '" id="' + id + '" type="password" /></li>')
                        settingsList.find('#' + id).val(settings[settingListToAdd[i].name]);
                        break;
                    case "select":
                        var li = $('<li title="' + settingListToAdd[i].tooltip + '" style="' + border + 'padding-left:' + indent + 'em; width: 48%; display: inline-block;"' + settingListToAdd[i].class + '" style="padding-left:4px" for="' + id + '">' + settingListToAdd[i].title + '</label></li>');
                        var select = $('<select style="margin:4px" name="' + id + '" id="' + id + '" />');
                        var options = settingListToAdd[i].opts;
                        for (var j = 0; j < options.length; j++) {
                            if (settings[settingListToAdd[i].name] == options[j].path)
                                select.append('<option value="' + options[j].path + '" selected="selected">' + options[j].name + '</option>');
                            else
                                select.append('<option value="' + options[j].path + '">' + options[j].name + '</option>');
                        }
                        li.append(select);
                        settingsList.append(li);
                        break;
                    case "label":
                        settingsList.append('<li title="' + settingListToAdd[i].tooltip + '" style="' + border + 'margin-left:' + indent + 'em;><label class="' + settingListToAdd[i].class + '">' + settingListToAdd[i].title + '</label></li>')
                        break;
                }
            }
            $(tab).append(settingsList);
        };

        var tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Other</a></li>");
        var tab = $("<div id='main_tab" + tabs_num + "'><div id='other'>will also delete character names <br /><button id='reset_settings_btn'>Reset ALL Settings</button><br />Should be used after login only, and can reset all characters<br /><button id='load_names_btn'>Load Names</button></div></div>");
        $("div#main_tabs").append(tab);

        $('#reset_settings_btn').button();
        $('#reset_settings_btn').click(function() {
            var keys = GM_listValues();
            for (i = 0; i < keys.length; i++) {
                var key = keys[i];
                GM_deleteValue(key);
            }
            window.setTimeout(function() {
                unsafeWindow.location.href = current_Gateway;
            }, delay.MINS);
        });

        $('#load_names_btn').button();
        $('#load_names_btn').click(function() {
            GM_setValue("charcount", charNameList.length);
            charNameList.forEach(function(name, i) {
                GM_setValue("nw_charname" + i, name);
            })
            window.setTimeout(function() {
                unsafeWindow.location.href = current_Gateway;
            }, delay.MINS);
        });


        var tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Refine Counters</a></li>");
        var tab = $("<div id='main_tab" + tabs_num + "'><div id='rcounters'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);

        tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Workers</a></li>");
        tab = $("<div id='main_tab" + tabs_num + "'><div id='worker_overview'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);

        tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Tools</a></li>");
        tab = $("<div id='main_tab" + tabs_num + "'><div id='tools_overview'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);

        tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Resource Tracker</a></li>");
        tab = $("<div id='main_tab" + tabs_num + "'><div id='resource_tracker'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);

        tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Prof levels</a></li>");
        tab = $("<div id='main_tab" + tabs_num + "'><div id='profession_levels'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);

        tabs_num = $("div#main_tabs > ul > li").length + 1;
        $("div#main_tabs > ul").append("<li><a href='#main_tab" + tabs_num + "'>Slots</a></li>");
        tab = $("<div id='main_tab" + tabs_num + "'><div id='slot_tracker'>Loaded on login.</div></div>");
        $("div#main_tabs").append(tab);


        $("div#main_tabs").tabs("refresh");
        $("div#main_tabs").tabs("option", "active", 0);

        // Add character settings for each char


        var addText = '<div id="charSettingsAccordion">';
        for (var i = 0; i < settings["charcount"]; i++) {

            addText += [
                '<h3>' + settings["nw_charname" + i] + '</h3>',
                '<div id="charContainer' + i + '">',
            ].join('');

            var k = 0 + (i * charSettings.length / settings["charcount"]);
            var id = 'settings_' + charSettings[k].name;
            addText += '<span title="' + charSettings[k].tooltip + '"><input style="margin:4px; padding: 2px;" name="' + id + '" id="' + id + '" type="text" /></span>';

            addText += [
                '<div class="charSettingsTabs">',
                '<ul>',
                '<li><a href="#charSettingsTab-1-' + i + '">Tasks</a></li>',
                '<li><a href="#charSettingsTab-2-' + i + '">Manual Task Settings</a></li>',
                '<li><a href="#charSettingsTab-3-' + i + '">Char Settings</a></li>',
                '</ul>',
                '<div id="charSettingsTab-1-' + i + '" class="charSettingsTab">',
                '<table><thead><tr><th>Task name</th><th># of slots</th><th>profile</th><th>priority</th></tr></thead><tbody>'
            ].join('');

            // tasks
            setPerChar = (charSettings.length / settings["charcount"]);
            charTaskSettings = charSettings.slice(i * setPerChar, (i + 1) * setPerChar).filter(function(element) {
                return element.pane == 'tasks';
            });
            var k = 0;
            while (k < (charTaskSettings.length)) {
                if (charTaskSettings[k].type2 == 'task') {
                    addText += '<tr>';
                }
                do {
                    id = 'settings_' + charTaskSettings[k].name;
                    switch (charTaskSettings[k].type) {
                        case "checkbox":
                            continue;
                            break;
                        case "text":
                            addText += '<td>';
                            addText += '<label style=" overflow:hidden; min-width: 100px; display: inline-block; " class="' + charTaskSettings[k].class + '" for="' + id + '">' + charTaskSettings[k].title + '</label>';
                            addText += '</td><td><input maxlength="2" size="1" style="margin: 4px; padding: 2px;" name="' + id + '" id="' + id + '" type="text" /></td>';
                            break;
                        case "select":
                            addText += '<td><select style="margin: 4px; padding: 2px;" name="' + id + '" id="' + id + '">';
                            charTaskSettings[k].options.forEach(function(option) {
                                addText += '<option value = "' + option.value + '" ' + ((settings[charTaskSettings[k].name] == option.value) ? ' selected="selected" ' : '') + '>' + option.name + '</option>';
                            });
                            addText += '</select></td>';
                            break;
                        case "label":
                            break;
                        default:
                            break;

                    }
                    k++;
                } while (k < charTaskSettings.length && (charTaskSettings[k].type2 != 'task'));
                addText += '</tr>';
            }
            addText += '</tbody></table>\
                            </div>';

            // Manual Slots allocation tab
            addText += '<div id="charSettingsTab-2-' + i + '" class="charSettingsTab" >';
            addText += '<input type="checkbox" name="settings__char__' + i + '__tasksOverride" /><label> Use advanced slot allocations -- NOT FULLY IMPLEMENTED YET </label>';
            addText += '<table><thead><tr><th>Slot #</th><th>Profession</th><th>Profile</th><th>fill assets</th></tr></thead><tbody>';

            for (var m = 1; m <= 9; m++) {
                addText += '<tr>';
                addText += '<td>' + m + '.</td>';
                var _id = 'settings__char__' + i + '__slot__' + m;
                var _attrib = '';
                addText += '<td><select class="taskSelectA" style="margin: 4px; padding: 2px;" name="' + _id + '__profession" id="' + _id + '__profession">';
                tasklist.forEach(function(task) {
                    addText += '<option value="' + task.taskListName + '">' + task.taskListName + '</option>';
                })
                addText += '</select></td>';
                addText += '<td><select class="" style="margin: 4px; padding: 2px;" name="' + _id + '__profession__profile" id="' + _id + '__profession__profile"></select></td>';
                addText += '<td><select class="" style="margin: 4px; padding: 2px;" name="' + _id + '__profession__assets" id="' + _id + '__profession__assets">';
                $.each(charSlotsFillAssetsOptions, function(index, value) {
                    addText += '<option value="' + index + '">' + value + '</option>';
                });
                addText += '</select></td>';
                addText += '</tr>';
            }
            addText += '</tbody></table></div>';


            // Settings Tab
            addText += '<div id="charSettingsTab-3-' + i + '" class="charSettingsTab" >';
            setPerChar = (charSettings.length / settings["charcount"]);
            charTaskSettings = charSettings.slice(i * setPerChar, (i + 1) * setPerChar).filter(function(element) {
                return element.pane == 'settings';
            });

            for (var k = 0; k < (charTaskSettings.length); k++) {
                id = 'settings_' + charTaskSettings[k].name;
                switch (charTaskSettings[k].type) {
                    case "checkbox":
                        continue;
                        break;
                    case "text":
                        addText += '<li><label style=" overflow:hidden; min-width: 100px; display: inline-block; " class="' + charTaskSettings[k].class + '" for="' + id + '">' + charTaskSettings[k].title + '</label>';
                        addText += '<input maxlength="2" size="1" style="margin: 4px; padding: 2px;" name="' + id + '" id="' + id + '" type="text" /></li>';
                        break;
                    case "select":
                        addText += '<li><label style=" overflow:hidden; min-width: 100px; display: inline-block; " class="' + charTaskSettings[k].class + '" for="' + id + '">' + charTaskSettings[k].title + '</label>';
                        addText += '<select style="margin: 4px; padding: 2px;" name="' + id + '" id="' + id + '">';
                        charTaskSettings[k].options.forEach(function(option) {
                            addText += '<option value = "' + option.value + '" ' + ((settings[charTaskSettings[k].name] == option.value) ? ' selected="selected" ' : '') + '>' + option.name + '</option>';
                        });
                        addText += '</select></li>';
                        break;
                    case "label":
                        break;
                    default:
                        break;

                }
            }
            addText += '</ul></div>'; // settings tab ';

            addText += '</div>'; // charSettingsTabs
            addText += '</div>'; // charContainer
        }
        addText += '\
                    </div>\
                ';
        $("#settingsPanel form").append(addText);


        // Set up the advanced slot selects 
        $(".taskSelectA").change(function(e) {
            var _taskname = $(this).val();
            var _profiles = tasklist.filter(function(task) {
                return task.taskListName == _taskname;
            })[0].profiles.filter(function(profile) {
                return profile.isProfileActive
            });

            var _options = "";
            //tasklist[" .profiles.forEach( function(profile) { if (profile.isProfileActive) profileNames.push({name: profile.profileName, value: profile.profileName}); } ); 

            var profileSelect = $("#" + this.id + "__profile").html("");
            _profiles.forEach(function(profile) {
                profileSelect.append($("<option />").val(profile.profileName).text(profile.profileName));
            });
        });
        $(".taskSelectA").change();


        // Add values to character input fields
        for (var i = 0; i < charSettings.length; i++) {
            var id = 'settings_' + charSettings[i].name;
            $('#' + id).val(settings[charSettings[i].name]);
        }

        // Add save/cancel buttons to panel
        $("#settingsPanel form").append('\
            <div id="settingsPanelButtonContainer">\
            <input id="settings_save" class="button-blue pure-button" type="button" value="Save and Apply">\
            <input id="settings_close" class="button-yellow pure-button" type="button" value="Close">\
            <input id="settings_sca" class="button-red pure-button" type="button" value="Cycle SCA">\
            </div>');

        $(function() {
            $("#charSettingsAccordion").accordion({
                heightStyle: "content",
                autoHeight: false,
                clearStyle: true,
                active: false,
                collapsible: true,
            });
            $(".charSettingsTabs").tabs();
        });

        // Add open settings button to page
        $("body").append('<div id="settingsButton"><img src="' + image_prefs + '" title="Click to show preferences" style="cursor: pointer; display: block;"></div>');

        // Add pause button to page
        $("body").append('<div id="pauseButton"><img src="' + (settings["paused"] ? image_play : image_pause) + '" title="Click to ' + (settings["paused"] ? "resume" : "pause") + ' task script" style="cursor: pointer; display: block;"></div>');

        // Add info pane
        $("body").append("<div id='prinfopane' class='header-newrelease'>");

        // Add the javascript
        $("#settingsPanel").hide();
        $("#settingsButton").click(function() {
            $("#settingsButton").hide();
            $("#pauseButton").hide();
            $("#settingsPanel").show();
        });
        $("#settings_close,settings_cancel").click(function() {
            $("#settingsButton").show();
            $("#pauseButton").show();
            $("#settingsPanel").hide();
        });
        $("#pauseButton").click(PauseSettings);

        // Use setTimeout to workaround permission issues when calling GM functions from main window
        $("#settings_save").click(function() {
            setTimeout(function() {
                SaveSettings();
            }, 0)
        });
        $("#settings_sca").click(function() {
            $("#settings_close").trigger("click");
            unsafeWindow.location.hash = unsafeWindow.location.hash.replace(/\)\/.+/, ')' + "/adventures");
            processSwordCoastDailies();
        });

        $('#update-content-inventory-bags-0 .bag-header').waitUntilExists(function() {
            if ($('#update-content-inventory-bags-0 .bag-header div').length && !$('#update-content-inventory-bags-0 .bag-header div.autovendor').length) {
                $('#update-content-inventory-bags-0 .bag-header').append('<div class="input-field button light autovendor"><div class="input-bg-left"></div><div class="input-bg-mid"></div><div class="input-bg-right"></div><button id="nwprofs-autovendor">Auto Vendor</button></div>');
                $("button#nwprofs-autovendor").on("click", vendorJunk);
            }
        });
    }

    function PauseSettings(_action) {
        if (_action != "pause" || _action != "unpause")
            _action = "toggle";
        if (_action == "toggle")
            settings["paused"] = !settings["paused"];
        if (_action == "pause")
            settings["paused"] = true;
        if (_action == "unpause")
            settings["paused"] = false;
        setTimeout(function() {
            GM_setValue("paused", settings["paused"]);
        }, 0);
        $("#settings_paused").prop("checked", settings["paused"]);
        $("#pauseButton img").attr("src", (settings["paused"] ? image_play : image_pause));
        $("#pauseButton img").attr("title", "Click to " + (settings["paused"] ? "resume" : "pause") + " task script");
    }

    function SaveSettings() {
        var charcount = settings["charcount"];

        // Delete all saved settings
        var keys = GM_listValues();
        for (i = 0; i < keys.length; i++) {
            var key = keys[i];
            GM_deleteValue(key);
        }

        // Get each value from the UI
        for (var i = 0; i < settingnames.length; i++) {
            var name = settingnames[i].name;
            var el = $('#settings_' + name);
            var value = false;
            switch (settingnames[i].type) {
                case "checkbox":
                    value = el.prop("checked");
                    break;
                case "text":
                    value = el.val();
                    break;
                case "password":
                    value = el.val();
                    break;
                case "select":
                    value = el.val();
                    break;
                case "label": // Labels don't have values
                    continue;
            }
            if (typeof(settingnames[i].onsave) === "function") {
                console.log("Calling 'onsave' for", name);
                settingnames[i].onsave(value, settings[name]);
            }
            // Save to local cache
            if (settings[name] !== value) {
                settings[name] = value;
            }
            // Save to GM cache
            GM_setValue(name, value);
        }

        // Get character settings from UI
        for (var i = 0; i < charSettings.length; i++) {
            if (charSettings[i].type == 'void') {
                continue;
            }
            var name = charSettings[i].name;
            var el = $('#settings_' + name);
            var value = el.val();
            // Save to local cache
            if (settings[name] !== value) {
                settings[name] = value;
            }
            // Save to GM cache
            GM_setValue(name, value);
        }

        // If character numbers have changed reload page
        if (charcount != settings["charcount"]) {
            console.log("Reloading gateway to update character count");
            unsafeWindow.location.href = current_Gateway; // edited by RottenMind
            return;
        }

        // Close the panel
        $("#settingsButton").show();
        $("#pauseButton img").attr("src", (settings["paused"] ? image_play : image_pause));
        $("#pauseButton img").attr("title", "Click to " + (settings["paused"] ? "resume" : "pause") + " task script");
        $("#pauseButton").show();
        $("#settingsPanel").hide();
    }

    function updateCounters(reset) {

        function formatNum(num) {
            if ((num / 1000000) > 1)
                return ((num / 1000000).toFixed(1) + 'm');
            if ((num / 1000) > 1)
                return ((num / 1000).toFixed(1) + 'k');
            return Math.floor(num);
        }

        var total = 0;
        var html = '<table>';
        html += "<tr><th>Character Name</th><th>#slots</th><th>R.Counter</th><th>~rad/h</th>";
        html += "<th>RAD</th><th>AD</th><th>gold</th><th>rBI</th><th>BI</th><th>R.today<th></th><th>R.left</th></tr>";

        if (reset) {
            charNameList.forEach(function(charName) {
                charStatisticsList[charName].general.refineCounter = 0;
                charStatisticsList[charName].general.refineCounterReset = Date.now();
            });
        };

        charNameList.forEach(function(charName) {
            var counterTime = (Date.now() - charStatisticsList[charName].general.refineCounterReset) / 1000 / 60 / 60; // in hours.
            var radh = 0;
            if (counterTime > 0) radh = charStatisticsList[charName].general.refineCounter / counterTime;

            total += charStatisticsList[charName].general.refineCounter;

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
            html += "<td>" + formatNum(charStatisticsList[charName].general.refined) + "</td>";
            html += "<td>" + formatNum(charStatisticsList[charName].general.refineLimitLeft) + "</td>";
            html += "</tr>";
        });
        html += "</table>";
        html += "<div style='margin: 5px 0;'> Total refined: " + total + "</div>";
        html += "<button>Reset Refined Counter</button>";
        $('#rcounters').html(html);

        $('#rcounters button').button();
        $('#rcounters button').click(function() {
            updateCounters(true);
        });

        // Worker tab update.
        html = '<table class="professionRanks">';
        var temp = "";
        html += "<tr><th>Char name</th>";
        var options = "";
        var workerTabSelects = ["Leadership", "Alchemy", "Leadership"];
        $.each(charStatisticsList[charNameList[0]].professions, function(profession) {
            options += "<option value='" + profession + "'>" + profession + "</option>";
        })

        for (var i = 0; i < 3; i++) {
            //saving current select values
            if ($('#setting__worker__tab__p' + i).val()) workerTabSelects[i] = $('#setting__worker__tab__p' + i).val();
            html += "<th colspan=6>" + "<select name='setting__worker__tab__p" + i + "' id='setting__worker__tab__p" + i + "'>" + options + "</select></th>";
            temp += "<th>p</th><th>b</th><th>g</th><th>t3</th><th>t2</th><th>t1</th>";
        }
        html += "</tr><tr><th></th>" + temp + "</tr>";
        charNameList.forEach(function(charName) {
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
                updateCounters(false);
            });
        }

        // Tools tab update.
        html = '<table class="professionRanks">';
        var temp = "";
        html += "<tr><th>Char name</th>";
        var options = "";
        var toolsTabSelects = ["Crucible", "Mortar", "Philosophersstone", "Graver"];
        $.each(charStatisticsList[charNameList[0]].tools, function(tool) {
            options += "<option value='" + tool + "'>" + tool + "</option>";
        })

        for (var i = 0; i < 4; i++) {
            //saving current select values
            if ($('#setting__tools__tab__p' + i).val()) toolsTabSelects[i] = $('#setting__tools__tab__p' + i).val();
            html += "<th colspan=4>" + "<select name='setting__tools__tab__p" + i + "' id='setting__tools__tab__p" + i + "'>" + options + "</select></th>";
            temp += "<th>p</th><th>b</th><th>g</th><th>w</th>";
        }
        html += "</tr><tr><th></th>" + temp + "</tr>";
        charNameList.forEach(function(charName) {
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
                updateCounters(false);
            });
        }


        // Resource tracker update.
        html = '<table><tr><th>Character Name</th>';
        trackResources.forEach(function(item) {
            html += "<th>" + item.fname + "</th>";
        })
        html += '</tr>';
        charNameList.forEach(function(charName) {
            html += '<tr><td>' + charName + '</td>';
            charStatisticsList[charName].trackedResources.forEach(function(count) {
                html += '<td>' + count + '</td>';
            })
            html += '</tr>';
        })
        html += "</table>";
        $('#resource_tracker').html(html);


        // 'profession_levels' tab
        html = '<table class="professionLevels">';
        html += "<tr><th class='rotate'><div><span>Character Name</div></span></th>";
        html += "<th class='rotate'><div><span>#slots</div></span></th>";
        $.each(charStatisticsList[charNameList[0]].professions, function(profession) {
            html += "<th class='rotate'><div><span>" + profession + "</div></span></th>";
        });
        html += "</tr>";
        charNameList.forEach(function(charName) {
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

        charNameList.forEach(function(charName) {
            html += "<tr>";
            html += "<td>" + charName + "</td>";
            for (var i = 0; i < 9; i++) {
                html += "<td>" + $.trim(charStatisticsList[charName].slotUse[i]).substring(0, 3) + " </td>";
            }
            html += "</tr>";
        });
        html += "</table>";
        $('#slot_tracker').html(html);


    }

    function vendorJunk(evnt) {
        var _vendorItems = [];
        var _sellCount = 0;
        if (settings["autovendor_kits_altars_limit"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Consumable_Skill/,
                limit: 50
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Portable_Altar$/,
                limit: 80
            };
        }
        if (settings["autovendor_kits_all"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Consumable_Skill/,
                limit: 0
            };
        }
        if (settings["autovendor_altars_all"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Item_Portable_Altar$/,
                limit: 0
            };
        }
        if (settings["autovendor_rank1"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T1_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T1_Runestone/,
                limit: 0
            };
        }
        if (settings["autovendor_rank2"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T2_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T2_Runestone/,
                limit: 0
            };
        }
        if (settings["autovendor_rank3"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^T3_Enchantment/,
                limit: 0
            };
            _vendorItems[_vendorItems.length] = {
                pattern: /^T3_Runestone/,
                limit: 0
            };
        }
        if (settings["autovendor_pots1"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)$/,
                limit: 0
            };
        }
        if (settings["autovendor_pots2"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_2$/,
                limit: 0
            };
        }
        if (settings["autovendor_pots3"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_3$/,
                limit: 0
            };
        }
        if (settings["autovendor_pots4"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Potion_(Healing|Tidespan|Force|Fortification|Reflexes|Accuracy|Rejuvenation)_4$/,
                limit: 0
            };
        }
        if (settings["autovendor_junk"]) {
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
                pattern: /_Green_T[1-5]_Unid$/,
                limit: 0
            }; // Unidentified Green Gear
        }
        // edited by RottenMind
        if (settings["autovendor_profresults"]) {
            _vendorItems[_vendorItems.length] = {
                pattern: /^Crafted_(Jewelcrafting_Waist_Offense_3|Jewelcrafting_Neck_Defense_3|Jewelcrafting_Waist_Defense_3|Med_Armorsmithing_T3_Chain_Armor_Set_1|Med_Armorsmithing_T3_Chain_Pants2|Med_Armorsmithing_T3_Chain_Shirt2|Med_Armorsmithing_T3_Chain_Helm_Set_1|Med_Armorsmithing_T3_Chain_Pants|Med_Armorsmithing_T3_Chain_Boots_Set_1|Hvy_Armorsmithing_T3_Plate_Armor_Set_1|Hvy_Armorsmithing_T3_Plate_Pants2|Hvy_Armorsmithing_T3_Plate_Shirt2|Hvy_Armorsmithing_T3_Plate_Helm_Set_1|Hvy_Armorsmithing_T3_Plate_Boots_Set_1|Leatherworking_T3_Leather_Armor_Set_1|Leatherworking_T3_Leather_Pants2|Leatherworking_T3_Leather_Shirt2|Leatherworking_T3_Leather_Helm_Set_1|Leatherworking_T3_Leather_Boots_Set_1|Tailoring_T3_Cloth_Armor_Set_3|Tailoring_T3_Cloth_Armor_Set_2|Tailoring_T3_Cloth_Armor_Set_1|Tailoring_T3_Cloth_Pants2_Set2|Tailoring_T3_Cloth_Shirt2|Tailoring_T3_Cloth_Helm_Set_1|Artificing_T3_Pactblade_Temptation_5|Artificing_T3_Icon_Virtuous_5|Weaponsmithing_T3_Dagger_4)$/,
                limit: 0
            };
        }
        // edited by RottenMind
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
