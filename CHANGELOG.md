RELEASE NOTES
=============

4.8
- Added selection for optional assets and support for the Forgehammer of Gond.

4.7.13
- Corrected Winterevent and Artificing profiles.

4.7.12
- Added crafted rank 3 pants to the vendor list.

4.7.11
- Fixed "Mass Silver & Yellow Vitriol", "Mass Red & Emerald Vitriol", and "Mass Orange & Purple Vitriol" in Alchemy.

4.7.10
- Added "Mass Silver & Yellow Vitriol", "Mass Red & Emerald Vitriol", and "Mass Orange & Purple Vitriol" to Alchemy.

4.7.9
- Added "Silver & Yellow Vitriol", "Red & Emerald Vitriol", and "Orange & Purple Vitriol" to Alchemy.

4.7.8
- Added all the different color Vitriol to the default tracked resources. (Click the "Reset to default" button under the "Tracked resources" tab to see the changes.)

4.7.7
- Rearranged default tracked resources. (Click the "Reset to default" button under the "Tracked resources" tab to see the changes.)

4.7.4
- Replaced "RP & Coffer" with "RP Coffer" in Leadership.
- Added "RP Double Coffer" to Leadership.

4.7.3
- Replaced "Boxes" with "RP & Coffer" in Leadership.

4.7.2
- Added the tracked resource totals at the top of the list instead of at the bottom.

4.7.1
- Rearranged default tracked resources. (Click the "Reset to default" button under the "Tracked resources" tab to see the changes.)

4.7
---
- Settings reset to defaults.
- Added a lot of default tracked resources.
- Added "Distilled Potion of Superior Healing" to Alchemy.
- Added "RP (Stacked Assets)" to Leadership.

4.6
---
- Removed AD profiles from leadership.
- Added rare leadership task "Capture Bandit Leader".
- Will now choose leadership assets based on speed first if spread leadership asset allocation is disabled.

4.5
---
- Added option to vendor Unidentified Items.

4.4.10
---
- Added option to vendor superior potions.
- Made RP the default Leadership profile.

4.4.9
---
- Added Leadership RP profile that focuses on Resonant Bags, Artifact Paraphenalia, and Thaumaturgic Bags instead of Enchanted Coffers.

4.4.8
---
- Updated the Leadership RP Boxes profile to prioritise for Resonant Bags, Enchanted Coffers, and Artifact Paraphenalia.

4.4.7
---
- Updated the Leadership RP Boxes profile to focus on XP until level 24, and then go for Resonant Bags, Thaumaturgic Bags, and Enchanted Coffers.

4.4.6
---
- Added option to vendor Lesser Marks.

4.4.5
---
- Added bound items to the potion and portable alter vendor lists.

4.4.4
---
- Added option to vendor Invocation Blessings

4.4.3
---
- Added Ardent Coins to the Resource Tracker

4.4.2
---
- Added option to auto vendor enchants & runes Rank 4

4.4.1
---
- Fixed Black Ice Shaping

4.4
---
- Added leadership manual mode
- Now vendors all unstable potions
- Added a tab with weekly refine history
- Added resource totals line
- Added alchemy mass refining

4.3
---
- Pause script on GUARD page
- Track celestial coins as well
- Add Summer Event profession
- Add 'stop at lvl' opttion for each profession
- Inactive characters are now greyed out

4.2
---
- Added "Resource Tracker" tab
- Added "to buy" notification for missing resources
- Added new professions & some hotfixes for some profiles
- New profile syntax
- addProfile() functionality changed a bit to adapt to our new profile syntax
- A lot of fixes here and there

4.1
---
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
---
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

3.1
---
- A lot of backend changes
- Added mass refining profiles for some professions
- Logic change at how we add new profession profiles
- Added autovendor option for major potions

3.0
---
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
----------
- Fix broken ZEX Domino effect logic
- Really really really fix that tabmenu padding

2.1
---
- Professions profiles related fixes by dlebedynskyi
- Mailsmithing stuck fix by dlebedynskyi
- Create a claimZexOffer() function that withdraws already canceled orders
- Now withdrawZexOffer() also calls claimZexOffer()
- Implement ZEX "Domino effect" by Rotten_mind's idea (there's still room for improvement here)
- Always withdrawZexOffer() before posting an offer

2.0
---
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
