This will contain most Newervinter profession tasknames + task, rares are mostly incompleted so add them in Greasyfork,
https://greasyfork.org/scripts/7061
 
List is based http://pastebin.com/VaGntEha great list so THX to him or her...
var taskNameMap = { // 7.3.2015 may change without notice
    Leadership : {
        Leadership_Tier0_Intro_1 : "Hire your first Mercenary",
        Leadership_Tier0_Intro_2 : "Basic Training",
        Leadership_Tier0_Intro_3 : "Pick Up Package",
        Leadership_Tier0_Intro_4 : "Protect Grateful Merchant",
        Leadership_Tier0_Intro_5 : "Complete Advanced Training",
        Leadership_Tier1_Feedtheneedy : "Feed the Needy",
        Leadership_Tier1_2_Recruit_Emergency : "Emergency Hire",
        Leadership_Tier1_2_Guardduty : "Guard Duty",
        Leadership_Tier1_2_Training : "Martial Training",
        Leadership_Tier1_2_Recruit : "Hire a Mercenary",
        Leadership_Tier1_3_Scout : "Scout Area",
        Leadership_Tier1_4_Protect : "Protect Caravan",
        Leadership_Tier1_5_Explore : "Explore Local Area",
        Leadership_Tier1_6_Survey : "Survery Terrain",
        Leadership_Tier2_7_Raid : "Raid Enemy Supply Depot",
        Leadership_Tier2_7_Training : "Tactical Training",
        Leadership_Tier2_7_Recruit : "Train a Guard",
        Leadership_Tier2_8_Protect : "Protect Market",
        Leadership_Tier2_9_Chart : "Chart Region",
        Leadership_Tier2_10_Battle : "Battle Undead",
        Leadership_Tier2_11_Collect : "Collect Goods from Market",
        Leadership_Tier2_12_Taxes : "Collect Taxes",
        Leadership_Tier3_13_Patrol : "Patrol the Mines",
        Leadership_Tier3_13_Recruit : "Train Footman",
        Leadership_Tier3_13_Training : "War Games Training",
        Leadership_Tier3_14_Assemble : "Assemble Maps",
        Leadership_Tier3_15_Rescue : "Rescue Prisoners",
        Leadership_Tier3_15_Recruit_Rare : "Train an Adventurer",
        Leadership_Tier3_16_Fight : "Fight Off Spellplagued",
        Leadership_Tier3_17_Deliver : "Deliver Metals",
        Leadership_Tier3_18_Resell : "Resell Goods at Bazaar",
        Leadership_Tier3_18_Recruit_Epic : "Train a Hero",
        Leadership_Tier3_19_Acquire : "Acquire Siege Engine",
        Leadership_Tier3_20_Destroy : "Destroy Enemy Camp",
        Leadership_Tier4_21_Protectmagic : "Protect Magical Goods Market",
        Leadership_Tier4_21_Training : "Train for the Protector's Tourney",
        Leadership_Tier4_22_Guardclerics : "Guard Clerics of Ilmater",
        Leadership_Tier4_23_Guardnoble : "Guard Young Noble on Trip",
        Leadership_Tier4_24_Wizardsseneschal : "Escort a Wizard's Seneschal",
        Leadership_Tier4_25_Battleelementalcultists : "Battle Elemental Cultists",

Rares:
        Leadership_Tier1_3r_Extendedguard : "Extended Guard Duty",
        Leadership_Tier1_3r_Squiretourney : "Squire at Tournament",
        Leadership_Tier1_4r_Gatherdiamonds : "Gather Astral Diamonds",
        Leadership_Tier1_4r_Protectmerchant : "Protect Local Merchant",
        Leadership_Tier1_5r_Assistcleric : "Assist Local Cleric",
        Leadership_Tier1_5r_Raidcache : "Raid Supply Cache",
        Leadership_Tier1_6r_Assistwizard : "Assist Local Wizard",
        Leadership_Tier1_6r_Protectsurvey : "Protect Survey Team",
        Leadership_Tier2_7r_Followmap : "Follow Map to Treasure Cache",
        Leadership_Tier2_7r_Tournament : "Participate in Tournament",
        Leadership_Tier2_8r_Givehome : "Give Refugees a Home",
        Leadership_Tier2_8r_Helpneedy : "Help the Needy",
        Leadership_Tier2_9r_Protectmines : "Protect the Mines",
        Leadership_Tier2_10r_Seekmaps : "Seek Out Maps",
        Leadership_Tier2_11r_Escortgoods : "Escort Goods to Market",
        Leadership_Tier2_11r_Protecttemple : "Protect a Temple",
        Leadership_Tier3_13r_Competetourney : "Compete in Master's Tournament",
        Leadership_Tier3_13r_Protectdiamonds : "Protect Diamond Shipment",
        Leadership_Tier3_14r_Protectdelegation : "Protect a Trade Delegation",
        Leadership_Tier3_15r_Raidtreasury : "Raid Enemy Treasury",
        Leadership_Tier3_16r_Buildshelters : "Build Shelters",
        Leadership_Tier3_17r_Raidmines : "Raid Enemy Mines",
        Leadership_Tier3_18r_Followmap : "Follow Map to Treasure Hoard",
        Leadership_Tier3_19r_Siegekeep : "Put Enemy Keep Under Siege",
        Leadership_Tier3_20r_Master2 : "Assault Enemy Stronghold",
        Leadership_Tier3_20r_Master1 : "Follow Map to an Unknown Location",
        Leadership_Tier3_20r_Master3 : "Recover Large Mineral Claim",
        Leadership_Tier4_21r_Killelemental : "Kill Rogue Elemental", // taum bag, 500. 16h
        LVL:21 ,name:"Kill Rogue Elemental" taskname:"Leadership_Tier4_21r_Killelemental".
        LVL:22 ,name:"Capture Bandit Leader" taskname:"Leadership_Tier4_22r_Capturebandithq".
        LVL:23 ,name:"Provide security for Pilgrims" taskname:"Leadership_Tier4_23r_Securepilgrimage".
        LVL:24 ,name:"Kill a young Dragon" taskname:"Leadership_Tier4_24r_Killdragon".
        LVL:25 ,name:"Hunt down an escaped Experiment" taskname:"Leadership_Tier4_25r_Huntexperiment".
    },
    Alchemy : {
        Alchemy_Tier0_Intro_1 : "Hire your first Apothecary",
        Alchemy_Tier1_Recruit_Apprentice_Emergency : "Emergency Hire",
        Alchemy_Tier1_Gather_Components : "Gather Simple Components",
        Alchemy_Tier1_Refine_Basic : "Simple Vitriol Extraction",
        Alchemy_Tier1_Experimentation_Rank1 : "Rank 1 Experimentation",
        Alchemy_Tier1_Rejuvenation_Potion_Minor : "Minor Rejuvenation Potion",
        Alchemy_Tier1_Experiment_Rank2 : "Alchemical Research",
        Alchemy_Tier1_Gather_Basic_Mass : "Deep Wilderness Gathering",
        Alchemy_Tier1_Refine_Basic_Mass : "Mass Simple Vitriol Extraction",
        Alchemy_Tier1_Gather_Special : "Pelt and Wood Trading",
        Alchemy_Tier1_Refine_Special : "Simple Vitriol Trading",
        Alchemy_Tier1_Recruit_Apprentice : "Hire an additional Apothecary",
        Alchemy_Tier1_Experimentation_Rank2 : "Rank 2 Experimentation",
        Alchemy_Tier1_Experiment_Rank3 : "Alchemical Research",
        Alchemy_Tier1_Fortification_Potion_Minor : "Minor Fortification Potion",
        Alchemy_Tier1_Force_Potion_Minor : "Minor Potion of Force",
        Alchemy_Tier1_Healing_Potion_Minor : "Potion of Minor Healing",
        Alchemy_Tier1_Experimentation_Rank3 : "Rank 3 Experimentation",
        Alchemy_Tier1_Accuracy_Potion_Minor : "Minor Accuracy Potion",
        Alchemy_Tier1_Reflexes_Potion_Minor : "Minor Reflexes Potion",
        Alchemy_Tier1_Healing_Potion_Minor_Distilled : "Distilled Potion of Minor Healing",
        Alchemy_Tier1_Tidespan_Potion_Minor : "Minor Tidespan Potion",
        Alchemy_Tier1_Experiment_Rank4 : "Alchemical Research",
        Alchemy_Tier1_Aquavitae : "Aqua Vitae",
        Alchemy_Tier1_Experimentation_Rank4 : "Rank 4 Experimentation",
        Alchemy_Tier1_Experiment_Rank5 : "Alchemical Research",
        Alchemy_Tier1_Force_Potion_Lesser : "Lesser Force Potion",
        Alchemy_Tier1_Fortification_Potion_Lesser : "Lesser Fortification Potion",
        Alchemy_Tier1_Rejuvenation_Potion_Lesser : "Lesser Rejuvenation Potion",
        Alchemy_Tier1_Tidespan_Potion_Lesser : "Lesser Tidespan Potion",
        Alchemy_Tier1_Healing_Potion_Lesser : "Potion of Lesser Healing",
        Alchemy_Tier1_Experimentation_Rank5 : "Rank 5 Experimentation",
        Alchemy_Tier1_Experiment_Rank6 : "Alchemical Research",
        Alchemy_Tier1_Recruit_Journeyman : "Upgrade Apothecary",
        Alchemy_Tier1_Experimentation_Rank6 : "Rank 6 Experimentation",
        Alchemy_Tier1_Experiment_Rank7 : "Alchemical Research",
        Alchemy_Tier1_Healing_Potion_Lesser_Distilled : "Distilled Potion of Lesser Healing",
        Alchemy_Tier1_Accuracy_Potion_Lesser : "Lesser Elixir of Accuracy",
        Alchemy_Tier1_Reflexes_Potion_Lesser : "Lesser Elixir of Reflexes",
        Alchemy_Tier2_Gather_Components : "Gather Advanced Components",
        Alchemy_Tier2_Gather_Components_Mass : "Deep Wilderness Gathering",
        Alchemy_Tier2_Gather_Special : "Pelt and Wood Trading",
        Alchemy_Tier2_Refine_Basic : "Advanced Vitriol Extraction",
        Alchemy_Tier2_Refine_Basic_Mass : "Mass Advanced Vitriol Extraction",
        Alchemy_Tier2_Force_Potion : "Force Potion",
        Alchemy_Tier2_Fortification_Potion : "Fortification Potion",
        Alchemy_Tier2_Rejuvenation_Potion : "Rejuvenation Potion",
        Alchemy_Tier2_Trade_Crucible_Blue : "Upgrade Iron Crucible",
        Alchemy_Tier2_Experimentation_Rank07 : "Rank 7 Experimentation",
        Alchemy_Tier2_Experiment_Rank08 : "Alchemical Research",
        Alchemy_Tier2_Aquavitae_2 : "Empowered Aqua Vitae",
        Alchemy_Tier2_Refine_Special : "Advanced Vitriol Trading",
        Alchemy_Tier2_Healing_Potion : "Potion of Healing",
        Alchemy_Tier2_Tidespan_Potion : "Tidespan Potion",
        Alchemy_Tier2_Experimentation_Rank08 : "Rank 8 Experimentation",
        Alchemy_Tier2_Experiment_Rank09 : "Transmutation Research",
        Alchemy_Tier2_Create_Brightleaf : "Create Brightleaf",
        Alchemy_Tier2_Create_Desertrose : "Create Desert Rose",
        Alchemy_Tier2_Create_Fundamentalfire : "Create Fundamental Fire",
        Alchemy_Tier2_Create_Fundamentalice : "Create Fundamental Ice",
        Alchemy_Tier2_Create_Symboltempus : "Create Symbol of Tempus",
        Alchemy_Tier2_Transmute_Brightleaf : "Transmute Brightleaf",
        Alchemy_Tier2_Transmute_Desertrose : "Transmute Desert Rose",
        Alchemy_Tier2_Transmute_Fundamentalfire : "Transmute Fundamental Fire",
        Alchemy_Tier2_Transmute_Fundamentalice : "Transmute Fundamental Ice",
        Alchemy_Tier2_Transmute_Symboltempus : "Transmute Symbol of Tempus",
        Alchemy_Tier2_Trade_Crucible_Purple : "Upgrade Steel Crucible",
        Alchemy_Tier2_Experimentation_Rank09 : "Rank 9 Experimentation",
        Alchemy_Tier2_Experiment_Rank10 : "Alchemical Research",
        Alchemy_Tier2_Experimentation_Rank10 : "Rank 10 Experimentation",
        Alchemy_Tier1_Reflexes_Potion : "Elixir of Reflexes",
        Alchemy_Tier2_Healing_Potion_Distilled : "Distilled Potion of Healing",
        Alchemy_Tier2_Accuracy_Potion : "Elixir of Accuracy",
        Alchemy_Tier2_Experiment_Rank11 : "Transmutation Research",
        Alchemy_Tier2_Trade_Mortar_Blue : "Upgrade Iron Mortar",
        Alchemy_Tier2_Experimentation_Rank11 : "Rank 11 Experimentation",
        Alchemy_Tier2_Transmute_Witchwood : "Transmute Witchwood",
        Alchemy_Tier2_Transmute_Symbolmoradin : "Transmute Symbol of Moradin",
        Alchemy_Tier2_Transmute_Fundamentallightning : "Transmute Fundamental Lightning",
        Alchemy_Tier2_Transmute_Fundamentalearth : "Transmute Fundamental Earth",
        Alchemy_Tier2_Transmute_Darkclover : "Transmute Dark Clover",
        Alchemy_Tier2_Create_Witchwood : "Create Witchwood",
        Alchemy_Tier2_Create_Symbolmoradin : "Create Symbol of Moradin",
        Alchemy_Tier2_Create_Fundamentallightning : "Create Fundamental Lightning",
        Alchemy_Tier2_Create_Fundamentalearth : "Create Fundamental Earth",
        Alchemy_Tier2_Create_Darkclover : "Create Dark Clover",
        Alchemy_Tier2_Experiment_Rank12 : "Alchemical Research",
        Alchemy_Tier2_Experimentation_Rank12 : "Rank 12 Experimentation",
        Alchemy_Tier2_Potency_Potion : "Flask of Potency",
        Alchemy_Tier2_Protection_Potion : "Flask of Protection",
        Alchemy_Tier2_Experiment_Rank13 : "Alchemical Research",
        Alchemy_Tier2_Aquaregia : "Aqua Regia",
        Alchemy_Tier2_Recruit_Master : "Upgrade Mixologist",
        Alchemy_Tier2_Create_Arcane_Cyrstal : "Create Arcane Crystal",
        Alchemy_Tier2_Create_Arcane_Shard : "Create Arcane Shard",
        Alchemy_Tier2_Create_Eldritch_Crystal : "Create Eldritch Crystal",
        Alchemy_Tier2_Transmute_Arcane_Cyrstal : "Transmute Arcane Crystal",
        Alchemy_Tier2_Transmute_Arcane_Shard : "Transmute Arcane Shard",
        Alchemy_Tier2_Transmute_Eldritch_Crystal : "Transmute Eldritch Crystal",
        Alchemy_Tier2_Trade_Mortar_Purple : "Upgrade Steel Mortar",
        Alchemy_Tier2_Experimentation_Rank13 : "Rank 13 Experimentation",
        Alchemy_Tier2_Experiment_Rank14 : "Alchemical Research",
        Alchemy_Tier3_Gather_Components : "Gather Complex Components",
        Alchemy_Tier3_Gather_Components_Mass : "Deep Wilderness Gathering",
        Alchemy_Tier3_Refine_Basic : "Complex Vitriol Extraction",
        Alchemy_Tier3_Refine_Basic_Mass : "Mass Complex Vitriol Extraction",
        Alchemy_Tier3_Gather_Special : "Pelt and Wood Trading",
        Alchemy_Tier3_Fortification_Potion_Greater : "Greater Fortification Potion",
        Alchemy_Tier3_Force_Potion_Greater : "Greater Potion of Force",
        Alchemy_Tier3_Rejuvenation_Potion_Greater : "Greater Potion of Rejuvenation",
        Alchemy_Tier3_Experimentation_Rank14 : "Rank 14 Experimentation",
        Alchemy_Tier3_Experiment_Rank15 : "Alchemical Research",
        Alchemy_Tier3_Recruit_Master_Blue : "Upgrade Alchemist",
        Alchemy_Tier3_Refine_Special : "Complex Vitriol Trading",
        Alchemy_Tier3_Tidespan_Potion_Greater : "Greater Tidespan Potion",
        Alchemy_Tier3_Healing_Potion_Greater : "Potion of Greater Healing",
        Alchemy_Tier3_Trade_Philostone_Blue : "Upgrade Iron Philosopher's Stone",
        Alchemy_Tier3_Experimentation_Rank15 : "Rank 15 Experimentation",
        Alchemy_Tier3_Experiment_Rank16 : "Alchemical Research",
        Alchemy_Tier3_Healing_Potion_Greater_Distilled : "Distilled Potion of Greater Healing",
        Alchemy_Tier3_Accuracy_Potion_Greater : "Greater Elixir of Accuracy",
        Alchemy_Tier3_Reflexes_Potion_Greater : "Greater Elixir of Reflexes",
        Alchemy_Tier3_Experimentation_Rank16 : "Rank 16 Experimentation",
        Alchemy_Tier3_Experiment_Rank17 : "Alchemical Research",
        Alchemy_Tier3_Fortification_Potion_Major : "Major Fortification Potion",
        Alchemy_Tier3_Force_Potion_Major : "Major Potion of Force",
        Alchemy_Tier3_Rejuvenation_Potion_Major : "Major Potion of Rejuvenation",
        Alchemy_Tier2_Trade_Philostone_Purple : "Upgrade Steel Philosopher's Stone",
        Alchemy_Tier3_Experimentation_Rank17 : "Rank 17 Experimentation",
        Alchemy_Tier3_Experiment_Rank18 : "Alchemical Research",
        Alchemy_Tier3_Recruit_Master_Purple : "Upgrade Master Alchemist",
        Alchemy_Tier3_Tidespan_Potion_Major : "Major Tidespan Potion",
        Alchemy_Tier3_Healing_Potion_Major : "Potion of Major Healing",
        Alchemy_Tier3_Experimentation_Rank18 : "Rank 18 Experimentation",
        Alchemy_Tier3_Experiment_Rank19 : "Alchemical Research",
        Alchemy_Tier3_Healing_Potion_Major_Distilled : "Distilled Potion of Major Healing",
        Alchemy_Tier3_Accuracy_Potion_Major : "Major Elixir of Accuracy",
        Alchemy_Tier3_Reflexes_Potion_Major : "Major Elixir of Reflexes",
        Alchemy_Tier3_Experimentation_Rank19 : "Rank 19 Experimentation",
        Alchemy_Tier3_Experiment_Rank20 : "Alchemical Research",
        Alchemy_Tier3_Unstable_Potion_Major : "Major Unstable Potion",
        Alchemy_Tier3_Potency_Potion_Major : "Major Flask of Potency",
        Alchemy_Tier3_Protection_Potion_Major : "Major Flask of Protection",
        Alchemy_Tier3_Experimentation_Rank20 : "Rank 20 Experimentation",
        LVL:21 ,name:"Mass Variegated Vitriol Extraction" taskname:"Alchemy_Tier4_Refine_Basic_Mass".
        LVL:21 ,name:"Variegated Vitriol Extraction" taskname:"Alchemy_Tier4_Refine_Basic".
        LVL:21 ,name:"Enhanced Superior Fortification Potion" taskname:"Alchemy_Tier4_Fortification_Potion_Superior".
        LVL:21 ,name:"Enhanced Superior Potion of Force" taskname:"Alchemy_Tier4_Force_Potion_Superior".
        LVL:22 ,name:"Empowered Aqua Regia" taskname:"Alchemy_Tier4_Aquaregia_2".
        LVL:22 ,name:"Potion of Superior Healing" taskname:"Alchemy_Tier3_Healing_Potion_Superior".
        LVL:22 ,name:"Superior Potion of Rejuvenation " taskname:"Alchemy_Tier4_Rejuvenation_Potion_Superior".
        LVL:23 ,name:"Enhanced Superior Elixir of Accuracy" taskname:"Alchemy_Tier4_Accuracy_Potion_Superior".
        LVL:23 ,name:"Enhanced Superior Tidespan Potion" taskname:"Alchemy_Tier4_Tidespan_Potion_Superior".
        LVL:24 ,name:"Create Elemental Aggregate" taskname:"Alchemy_Tier4_Create_Elemental_Aggregate".
        LVL:24 ,name:"Distilled Potion of Superior Healing" taskname:"Alchemy_Tier4_Healing_Potion_Superior_Distilled".
        LVL:24 ,name:"Enhanced Superior Elixir of Reflexes" taskname:"Alchemy_Tier4_Reflexes_Potion_Superior".
        LVL:25 ,name:"Create Unified Elements" taskname:"Alchemy_Tier4_Create_Elemental_Unified".
        LVL:25 ,name:"Superior Flask of Potency" taskname:"Alchemy_Tier4_Potency_Potion_Superior".
        LVL:25 ,name:"Superior Flask of Protection" taskname:"Alchemy_Tier4_Protection_Potion_Superior".
        LVL:25 ,name:"Superior Unstable Potion" taskname:"Alchemy_Tier4_Unstable_Potion_Superior".
       
Rares:
        Alchemy_Tier1_Accuracy_Potion_Minor_Mass : "Batch of Minor Elixir of Accuracy",
        Alchemy_Tier1_Reflexes_Potion_Minor_Mass : "Batch of Minor Elixirs of Reflexes",
        Alchemy_Tier1_Force_Potion_Minor_Mass : "Batch of Minor Force Potions",
        Alchemy_Tier1_Fortification_Potion_Minor_Mass : "Batch of Minor Fortification Potions",
        Alchemy_Tier1_Healing_Potion_Minor_Mass : "Batch of Minor Healing Potions",
        Alchemy_Tier1_Rejuvenation_Potion_Minor_Mass : "Batch of Minor Rejuvenation Potions",
        Alchemy_Tier1_Tidespan_Potion_Minor_Mass : "Batch of Minor Tidespan Potions",
        Alchemy_Tier1_Force_Potion_Lesser_Mass : "Batch of Lesser Force Potions",
        Alchemy_Tier1_Fortification_Potion_Lesser_Mass : "Batch of Lesser Fortification Potions",
        Alchemy_Tier1_Rejuvenation_Potion_Lesser_Mass : "Batch of Lesser Rejuvenation Potions",
        Alchemy_Tier1_Healing_Potion_Lesser_Mass : "Batch of Lesser Healing Potions",
        Alchemy_Tier1_Tidespan_Potion_Lesser_Mass : "Batch of Lesser Tidespan Potions",
        Alchemy_Tier1_Accuracy_Potion_Lesser_Mass : "Batch of Lesser Elixirs of Accuracy",
        Alchemy_Tier1_Reflexes_Potion_Lesser_Mass : "Batch of Lesser Elixirs of Reflexes",
        Alchemy_Tier2_Dyepack_Control : "Batch of Control Wizard's Dyepacks",
        Alchemy_Tier2_Dyepack_Devoted : "Batch of Devoted Cleric's Dyepacks",
        Alchemy_Tier2_Force_Potion_Mass : "Batch of Force Potions",
        Alchemy_Tier2_Fortification_Potion_Mass : "Batch of Fortification Potions",
        Alchemy_Tier2_Dyepack_Greatweapon : "Batch of Great Weapon Fighter's Dyepack",
        Alchemy_Tier2_Dyepack_Guardian : "Batch of Guardian Fighter's Dyepacks",
        Alchemy_Tier2_Rejuvenation_Potion_Mass : "Batch of Rejuvenation Potions",
        Alchemy_Tier2_Dyepack_Trickster : "Batch of Trickster Rogue's Dyepacks",
        Alchemy_Tier2_Healing_Potion_Mass : "Batch of Potions of Healing",
        Alchemy_Tier2_Tidespan_Potion_Mass : "Batch of Tidespan Potions",
        Alchemy_Tier2_Accuracy_Potion_Mass : "Batch of Elixirs of Accuracy",
        Alchemy_Tier2_Reflexes_Potion_Mass : "Batch of Elixirs of Reflexes",
        Alchemy_Tier3_Fortification_Potion_Greater_Mass : "Batch of Greater Fortification Potions",
        Alchemy_Tier3_Force_Potion_Greater_Mass : "Batch of Greater Potions of Force",
        Alchemy_Tier3_Rejuvenation_Potion_Greater_Mass : "Batch of Greater Potions of Rejuvenati",
        Alchemy_Tier3_Accuracy_Potion_Greater_Mass : "Batch of Greater Elixirs of Accuracy",
        Alchemy_Tier3_Reflexes_Potion_Greater_Mass : "Batch of Greater Elixirs of Reflexes",
        Alchemy_Tier3_Fortification_Potion_Major_Mass : "Batch of Major Fortification Potions",
        Alchemy_Tier3_Force_Potion_Major_Mass : "Batch of Major Potions of Force",
        Alchemy_Tier3_Rejuvenation_Potion_Major_Mass : "Batch of Major Potions of Rejuvenation",
        Alchemy_Tier3_Tidespan_Potion_Major_Mass : "Batch of Major Tidespan Potions",
        Alchemy_Tier3_Healing_Potion_Major_Mass : "Batch of Potions of Major Healing",
        Alchemy_Tier3_Accuracy_Potion_Major_Mass : "Batch of Major Elixirs of Accuracy",
        Alchemy_Tier3_Reflexes_Potion_Major_Mass : "Batch of Major Elixirs of Reflexes",
        Alchemy_Tier3_Power_Potion_Mass : "Batch of Potions of Power",
        Alchemy_Tier3_Stamina_Potion_Mass : "Batch of Potions of Stamina",
    },
    Artificing : {
        Artificing_Tier0_Intro_1 : "Hire your first Carver",
        Artificing_Tier1_Recruit_Apprentice_Emergency : "Emergency Hire",
        LVL:1 ,name:"Craft Ornamental metal and Carved Wood" taskname:"Artificing_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass metal and wood crafting" taskname:"Artificing_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Orb of Ice +1" taskname:"Artificing_Tier1_Orb_Ice_1".
        LVL:1 ,name:"Tempting Pact Blade +1" taskname:"Artificing_Tier1_Pactblade_Convergence_1".
        LVL:1 ,name:"Virtuous Symbol +1" taskname:"Artificing_Tier1_Symbol_Virtuous_1".
        LVL:2 ,name:"Ore and Wood Trading" taskname:"Artificing_Tier1_Gather_Special".
        LVL:2 ,name:"Damned Grimoire +1" taskname:"Artificing_Tier1_Grimoire_Damnation_1".
        LVL:2 ,name:"Damned Pact Blade +1" taskname:"Artificing_Tier1_Pactblade_Damnation_1".
        LVL:2 ,name:"Orb of Storm +1" taskname:"Artificing_Tier1_Orb_Storm_1".
        LVL:2 ,name:"Righteous Icon +1" taskname:"Artificing_Tier1_Icon_Righteous_1".
        LVL:2 ,name:"Righteous Symbol +1" taskname:"Artificing_Tier1_Symbol_Righteous_1".
        LVL:2 ,name:"Talisman of Ice +1" taskname:"Artificing_Tier1_Talisman_Ice_1".
        LVL:2 ,name:"Talisman of Storm +1" taskname:"Artificing_Tier1_Talisman_Storm_1".
        LVL:2 ,name:"Tempting Grimoire +1" taskname:"Artificing_Tier1_Grimoire_Convergence_1".
        LVL:2 ,name:"Virtuous Icon +1" taskname:"Artificing_Tier1_Icon_Virtuous_1".
        LVL:3 ,name:"Upgrade Artificer" taskname:"Artificing_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Ornament and Carving Trading" taskname:"Artificing_Tier1_Refine_Special".
        LVL:3 ,name:"Upgrade Iron Crucible" taskname:"Artificing_Tier2_Trade_Crucible_Blue".
        LVL:3 ,name:"Upgrade Iron File" taskname:"Artificing_Tier3_Trade_File_Blue".
        LVL:3 ,name:"Upgrade Iron Mallet" taskname:"Artificing_Tier2_Trade_Mallet_Blue".
        LVL:3 ,name:"Faithful Icon +1" taskname:"Artificing_Tier1_Icon_Faithful_1".
        LVL:3 ,name:"Faithful Symbol +1" taskname:"Artificing_Tier1_Symbol_Faithful_1".
        LVL:3 ,name:"Furious Grimoire +1" taskname:"Artificing_Tier1_Grimoire_Fury_1".
        LVL:3 ,name:"Furious Pact Blade +1" taskname:"Artificing_Tier1_Pactblade_Fury_1".
        LVL:3 ,name:"Orb of Fire +1" taskname:"Artificing_Tier1_Orb_Fire_1".
        LVL:3 ,name:"Talisman of Fire +1" taskname:"Artificing_Tier1_Talisman_Fire_1".
        LVL:4 ,name:"Upgrade Master Artificer" taskname:"Artificing_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Upgrade Steel Crucible" taskname:"Artificing_Tier2_Trade_Crucible_Purple".
        LVL:4 ,name:"Upgrade Steel File" taskname:"Artificing_Tier3_Trade_File_Purple".
        LVL:4 ,name:"Upgrade Steel Mallet" taskname:"Artificing_Tier2_Trade_Mallet_Purple".
        LVL:4 ,name:"Orb of Ice +2" taskname:"Artificing_Tier1_Orb_Ice_2".
        LVL:4 ,name:"Talisman of Ice +2" taskname:"Artificing_Tier1_Talisman_Ice_2".
        LVL:4 ,name:"Tempting Grimoire +2" taskname:"Artificing_Tier1_Grimoire_Convergence_2".
        LVL:4 ,name:"Tempting Pact Blade +2" taskname:"Artificing_Tier1_Pactblade_Convergence_2".
        LVL:4 ,name:"Virtuous Icon +2" taskname:"Artificing_Tier1_Icon_Virtuous_2".
        LVL:4 ,name:"Virtuous Symbol +2" taskname:"Artificing_Tier1_Symbol_Virtuous_2".
        LVL:5 ,name:"Damned Grimoire +2" taskname:"Artificing_Tier1_Grimoire_Damnation_2".
        LVL:5 ,name:"Damned Pact Blade +2" taskname:"Artificing_Tier1_Pactblade_Damnation_2".
        LVL:5 ,name:"Orb of Storm +2" taskname:"Artificing_Tier1_Orb_Storm_2".
        LVL:5 ,name:"Righteous Icon +2" taskname:"Artificing_Tier1_Icon_Righteous_2".
        LVL:5 ,name:"Righteous Symbol +2" taskname:"Artificing_Tier1_Symbol_Righteous_2".
        LVL:5 ,name:"Talisman of Storm +2" taskname:"Artificing_Tier1_Talisman_Storm_2".
        LVL:6 ,name:"Upgrade Carver" taskname:"Artificing_Tier1_Recruit_Journeyman".
        LVL:6 ,name:"Faithful Icon +2" taskname:"Artificing_Tier1_Icon_Faithful_2".
        LVL:6 ,name:"Faithful Symbol +2" taskname:"Artificing_Tier1_Symbol_Faithful_2".
        LVL:6 ,name:"Furious Grimoire +2" taskname:"Artificing_Tier1_Grimoire_Fury_2".
        LVL:6 ,name:"Furious Pact Blade +2" taskname:"Artificing_Tier1_Pactblade_Fury_2".
        LVL:6 ,name:"Orb of Fire +2" taskname:"Artificing_Tier1_Orb_Fire_2".
        LVL:6 ,name:"Talisman of Fire +2" taskname:"Artificing_Tier1_Talisman_Fire_2".
        LVL:7 ,name:"Craft Ornamental metal and Carved Wood" taskname:"Artificing_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass metal and wood crafting" taskname:"Artificing_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Orb of Ice +3" taskname:"Artificing_Tier2_Orb_Ice_3".
        LVL:7 ,name:"Ore and Wood Trading" taskname:"Artificing_Tier2_Gather_Special".
        LVL:7 ,name:"Tempting Pact Blade +3" taskname:"Artificing_Tier2_Pactblade_Temptation_3".
        LVL:7 ,name:"Virtuous Symbol +3" taskname:"Artificing_Tier2_Symbol_Virtuous_3".
        LVL:8 ,name:"Ornament and Carving Trading" taskname:"Artificing_Tier2_Refine_Special".
        LVL:8 ,name:"Talisman of Ice +3" taskname:"Artificing_Tier2_Talisman_Ice_3".
        LVL:8 ,name:"Tempting Grimoire +3" taskname:"Artificing_Tier2_Grimoire_Temptation_3".
        LVL:8 ,name:"Virtuous Icon +3" taskname:"Artificing_Tier2_Icon_Virtuous_3".
        LVL:9 ,name:"Damned Pact Blade +3" taskname:"Artificing_Tier2_Pactblade_Damnation_3".
        LVL:9 ,name:"Orb of Storm +3" taskname:"Artificing_Tier2_Orb_Storm_3".
        LVL:9 ,name:"Righteous Symbol +3" taskname:"Artificing_Tier2_Symbol_Righteous_3".
        LVL:10 ,name:"Damned Grimoire +3" taskname:"Artificing_Tier2_Grimoire_Damnation_3".
        LVL:10 ,name:"Righteous Icon +3" taskname:"Artificing_Tier2_Icon_Righteous_3".
        LVL:10 ,name:"Talisman of Storm +3" taskname:"Artificing_Tier2_Talisman_Storm_3".
        LVL:11 ,name:"Faithful Symbol +3" taskname:"Artificing_Tier2_Symbol_Faithful_3".
        LVL:11 ,name:"Furious Pact Blade +3" taskname:"Artificing_Tier2_Pactblade_Fury_3".
        LVL:11 ,name:"Orb of Fire +3" taskname:"Artificing_Tier2_Orb_Fire_3".
        LVL:12 ,name:"Faithful Icon +3" taskname:"Artificing_Tier2_Icon_Faithful_3".
        LVL:12 ,name:"Furious Grimoire +3" taskname:"Artificing_Tier2_Grimoire_Fury_3".
        LVL:12 ,name:"Talisman of Fire +3" taskname:"Artificing_Tier2_Talisman_Fire_3".
        LVL:13 ,name:"Upgrade Engraver" taskname:"Artificing_Tier2_Recruit_Master".
        LVL:13 ,name:"Diabolist's Grimoire +3" taskname:"Artificing_Tier2_Grimoire_Temptation_Set2".
        LVL:13 ,name:"Diabolist's Pact Blade +3" taskname:"Artificing_Tier2_Pactblade_Temptation_Set2".
        LVL:13 ,name:"Mage's Orb +3" taskname:"Artificing_Tier2_Orb_Ice_Set2".
        LVL:13 ,name:"Mage's Talisman +3" taskname:"Artificing_Tier2_Talisman_Ice_Set2".
        LVL:13 ,name:"Prelate's Icon +3" taskname:"Artificing_Tier2_Icon_Virtuous_Set2".
        LVL:13 ,name:"Prelate's Symbol +3" taskname:"Artificing_Tier2_Symbol_Virtuous_Set2".
        LVL:14 ,name:"Ore and Wood Trading" taskname:"Artificing_Tier3_Gather_Special".
        LVL:14 ,name:"Craft Ornamental metal and Carved Wood" taskname:"Artificing_Tier3_Refine_Basic".
        LVL:14 ,name:"Mass metal and wood crafting" taskname:"Artificing_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Orb of Ice +4" taskname:"Artificing_Tier3_Orb_Ice_4".
        LVL:14 ,name:"Talisman of Ice +4" taskname:"Artificing_Tier3_Talisman_Ice_4".
        LVL:14 ,name:"Tempting Grimoire +4" taskname:"Artificing_Tier3_Grimoire_Temptation_4".
        LVL:14 ,name:"Tempting Pact Blade +4" taskname:"Artificing_Tier3_Pactblade_Temptation_4".
        LVL:14 ,name:"Virtuous Icon +4" taskname:"Artificing_Tier3_Icon_Virtuous_4".
        LVL:14 ,name:"Virtuous Symbol +4" taskname:"Artificing_Tier3_Symbol_Virtuous_4".
        LVL:15 ,name:"Ornament and Carving Trading" taskname:"Artificing_Tier3_Refine_Special".
        LVL:15 ,name:"Damned Grimoire +4" taskname:"Artificing_Tier3_Grimoire_Damnation_4".
        LVL:15 ,name:"Damned Pact Blade +4" taskname:"Artificing_Tier3_Pactblade_Damnation_4".
        LVL:15 ,name:"Orb of Storm +4" taskname:"Artificing_Tier3_Orb_Storm_4".
        LVL:15 ,name:"Righteous Icon +4" taskname:"Artificing_Tier3_Icon_Righteous_4".
        LVL:15 ,name:"Righteous Symbol +4" taskname:"Artificing_Tier3_Symbol_Righteous_4".
        LVL:15 ,name:"Talisman of Storm +4" taskname:"Artificing_Tier3_Talisman_Storm_4".
        LVL:16 ,name:"Faithful Icon +4" taskname:"Artificing_Tier3_Icon_Faithful_4".
        LVL:16 ,name:"Faithful Symbol +4" taskname:"Artificing_Tier3_Symbol_Faithful_4".
        LVL:16 ,name:"Furious Grimoire +4" taskname:"Artificing_Tier3_Grimoire_Fury_4".
        LVL:16 ,name:"Furious Pact Blade +4" taskname:"Artificing_Tier3_Pactblade_Fury_4".
        LVL:16 ,name:"Orb of Fire +4" taskname:"Artificing_Tier3_Orb_Fire_4".
        LVL:16 ,name:"Talisman of Fire +4" taskname:"Artificing_Tier3_Talisman_Fire_4".
        LVL:17 ,name:"Orb of Ice +5" taskname:"Artificing_Tier3_Orb_Ice_5".
        LVL:17 ,name:"Talisman of Ice +5" taskname:"Artificing_Tier3_Talisman_Ice_5".
        LVL:17 ,name:"Tempting Grimoire +5" taskname:"Artificing_Tier3_Grimoire_Temptation_5".
        LVL:17 ,name:"Tempting Pact Blade +5" taskname:"Artificing_Tier3_Pactblade_Temptation_5".
        LVL:17 ,name:"Virtuous Icon +5" taskname:"Artificing_Tier3_Icon_Virtuous_5".
        LVL:17 ,name:"Virtuous Symbol +5" taskname:"Artificing_Tier3_Symbol_Virtuous_5".
        LVL:18 ,name:"Damned Grimoire +5" taskname:"Artificing_Tier3_Grimoire_Damnation_5".
        LVL:18 ,name:"Damned Pact Blade +5" taskname:"Artificing_Tier3_Pactblade_Damnation_5".
        LVL:18 ,name:"Orb of Storm +5" taskname:"Artificing_Tier3_Orb_Storm_5".
        LVL:18 ,name:"Righteous Icon +5" taskname:"Artificing_Tier3_Icon_Righteous_5".
        LVL:18 ,name:"Righteous Symbol +5" taskname:"Artificing_Tier3_Symbol_Righteous_5".
        LVL:18 ,name:"Talisman of Storm +5" taskname:"Artificing_Tier3_Talisman_Storm_5".
        LVL:19 ,name:"Faithful Icon +5" taskname:"Artificing_Tier3_Icon_Faithful_5".
        LVL:19 ,name:"Faithful Symbol +5" taskname:"Artificing_Tier3_Symbol_Faithful_5".
        LVL:19 ,name:"Furious Grimoire +5" taskname:"Artificing_Tier3_Grimoire_Fury_5".
        LVL:19 ,name:"Furious Pact Blade +5" taskname:"Artificing_Tier3_Pactblade_Fury_5".
        LVL:19 ,name:"Orb of Fire +5" taskname:"Artificing_Tier3_Orb_Fire_5".
        LVL:19 ,name:"Talisman of Fire +5" taskname:"Artificing_Tier3_Talisman_Fire_5".
        LVL:20 ,name:"Diabolist's Grimoire +5" taskname:"Artificing_Tier3_Grimoire_Temptation_Set2".
        LVL:20 ,name:"Diabolist's Pact Blade +5" taskname:"Artificing_Tier3_Pactblade_Temptation_Set2".
        LVL:20 ,name:"Mage's Orb +5" taskname:"Artificing_Tier3_Orb_Ice_Set2".
        LVL:20 ,name:"Mage's Talisman +5" taskname:"Artificing_Tier3_Talisman_Ice_Set2".
        LVL:20 ,name:"Orb of Aryvandaar" taskname:"Artificing_Tier3_Orb_Purple_Special".
        LVL:20 ,name:"Pact Blade of Aryvandaar" taskname:"Artificing_Tier3_Pactblade_Purple_Special".
        LVL:20 ,name:"Prelate's Icon +5" taskname:"Artificing_Tier3_Icon_Virtuous_Set2".
        LVL:20 ,name:"Prelate's Symbol +5" taskname:"Artificing_Tier3_Symbol_Virtuous_Set2".
        LVL:20 ,name:"Symbol of Aryvandaar" taskname:"Artificing_Tier3_Symbol_Purple_Special".
        LVL:21 ,name:"Ornamental Adamantine and Ebony Wood Crafting" taskname:"Artificing_Tier4_Refine_Basic".
        LVL:21 ,name:"Mass Ornamental Adamantine and Ebony Crafting" taskname:"Artificing_Tier4_Refine_Basic_Mass".
        LVL:21 ,name:"Diabolist's Elemental Grimoire" taskname:"Artificing_Tier4_Grimoire_Temptation_4".
        LVL:21 ,name:"Mage's Elemental Talisman of Ice" taskname:"Artificing_Tier4_Talisman_Ice_4".
        LVL:21 ,name:"Prelate's Elemental Icon" taskname:"Artificing_Tier4_Icon_Virtuous_4".
        LVL:21 ,name:"Prelate's Elemental Symbol" taskname:"Artificing_Tier4_Symbol_Virtuous_4".
        LVL:22 ,name:"Adamantium and Ebony Trading" taskname:"Artificing_Tier4_Gather_Special".
        LVL:22 ,name:"Ornamental Adamantine and Carved Ebony Trading" taskname:"Artificing_Tier4_Refine_Special".
        LVL:22 ,name:"Diabolist's Elemental Pact Blade" taskname:"Artificing_Tier4_Pactblade_Temptation_4".
        LVL:22 ,name:"Mage's Elemental Orb of Ice" taskname:"Artificing_Tier4_Orb_Ice_4".
        LVL:23 ,name:"Mage's Elemental Orb of Storm" taskname:"Artificing_Tier4_Orb_Storm_4".
        LVL:23 ,name:"Mage's Elemental Talisman of Storm" taskname:"Artificing_Tier4_Talisman_Storm_4".
        LVL:23 ,name:"Occultist's Elemental Grimoire" taskname:"Artificing_Tier4_Grimoire_Damnation_4".
        LVL:23 ,name:"Occultist's Elemental Pact Blade" taskname:"Artificing_Tier4_Pactblade_Damnation_4".
        LVL:23 ,name:"Priest's Elemental Icon" taskname:"Artificing_Tier4_Icon_Righteous_4".
        LVL:23 ,name:"Priest's Elemental Symbol" taskname:"Artificing_Tier4_Symbol_Righteous_4".
        LVL:24 ,name:"Bishop's Elemental Icon" taskname:"Artificing_Tier4_Icon_Faithful_4".
        LVL:24 ,name:"Bishop's Elemental Symbol" taskname:"Artificing_Tier4_Symbol_Faithful_4".
        LVL:24 ,name:"Mage's Elemental Orb of Fire" taskname:"Artificing_Tier4_Orb_Fire_4".
        LVL:24 ,name:"Mage's Elemental Talisman of Fire" taskname:"Artificing_Tier4_Talisman_Fire_4".
        LVL:24 ,name:"Warlock's Elemental Grimoire" taskname:"Artificing_Tier4_Grimoire_Fury_4".
        LVL:24 ,name:"Warlock's Elemental Pact Blade" taskname:"Artificing_Tier4_Pactblade_Fury_4".
        LVL:25 ,name:"Elemental Grimoire" taskname:"Artificing_Tier4_Grimoire_Temptation_Set2".
        LVL:25 ,name:"Elemental Icon" taskname:"Artificing_Tier4_Icon_Virtuous_Set2".
        LVL:25 ,name:"Elemental Orb" taskname:"Artificing_Tier4_Orb_Ice_Set2".
        LVL:25 ,name:"Elemental Pact Blade" taskname:"Artificing_Tier4_Pactblade_Temptation_Set2".
        LVL:25 ,name:"Elemental Symbol" taskname:"Artificing_Tier4_Symbol_Virtuous_Set2".
        LVL:25 ,name:"Elemental Talisman" taskname:"Artificing_Tier4_Talisman_Ice_Set2".
 
Rares:
        Artificing_Tier1_Orb_Fire_1_Blue : "Orb of Fire +1",
        Artificing_Tier1_Orb_Ice_1_Blue : "Talisman of Ice +1",
        Artificing_Tier1_Talisman_Fire_1_Blue : "Talisman of Fire +1",
        Artificing_Tier1_Talisman_Storm_1_Blue : "Talisman of Storm +1",
        Artificing_Tier1_Icon_Virtuous_1_Blue : "Virtuous Icon +1",
        Artificing_Tier1_Icon_Faithful_1_Blue : "Faithful Icon +1",
        Artificing_Tier1_Orb_Storm_2_Blue : "Orb of Storm +2",
        Artificing_Tier1_Talisman_Storm_2_Blue : "Talisman of Storm +2",
        Artificing_Tier1_Talisman_Ice_2_Blue : "Talisman of Ice +2",
        Artificing_Tier1_Symbol_Righteous_2_Blue : "Righteous Symbol +2",
        Artificing_Tier1_Symbol_Virtuous_2_Blue : "Virtuous Symbol +2",
        Artificing_Tier2_Orb_Ice_3_Blue : "Orb of Ice +3",
        Artificing_Tier2_Icon_Righteous_3_Blue : "Righteous Icon +3",
        Artificing_Tier2_Symbol_Virtuous_3_Blue : "Virtuous Symbol +3",
        Artificing_Tier3_Orb_Fire_4_Blue : "Orb of Fire +4",
        Artificing_Tier3_Orb_Storm_4_Blue : "Orb of Storm +4",
        Artificing_Tier3_Talisman_Fire_4_Blue : "Talisman of Fire +4",
        Artificing_Tier3_Talisman_Storm_4_Blue : "Talisman of Storm +4",
        Artificing_Tier3_Symbol_Virtuous_4_Blue : "Virtuous Symbol +4",
        Artificing_Tier3_Symbol_Faithful_4_Blue : "Faithful Symbol +4",
        Artificing_Tier3_Icon_Righteous_5_Blue : "Righteous Icon +5",
        Artificing_Tier3_Talisman_Fire_5_Blue : "Talisman of Fire +5",
        Artificing_Tier3_Talisman_Storm_5_Blue : "Talisman of Storm +5",
        Artificing_Tier3_Talisman_Ice_5_Blue : "Talisman of Ice +5",
        Artificing_Tier3_Symbol_Faithful_5_Blue : "Faithful Symbol +5",
        Artificing_Tier3_Icon_Virtuous_5_Blue : "Virtuous Icon +5",
        Artificing_Tier3_Icon_Faithful_5_Blue : "Faithful Icon +5",
        Artificing_Tier3_Orb_Storm_5_Blue : "Orb of Storm +5",
        Artificing_Tier3_Orb_Ice_6_Purple : "Orb of Ice +6",
        Artificing_Tier3_Orb_Storm_6_Purple : "Orb of Storm +6",
        Artificing_Tier3_Talisman_Ice_6_Purple : "Talisman of Ice +6",
        Artificing_Tier3_Talisman_Storm_6_Purple : "Talisman of Storm +6",
    },
    Leatherworking : {
        Leatherworking_Tier0_Intro_1 : "Hire your first Skinner",
        Leatherworking_Tier1_Recruit_Apprentice_Emergency : "Emergency Hire",
        LVL:1 ,name:"Cure Simple Pelts" taskname:"Leatherworking_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass Simple Pelt Curing" taskname:"Leatherworking_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Leather Shirt" taskname:"Leatherworking_Tier1_Leather_Shirt_1".
        LVL:1 ,name:"Leather Tunic" taskname:"Leatherworking_Tier1_Leather_Shirt_1_Set2".
        LVL:1 ,name:"Darkleather Boots" taskname:"Leatherworking_Tier1_Darkleather_Boots_1".
        LVL:1 ,name:"Hide Boots" taskname:"Leatherworking_Tier1_Hide_Boots_1".
        LVL:1 ,name:"Leather Boots" taskname:"Leatherworking_Tier1_Leather_Boots_1".
        LVL:2 ,name:"Simple Pelt Trading" taskname:"Leatherworking_Tier1_Gather_Special".
        LVL:2 ,name:"Leather Pants" taskname:"Leatherworking_Tier1_Leather_Pants_1".
        LVL:2 ,name:"Leather Trousers" taskname:"Leatherworking_Tier1_Leather_Pants_1_Set2".
        LVL:2 ,name:"Darkleather Armor" taskname:"Leatherworking_Tier1_Darkleather_Armor_1".
        LVL:2 ,name:"Hide Armor" taskname:"Leatherworking_Tier1_Hide_Armor_1".
        LVL:2 ,name:"Leather Armor" taskname:"Leatherworking_Tier1_Leather_Armor_1".
        LVL:3 ,name:"Upgrade Leatherworker" taskname:"Leatherworking_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Simple Leather Trading" taskname:"Leatherworking_Tier1_Refine_Special".
        LVL:3 ,name:"Trade Iron Awls for a Steel Awl" taskname:"Leatherworking_Tier3_Trade_Awl_Blue".
        LVL:3 ,name:"Trade Iron Shears for Steel Shears" taskname:"Leatherworking_Tier3_Trade_Shears_Blue".
        LVL:3 ,name:"Upgrade Iron Swivel Knives" taskname:"Leatherworking_Tier3_Trade_Swivelknife_Blue".
        LVL:3 ,name:"Darkleather Bracers" taskname:"Leatherworking_Tier1_Darkleather_Gloves_1".
        LVL:3 ,name:"Hide Bracers" taskname:"Leatherworking_Tier1_Hide_Gloves_1".
        LVL:3 ,name:"Leather Bracers" taskname:"Leatherworking_Tier1_Leather_Gloves_1".
        LVL:3 ,name:"Darkleather Boots +1" taskname:"Leatherworking_Tier1_Darkleather_Boots_Set_1".
        LVL:3 ,name:"Hide Boots +1" taskname:"Leatherworking_Tier1_Hide_Boots_Set_1".
        LVL:3 ,name:"Leather Boots +1" taskname:"Leatherworking_Tier1_Leather_Boots_Set_1".
        LVL:4 ,name:"Upgrade Master Leatherworker" taskname:"Leatherworking_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Trade Steel Awls for a Mithral Awl" taskname:"Leatherworking_Tier3_Trade_Awl_Purple".
        LVL:4 ,name:"Trade Steel Shears for Mithral Shears" taskname:"Leatherworking_Tier3_Trade_Shears_Purple".
        LVL:4 ,name:"Upgrade Steel Swivel Knives" taskname:"Leatherworking_Tier3_Trade_Swivelknife_Purple".
        LVL:4 ,name:"Sturdy Leather Shirt" taskname:"Leatherworking_Tier1_Leather_Shirt2".
        LVL:4 ,name:"Sturdy Leather Tunic" taskname:"Leatherworking_Tier1_Leather_Shirt2_Set2".
        LVL:4 ,name:"Archer's Hide Boots +1" taskname:"Leatherworking_Tier1_Hide_Boots_Set_2".
        LVL:4 ,name:"Diabolist's Darkleather Boots +1" taskname:"Leatherworking_Tier1_Darkleather_Boots_Set_2".
        LVL:4 ,name:"Outcast's Darkleather Boots +1" taskname:"Leatherworking_Tier1_Darkleather_Boots_Set_3".
        LVL:4 ,name:"Prowler's Leather Boots +1" taskname:"Leatherworking_Tier1_Leather_Boots_Set_3".
        LVL:4 ,name:"Vandal's Leather Boots +1" taskname:"Leatherworking_Tier1_Leather_Boots_Set_2".
        LVL:4 ,name:"Warden's Hide Boots +1" taskname:"Leatherworking_Tier1_Hide_Boots_Set_3".
        LVL:5 ,name:"Sturdy Leather Pants" taskname:"Leatherworking_Tier1_Leather_Pants".
        LVL:5 ,name:"Sturdy Leather Trousers" taskname:"Leatherworking_Tier1_Leather_Pants_Set2".
        LVL:5 ,name:"Archer's Hide Armor +1" taskname:"Leatherworking_Tier1_Hide_Armor_Set_2".
        LVL:5 ,name:"Darkleather Armor +1" taskname:"Leatherworking_Tier1_Darkleather_Armor_Set_1".
        LVL:5 ,name:"Diabolist's Darkleather Armor +1" taskname:"Leatherworking_Tier1_Darkleather_Armor_Set_2".
        LVL:5 ,name:"Hide Armor +1" taskname:"Leatherworking_Tier1_Hide_Armor_Set_1".
        LVL:5 ,name:"Leather Armor +1" taskname:"Leatherworking_Tier1_Leather_Armor_Set_1".
        LVL:5 ,name:"Outcast's Darkleather Armor +1" taskname:"Leatherworking_Tier1_Darkleather_Armor_Set_3".
        LVL:5 ,name:"Prowler's Leather Armor +1" taskname:"Leatherworking_Tier1_Leather_Armor_Set_3".
        LVL:5 ,name:"Vandal's Leather Armor +1" taskname:"Leatherworking_Tier1_Leather_Armor_Set_2".
        LVL:5 ,name:"Warden's Hide Armor +1" taskname:"Leatherworking_Tier1_Hide_Armor_Set_3".
        LVL:6 ,name:"Archer's Hide Bracers +1" taskname:"Leatherworking_Tier1_Hide_Gloves_Set_2".
        LVL:6 ,name:"Darkleather Bracers +1" taskname:"Leatherworking_Tier1_Darkleather_Gloves_Set_1".
        LVL:6 ,name:"Diabolist's Darkleather Bracers +1" taskname:"Leatherworking_Tier1_Darkleather_Gloves_Set_2".
        LVL:6 ,name:"Hide Bracers +1" taskname:"Leatherworking_Tier1_Hide_Gloves_Set_1".
        LVL:6 ,name:"Leather Bracers +1" taskname:"Leatherworking_Tier1_Leather_Gloves_Set_1".
        LVL:6 ,name:"Outcast's Darkleather Bracers +1" taskname:"Leatherworking_Tier1_Darkleather_Gloves_Set_3".
        LVL:6 ,name:"Prowler's Leather Bracers +1" taskname:"Leatherworking_Tier1_Leather_Gloves_Set_3".
        LVL:6 ,name:"Vandal's Leather Bracers +1" taskname:"Leatherworking_Tier1_Leather_Gloves_Set_2".
        LVL:6 ,name:"Warden's Hide Bracers +1" taskname:"Leatherworking_Tier1_Hide_Gloves_Set_3".
        LVL:7 ,name:"Upgrade Skinner" taskname:"Leatherworking_Tier2_Recruit_Journeyman".
        LVL:7 ,name:"Tough Pelt Trading" taskname:"Leatherworking_Tier2_Gather_Special".
        LVL:7 ,name:"Cure Tough Pelts" taskname:"Leatherworking_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass Tough Pelt Curing" taskname:"Leatherworking_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Detailed Leather Shirt" taskname:"Leatherworking_Tier2_Leather_Shirt".
        LVL:7 ,name:"Detailed Leather Tunic" taskname:"Leatherworking_Tier2_Leather_Shirt_Set2".
        LVL:7 ,name:"Darkleather Boots +2" taskname:"Leatherworking_Tier2_Darkleather_Boots_Set_1".
        LVL:7 ,name:"Hide Boots +2" taskname:"Leatherworking_Tier2_Hide_Boots_Set_1".
        LVL:7 ,name:"Leather Boots +2" taskname:"Leatherworking_Tier2_Leather_Boots_Set_1".
        LVL:8 ,name:"Tough Leather Trading" taskname:"Leatherworking_Tier2_Refine_Special".
        LVL:8 ,name:"Lesser Critical Strike Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Crit_01".
        LVL:8 ,name:"Lesser Deflection Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Deflect_01".
        LVL:8 ,name:"Detailed Leather Pants" taskname:"Leatherworking_Tier2_Leather_Pants_1".
        LVL:8 ,name:"Detailed Leather Trousers" taskname:"Leatherworking_Tier2_Leather_Pants_1_Set2".
        LVL:8 ,name:"Darkleather Armor +2" taskname:"Leatherworking_Tier2_Darkleather_Armor_Set_1".
        LVL:8 ,name:"Hide Armor +2" taskname:"Leatherworking_Tier2_Hide_Armor_Set_1".
        LVL:8 ,name:"Leather Armor +2" taskname:"Leatherworking_Tier2_Leather_Armor_Set_1".
        LVL:9 ,name:"Darkleather Helm +2" taskname:"Leatherworking_Tier2_Darkleather_Helm_Set_1".
        LVL:9 ,name:"Hide Helm +2" taskname:"Leatherworking_Tier2_Hide_Helm_Set_1".
        LVL:9 ,name:"Leather Helm +2" taskname:"Leatherworking_Tier2_Leather_Helm_Set_1".
        LVL:9 ,name:"Darkleather Bracers +2" taskname:"Leatherworking_Tier2_Darkleather_Gloves_Set_1".
        LVL:9 ,name:"Hide Bracers +2" taskname:"Leatherworking_Tier2_Hide_Gloves_Set_1".
        LVL:9 ,name:"Leather Bracers +2" taskname:"Leatherworking_Tier2_Leather_Gloves_Set_1".
        LVL:10 ,name:"Superb Leather Shirt" taskname:"Leatherworking_Tier2_Leather_Shirt_2".
        LVL:10 ,name:"Superb Leather Tunic" taskname:"Leatherworking_Tier2_Leather_Shirt_2_Set2".
        LVL:10 ,name:"Archer's Hide Boots +2" taskname:"Leatherworking_Tier2_Hide_Boots_Set_2".
        LVL:10 ,name:"Diabolist's Darkleather Boots +2" taskname:"Leatherworking_Tier2_Darkleather_Boots_Set_2".
        LVL:10 ,name:"Outcast's Darkleather Boots +2" taskname:"Leatherworking_Tier2_Darkleather_Boots_Set_3".
        LVL:10 ,name:"Prowler's Leather Boots +2" taskname:"Leatherworking_Tier2_Leather_Boots_Set_3".
        LVL:10 ,name:"Vandal's Leather Boots +2" taskname:"Leatherworking_Tier2_Leather_Boots_Set_2".
        LVL:10 ,name:"Warden's Hide Boots +2" taskname:"Leatherworking_Tier2_Hide_Boots_Set_3".
        LVL:11 ,name:"Superb Leather Pants" taskname:"Leatherworking_Tier2_Leather_Pants_2".
        LVL:11 ,name:"Superb Leather Trousers" taskname:"Leatherworking_Tier2_Leather_Pants_2_Set2".
        LVL:11 ,name:"Archer's Hide Armor +2" taskname:"Leatherworking_Tier2_Hide_Armor_Set_2".
        LVL:11 ,name:"Diabolist's Darkleather Armor +2" taskname:"Leatherworking_Tier2_Darkleather_Armor_Set_2".
        LVL:11 ,name:"Outcast's Darkleather Armor +2" taskname:"Leatherworking_Tier2_Darkleather_Armor_Set_3".
        LVL:11 ,name:"Prowler's Leather Armor +2" taskname:"Leatherworking_Tier2_Leather_Armor_Set_3".
        LVL:11 ,name:"Vandal's Leather Armor +2" taskname:"Leatherworking_Tier2_Leather_Armor_Set_2".
        LVL:11 ,name:"Warden's Hide Armor +2" taskname:"Leatherworking_Tier2_Hide_Armor_Set_3".
        LVL:12 ,name:"Archer's Hide Bracers +2" taskname:"Leatherworking_Tier2_Hide_Gloves_Set_2".
        LVL:12 ,name:"Diabolist's Darkleather Bracers +2" taskname:"Leatherworking_Tier2_Darkleather_Gloves_Set_2".
        LVL:12 ,name:"Outcast's Darkleather Bracers +2" taskname:"Leatherworking_Tier2_Darkleather_Gloves_Set_3".
        LVL:12 ,name:"Prowler's Leather Bracers +2" taskname:"Leatherworking_Tier2_Leather_Gloves_Set_3".
        LVL:12 ,name:"Vandal's Leather Bracers +2" taskname:"Leatherworking_Tier2_Leather_Gloves_Set_2".
        LVL:12 ,name:"Warden's Hide Bracers +2" taskname:"Leatherworking_Tier2_Hide_Gloves_Set_3".
        LVL:13 ,name:"Archer's Hide Helm +2" taskname:"Leatherworking_Tier2_Hide_Helm_Set_2".
        LVL:13 ,name:"Diabolist's Darkleather Helm +2" taskname:"Leatherworking_Tier2_Darkleather_Helm_Set_2".
        LVL:13 ,name:"Outcast's Darkleather Helm +2" taskname:"Leatherworking_Tier2_Darkleather_Helm_Set_3".
        LVL:13 ,name:"Prowler's Leather Helm +2" taskname:"Leatherworking_Tier2_Leather_Helm_Set_3".
        LVL:13 ,name:"Vandal's Leather Helm +2" taskname:"Leatherworking_Tier2_Leather_Helm_Set_2".
        LVL:13 ,name:"Warden's Hide Helm +2" taskname:"Leatherworking_Tier2_Hide_Helm_Set_3".
        LVL:14 ,name:"Upgrade Tanner" taskname:"Leatherworking_Tier3_Recruit_Master".
        LVL:14 ,name:"Exotic Pelt Trading" taskname:"Leatherworking_Tier3_Gather_Special".
        LVL:14 ,name:"Cure Exotic Pelts" taskname:"Leatherworking_Tier3_Refine_Basic".
        LVL:14 ,name:"Mass Exotic Pelt Curing" taskname:"Leatherworking_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Ornate Leather Shirt" taskname:"Leatherworking_Tier3_Leather_Shirt".
        LVL:14 ,name:"Ornate Leather Tunic" taskname:"Leatherworking_Tier3_Leather_Shirt_Set2".
        LVL:14 ,name:"Darkleather Boots +4" taskname:"Leatherworking_Tier3_Darkleather_Boots_Set_1".
        LVL:14 ,name:"Hide Boots +4" taskname:"Leatherworking_Tier3_Hide_Boots_Set_1".
        LVL:14 ,name:"Leather Boots +4" taskname:"Leatherworking_Tier3_Leather_Boots_Set_1".
        LVL:15 ,name:"Exotic Leather Trading" taskname:"Leatherworking_Tier3_Refine_Special".
        LVL:15 ,name:"Critical Strike Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Crit_02".
        LVL:15 ,name:"Deflection Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Deflect_02".
        LVL:15 ,name:"Ornate Leather Pants" taskname:"Leatherworking_Tier3_Leather_Pants".
        LVL:15 ,name:"Ornate Leather Trousers" taskname:"Leatherworking_Tier3_Leather_Pants_Set2".
        LVL:15 ,name:"Fancy Leather Shirt" taskname:"Leatherworking_Tier3_Leather_Shirt2".
        LVL:15 ,name:"Fancy Leather Tunic" taskname:"Leatherworking_Tier3_Leather_Shirt2_Set2".
        LVL:15 ,name:"Darkleather Armor +4" taskname:"Leatherworking_Tier3_Darkleather_Armor_Set_1".
        LVL:15 ,name:"Hide Armor +4" taskname:"Leatherworking_Tier3_Hide_Armor_Set_1".
        LVL:15 ,name:"Leather Armor +4" taskname:"Leatherworking_Tier3_Leather_Armor_Set_1".
        LVL:16 ,name:"Fancy Leather Pants" taskname:"Leatherworking_Tier3_Leather_Pants2".
        LVL:16 ,name:"Fancy Leather Trousers" taskname:"Leatherworking_Tier3_Leather_Pants2_Set2".
        LVL:16 ,name:"Darkleather Helm +4" taskname:"Leatherworking_Tier3_Darkleather_Helm_Set_1".
        LVL:16 ,name:"Hide Helm +4" taskname:"Leatherworking_Tier3_Hide_Helm_Set_1".
        LVL:16 ,name:"Leather Helm +4" taskname:"Leatherworking_Tier3_Leather_Helm_Set_1".
        LVL:16 ,name:"Darkleather Bracers +4" taskname:"Leatherworking_Tier3_Darkleather_Gloves_Set_1".
        LVL:16 ,name:"Hide Bracers +4" taskname:"Leatherworking_Tier3_Hide_Gloves_Set_1".
        LVL:16 ,name:"Leather Bracers +4" taskname:"Leatherworking_Tier3_Leather_Gloves_Set_1".
        LVL:17 ,name:"Archer's Hide Boots +4" taskname:"Leatherworking_Tier3_Hide_Boots_Set_2".
        LVL:17 ,name:"Diabolist's Darkleather Boots +4" taskname:"Leatherworking_Tier3_Darkleather_Boots_Set_2".
        LVL:17 ,name:"Outcast's Darkleather Boots +4" taskname:"Leatherworking_Tier3_Darkleather_Boots_Set_3".
        LVL:17 ,name:"Prowler's Leather Boots +4" taskname:"Leatherworking_Tier3_Leather_Boots_Set_3".
        LVL:17 ,name:"Vandal's Leather Boots +4" taskname:"Leatherworking_Tier3_Leather_Boots_Set_2".
        LVL:17 ,name:"Warden's Hide Boots +4" taskname:"Leatherworking_Tier3_Hide_Boots_Set_3".
        LVL:18 ,name:"Emperor's Leather Pants" taskname:"Leatherworking_Tier3_Leather_Pants_Invisible".
        LVL:18 ,name:"Emperor's Leather Shirt" taskname:"Leatherworking_Tier3_Leather_Shirt_Invisible".
        LVL:18 ,name:"Archer's Hide Armor +4" taskname:"Leatherworking_Tier3_Hide_Armor_Set_2".
        LVL:18 ,name:"Diabolist's Darkleather Armor +4" taskname:"Leatherworking_Tier3_Darkleather_Armor_Set_2".
        LVL:18 ,name:"Outcast's Darkleather Armor +4" taskname:"Leatherworking_Tier3_Darkleather_Armor_Set_3".
        LVL:18 ,name:"Prowler's Leather Armor +4" taskname:"Leatherworking_Tier3_Leather_Armor_Set_3".
        LVL:18 ,name:"Vandal's Leather Armor +4" taskname:"Leatherworking_Tier3_Leather_Armor_Set_2".
        LVL:18 ,name:"Warden's Hide Armor +4" taskname:"Leatherworking_Tier3_Hide_Armor_Set_3".
        LVL:19 ,name:"Archer's Hide Helm +4" taskname:"Leatherworking_Tier3_Hide_Helm_Set_2".
        LVL:19 ,name:"Diabolist's Darkleather Helm +4" taskname:"Leatherworking_Tier3_Darkleather_Helm_Set_2".
        LVL:19 ,name:"Outcast's Darkleather Helm +4" taskname:"Leatherworking_Tier3_Darkleather_Helm_Set_3".
        LVL:19 ,name:"Prowler's Leather Helm +4" taskname:"Leatherworking_Tier3_Leather_Helm_Set_3".
        LVL:19 ,name:"Vandal's Leather Helm +4" taskname:"Leatherworking_Tier3_Leather_Helm_Set_2".
        LVL:19 ,name:"Warden's Hide Helm +4" taskname:"Leatherworking_Tier3_Hide_Helm_Set_3".
        LVL:19 ,name:"Archer's Hide Bracers +4" taskname:"Leatherworking_Tier3_Hide_Gloves_Set_2".
        LVL:19 ,name:"Diabolist's Darkleather Bracers +4" taskname:"Leatherworking_Tier3_Darkleather_Gloves_Set_2".
        LVL:19 ,name:"Outcast's Darkleather Bracers +4" taskname:"Leatherworking_Tier3_Darkleather_Gloves_Set_3".
        LVL:19 ,name:"Prowler's Leather Bracers +4" taskname:"Leatherworking_Tier3_Leather_Gloves_Set_3".
        LVL:19 ,name:"Vandal's Leather Bracers +4" taskname:"Leatherworking_Tier3_Leather_Gloves_Set_2".
        LVL:19 ,name:"Warden's Hide Bracers +4" taskname:"Leatherworking_Tier3_Hide_Gloves_Set_3".
        LVL:19 ,name:"Boots of the Covert Brigand" taskname:"Leatherworking_Special_Leather_Feet_Brigand".
        LVL:19 ,name:"Boots of the Daring Outlaw" taskname:"Leatherworking_Special_Hide_Feet_Outlaw".
        LVL:19 ,name:"Boots of the Nefarious Theurgist" taskname:"Leatherworking_Special_Darkleather_Feet_Theurgist".
        LVL:20 ,name:"Greater Critical Strike Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Crit".
        LVL:20 ,name:"Greater Deflection Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Deflect".
        LVL:20 ,name:"Gloves of the Covert Brigand" taskname:"Leatherworking_Special_Leather_Arms_Brigand".
        LVL:20 ,name:"Gloves of the Daring Outlaw" taskname:"Leatherworking_Special_Hide_Arms_Outlaw".
        LVL:20 ,name:"Gloves of the Nefarious Theurgist" taskname:"Leatherworking_Special_Darkleather_Arms_Theurgist".
        LVL:21 ,name:"Cure Aberrant Pelts" taskname:"Leatherworking_Tier4_Refine_Basic".
        LVL:21 ,name:"Mass Aberrant Pelt Curing" taskname:"Leatherworking_Tier4_Refine_Basic_Mass".
        LVL:21 ,name:"Elemental Darkleather Boots" taskname:"Leatherworking_Tier4_Darkleather_Boots_Set_1".
        LVL:21 ,name:"Elemental Hide Boots" taskname:"Leatherworking_Tier4_Hide_Boots_Set_1".
        LVL:21 ,name:"Elemental Leather Boots" taskname:"Leatherworking_Tier4_Leather_Boots_Set_1".
        LVL:22 ,name:"Aberrant Pelt Trading" taskname:"Leatherworking_Tier4_Gather_Special".
        LVL:22 ,name:"Aberrant Leather Trading" taskname:"Leatherworking_Tier4_Refine_Special".
        LVL:22 ,name:"Elemental Leather Shirt" taskname:"Leatherworking_Tier4_Leather_Shirt2".
        LVL:22 ,name:"Elemental Leather Tunic" taskname:"Leatherworking_Tier4_Leather_Shirt2_Set2".
        LVL:22 ,name:"Elemental Darkleather Armor" taskname:"Leatherworking_Tier4_Darkleather_Armor_Set_1".
        LVL:22 ,name:"Elemental Hide Armor" taskname:"Leatherworking_Tier4_Hide_Armor_Set_1".
        LVL:22 ,name:"Elemental Leather Armor" taskname:"Leatherworking_Tier4_Leather_Armor_Set_1".
        LVL:23 ,name:"Elemental Leather Pants" taskname:"Leatherworking_Tier4_Leather_Pants2".
        LVL:23 ,name:"Elemental Leather Trousers" taskname:"Leatherworking_Tier4_Leather_Pants2_Set2".
        LVL:23 ,name:"Elemental Darkleather Helm" taskname:"Leatherworking_Tier4_Darkleather_Helm_Set_1".
        LVL:23 ,name:"Elemental Hide Helm" taskname:"Leatherworking_Tier4_Hide_Helm_Set_1".
        LVL:23 ,name:"Elemental Leather Helm" taskname:"Leatherworking_Tier4_Leather_Helm_Set_1".
        LVL:23 ,name:"Elemental Darkleather Bracers" taskname:"Leatherworking_Tier4_Darkleather_Gloves_Set_1".
        LVL:23 ,name:"Elemental Hide Bracers" taskname:"Leatherworking_Tier4_Hide_Gloves_Set_1".
        LVL:23 ,name:"Elemental Leather Bracers" taskname:"Leatherworking_Tier4_Leather_Gloves_Set_1".
        LVL:24 ,name:"Archer's Elemental Hide Armor" taskname:"Leatherworking_Tier4_Hide_Armor_Set_2".
        LVL:24 ,name:"Diabolist's Elemental Darkleather Armor" taskname:"Leatherworking_Tier4_Darkleather_Armor_Set_2".
        LVL:24 ,name:"Outcast's Elemental Darkleather Armor" taskname:"Leatherworking_Tier4_Darkleather_Armor_Set_3".
        LVL:24 ,name:"Prowler's Elemental Leather Armor" taskname:"Leatherworking_Tier4_Leather_Armor_Set_3".
        LVL:24 ,name:"Vandal's Elemental Leather Armor" taskname:"Leatherworking_Tier4_Leather_Armor_Set_2".
        LVL:24 ,name:"Warden's Elemental Hide Armor" taskname:"Leatherworking_Tier4_Hide_Armor_Set_3".
        LVL:24 ,name:"Archer's Elemental Hide Boots" taskname:"Leatherworking_Tier4_Hide_Boots_Set_2".
        LVL:24 ,name:"Diabolist's Elemental Darkleather Boots" taskname:"Leatherworking_Tier4_Darkleather_Boots_Set_2".
        LVL:24 ,name:"Outcast's Elemental Darkleather Boots" taskname:"Leatherworking_Tier4_Darkleather_Boots_Set_3".
        LVL:24 ,name:"Prowler's Elemental Leather Boots" taskname:"Leatherworking_Tier4_Leather_Boots_Set_3".
        LVL:24 ,name:"Vandal's Elemental Leather Boots" taskname:"Leatherworking_Tier4_Leather_Boots_Set_2".
        LVL:24 ,name:"Warden's Elemental Hide Boots" taskname:"Leatherworking_Tier4_Hide_Boots_Set_3".
        LVL:25 ,name:"Major Critical Strike Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Crit_03".
        LVL:25 ,name:"Major Deflection Armor Kit" taskname:"Leatherworking_Special_Reinforcement_Kit_Deflect_03".
        LVL:25 ,name:"Archer's Elemental Hide Helm" taskname:"Leatherworking_Tier4_Hide_Helm_Set_2".
        LVL:25 ,name:"Diabolist's Elemental Darkleather Helm" taskname:"Leatherworking_Tier4_Darkleather_Helm_Set_2".
        LVL:25 ,name:"Outcast's Elemental Darkleather Helm" taskname:"Leatherworking_Tier4_Darkleather_Helm_Set_3".
        LVL:25 ,name:"Prowler's Elemental Leather Helm" taskname:"Leatherworking_Tier4_Leather_Helm_Set_3".
        LVL:25 ,name:"Vandal's Elemental Leather Helm" taskname:"Leatherworking_Tier4_Leather_Helm_Set_2".
        LVL:25 ,name:"Warden's Elemental Hide Helm" taskname:"Leatherworking_Tier4_Hide_Helm_Set_3".
        LVL:25 ,name:"Archer's Elemental Hide Bracers" taskname:"Leatherworking_Tier4_Hide_Gloves_Set_2".
        LVL:25 ,name:"Diabolist's Elemental Darkleather Bracers" taskname:"Leatherworking_Tier4_Darkleather_Gloves_Set_2".
        LVL:25 ,name:"Outcast's Elemental Darkleather Bracers" taskname:"Leatherworking_Tier4_Darkleather_Gloves_Set_3".
        LVL:25 ,name:"Prowler's Elemental Leather Bracers" taskname:"Leatherworking_Tier4_Leather_Gloves_Set_3".
        LVL:25 ,name:"Vandal's Elemental Leather Bracers" taskname:"Leatherworking_Tier4_Leather_Gloves_Set_2".
        LVL:25 ,name:"Warden's Elemental Hide Bracers" taskname:"Leatherworking_Tier4_Hide_Gloves_Set_3".
 
Rares:
        Leatherworking_Special_T06_Hunter_Support_Gloves : "Gauntlets of the Forest Lord",
        Leatherworking_Special_Leather_Arms_Brigand : "Gloves of the Covert Brigand",
        Leatherworking_Special_Hide_Arms_Outlaw : "Gloves of the Daring Outlaw",
        Leatherworking_Special_T06_Hunter_Ranged_Gloves : "Grand Warden's Gauntlets",
        Leatherworking_Special_T06_Trickster_Stealth_Gloves : "Master Assassin's Bracers",
        Leatherworking_Special_T06_Hunter_Melee_Gloves : "Royal Guard's Gauntlets",
        Leatherworking_Special_T06_Trickster_Burst_Gloves : "Sinister Shade's Bracers",
        Leatherworking_Special_T06_Trickster_Sustained_Gloves : "Swashbuckling Captain's Bracers",
        Leatherworking_Tier1_Hide_Boots_Special_1 : "Hide Boots +1",
        Leatherworking_Tier1_Leather_Boots_Special_1 : "Leather Boots +1",
        Leatherworking_Tier1_Hide_Armor_Special_1 : "Hide Armor +1",
        Leatherworking_Tier1_Leather_Armor_Special_1 : "Leather Armor +1",
        Leatherworking_Tier1_Hide_Gloves_Special : "Hide Bracers +1",
        Leatherworking_Tier1_Leather_Gloves_Special : "Leather Bracers +1",
        Leatherworking_Tier1_Hide_Helm_Special_1 : "Hide Helm +1",
        Leatherworking_Tier1_Leather_Helm_Special_1 : "Leather Helm +1",
        Leatherworking_Tier2_Hide_Armor_Special_2 : "Hide Armor +2",
        Leatherworking_Tier2_Hide_Boots_Special_2 : "Hide Boots +2",
        Leatherworking_Tier2_Leather_Armor_Special_2 : "Leather Armor +2",
        Leatherworking_Tier2_Leather_Boots_Special_2 : "Leather Boots +2",
        Leatherworking_Tier2_Hide_Gloves_Special_2 : "Hide Bracers +2",
        Leatherworking_Tier2_Leather_Gloves_Special_2 : "Leather Bracers +2",
        Leatherworking_Tier2_Hide_Helm_Special_2 : "Hide Helm +2",
        Leatherworking_Tier2_Leather_Helm_Special_2 : "Leather Helm +2",
        Leatherworking_Tier2_Hide_Armor_Special_3 : "Hide Armor +3",
        Leatherworking_Tier2_Hide_Boots_Special_3 : "Hide Boots +3",
        Leatherworking_Tier2_Leather_Armor_Special_3 : "Leather Armor +3",
        Leatherworking_Tier2_Leather_Boots_Special_3 : "Leather Boots +3",
        Leatherworking_Tier2_Leather_Shirt_Special : "Embroidered Leather Shirt",
        Leatherworking_Tier2_Leather_Tunic_Special : "Embroidered Leather Tunic",
        Leatherworking_Tier2_Leather_Gloves_Special_3 : "Hide Bracers +3",
        Leatherworking_Tier2_Leather_Gloves_Special_3 : "Leather Bracers +3",
        Leatherworking_Tier2_Leather_Pants_Special_2 : "Embroidered Leather Pants",
        Leatherworking_Tier2_Leather_Trousers_Special_2 : "Embroidered Leather Trousers",
        Leatherworking_Tier2_Leather_Helm_Special_3 : "Hide Helm +3",
        Leatherworking_Tier2_Leather_Helm_Special_3 : "Leather Helm +3",
        Leatherworking_Tier3_Hide_Armor_Special_4 : "Hide Armor +4",
        Leatherworking_Tier3_Hide_Boots_Special_4 : "Hide Boots +4",
        Leatherworking_Tier3_Leather_Gloves_Special_4 : "Hide Bracers +4",
        Leatherworking_Tier3_Hide_Helm_Special_4 : "Hide Helm +4",
        Leatherworking_Tier3_Leather_Armor_Special_4 : "Leather Armor +4",
        Leatherworking_Tier3_Leather_Boots_Special_4 : "Leather Boots +4",
        Leatherworking_Tier3_Leather_Gloves_Special_4 : "Leather Bracers +4",
        Leatherworking_Tier3_Leather_Helm_Special_4 : "Leather Helm +4",
        Leatherworking_Tier3_Hide_Boots_Special_5 : "Hide Boots +5",
        Leatherworking_Tier3_Leather_Boots_Special_5 : "Leather Boots +5",
        Leatherworking_Tier3_Hide_Armor_Special_5 : "Hide Armor +5",
        Leatherworking_Tier3_Leather_Armor_Special_5 : "Leather Armor +5",
        Leatherworking_Tier3_Leather_Shirt_Special : "Elegant Leather Shirt",
        Leatherworking_Tier3_Leather_Tunic_Special : "Elegant Leather Tunic",
        Leatherworking_Tier3_Hide_Gloves_Special_5 : "Hide Bracers +5",
        Leatherworking_Tier3_Leather_Gloves_Special_5 : "Leather Bracers +5",
        Leatherworking_Tier3_Leather_Pants_Special : "Elegant Leather Pants",
        Leatherworking_Tier3_Leather_Trousers_Special : "Elegant Leather Trousers",
        Leatherworking_Tier3_Hide_Helm_Speical_5 : "Hide Helm +5",
        Leatherworking_Tier3_Leather_Helm_Special_5 : "Leather Helm +5",
        Leatherworking_Tier3_Leather_Pants_Special_2 : "Exquisite Leather Pants",
        Leatherworking_Tier3_Leather_Shirt_Special_2 : "Exquisite Leather Shirt",
        Leatherworking_Tier3_Leather_Pants_Special_2 : "Exquisite Leather Trousers",
        Leatherworking_Tier3_Leather_Tunic_Special_2 : "Exquisite Leather Tunic",
        Leatherworking_Tier3_Hide_Armor_Special_6 : "Hide Armor +6",
        Leatherworking_Tier3_Hide_Boots_Special_6 : "Hide Boots +6",
        Leatherworking_Tier3_Hide_Gloves_Special_6 : "Hide Bracers +6",
        Leatherworking_Tier3_Hide_Helm_Special_6 : "Hide Helm +6",
        Leatherworking_Tier3_Leather_Armor_Special_6 : "Leather Armor +6",
        Leatherworking_Tier3_Leather_Boots_Special_6 : "Leather Boots +6",
        Leatherworking_Tier3_Leather_Gloves_Special_6 : "Leather Bracers +6",
        Leatherworking_Tier3_Leather_Helm_Special_6 : "Leather Helm +6",
    },
    Armorsmithing_Med : { // Mailsmithing
        Med_Armorsmithing_Tier0_Intro : "Hire your first Prospector",
        LVL:1 ,name:"Forge Iron Rings and Scales" taskname:"Med_Armorsmithing_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass Iron Rings and Scales forging" taskname:"Med_Armorsmithing_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Chain Gambeson" taskname:"Med_Armorsmithing_Tier1_Chain_Shirt_1_Set2".
        LVL:1 ,name:"Chain Shirt" taskname:"Med_Armorsmithing_Tier1_Chain_Shirt_1".
        LVL:1 ,name:"Scale Gambeson" taskname:"Med_Armorsmithing_Tier1_Scale_Shirt_1_Set2".
        LVL:1 ,name:"Scale Shirt" taskname:"Med_Armorsmithing_Tier1_Scale_Shirt_1".
        LVL:1 ,name:"Chain Boots" taskname:"Med_Armorsmithing_Tier1_Chain_Boots_1".
        LVL:1 ,name:"Scale Boots" taskname:"Med_Armorsmithing_Tier1_Scale_Boots_1".
        LVL:2 ,name:"Iron Ore Trading" taskname:"Med_Armorsmithing_Tier1_Gather_Special".
        LVL:2 ,name:"Chain Pants" taskname:"Med_Armorsmithing_Tier1_Chain_Pants_1".
        LVL:2 ,name:"Chain Trousers" taskname:"Med_Armorsmithing_Tier1_Chain_Pants_1_Set2".
        LVL:2 ,name:"Scale Pants" taskname:"Med_Armorsmithing_Tier1_Scale_Pants_1".
        LVL:2 ,name:"Scale Trousers" taskname:"Med_Armorsmithing_Tier1_Scale_Pants_1_Set2".
        LVL:2 ,name:"Chain Armor" taskname:"Med_Armorsmithing_Tier1_Chain_Armor_1".
        LVL:2 ,name:"Scale Armor" taskname:"Med_Armorsmithing_Tier1_Scale_Armor_1".
        LVL:3 ,name:"Upgrade Mailsmith" taskname:"Med_Armorsmithing_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Iron Rings and Scales Trading" taskname:"Med_Armorsmithing_Tier1_Refine_Special".
        LVL:3 ,name:"Trade Iron Chisels for a Steel Chisel" taskname:"Med_Armorsmithing_Tier3_Trade_Chisel_Blue".
        LVL:3 ,name:"Trade Iron Hammers for a Steel Hammer." taskname:"Med_Armorsmithing_Tier3_Trade_Hammer_Blue".
        LVL:3 ,name:"Trade Iron Tongs for Steel Tongs" taskname:"Med_Armorsmithing_Tier3_Trade_Tongs_Blue".
        LVL:3 ,name:"Chain Gloves" taskname:"Med_Armorsmithing_Tier1_Chain_Gloves_1".
        LVL:3 ,name:"Scale Gauntlets" taskname:"Med_Armorsmithing_Tier1_Scale_Gloves_1".
        LVL:3 ,name:"Chain Boots +1" taskname:"Med_Armorsmithing_Tier1_Chain_Boots_Set_1".
        LVL:3 ,name:"Scale Boots +1" taskname:"Med_Armorsmithing_Tier1_Scale_Boots_Set_1".
        LVL:4 ,name:"Upgrade Master Mailsmith" taskname:"Med_Armorsmithing_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Trade Steel Chisels for a Mithral Chisel" taskname:"Med_Armorsmithing_Tier3_Trade_Chisel_Purple".
        LVL:4 ,name:"Trade Steel Hammers for a Mithral Hammer" taskname:"Med_Armorsmithing_Tier3_Trade_Hammer_Purple".
        LVL:4 ,name:"Trade Steel Tongs for Mithral Tongs" taskname:"Med_Armorsmithing_Tier3_Trade_Tongs_Purple".
        LVL:4 ,name:"Sturdy Chain Gambeson" taskname:"Med_Armorsmithing_Tier1_Chain_Shirt2_Set2".
        LVL:4 ,name:"Sturdy Chain Shirt" taskname:"Med_Armorsmithing_Tier1_Chain_Shirt2".
        LVL:4 ,name:"Sturdy Scale Gambeson" taskname:"Med_Armorsmithing_Tier1_Scale_Shirt2_Set2".
        LVL:4 ,name:"Sturdy Scale Shirt" taskname:"Med_Armorsmithing_Tier1_Scale_Shirt2".
        LVL:4 ,name:"Berserker's Scale Boots +1" taskname:"Med_Armorsmithing_Tier1_Scale_Boots_Set_2".
        LVL:4 ,name:"Prelate's Chain Boots +1" taskname:"Med_Armorsmithing_Tier1_Chain_Boots_Set_3".
        LVL:4 ,name:"Soldier's Scale Boots +1" taskname:"Med_Armorsmithing_Tier1_Scale_Boots_Set_3".
        LVL:4 ,name:"Zealot's Chain Boots +1" taskname:"Med_Armorsmithing_Tier1_Chain_Boots_Set_2".
        LVL:5 ,name:"Sturdy Chain Pants" taskname:"Med_Armorsmithing_Tier1_Chain_Pants".
        LVL:5 ,name:"Sturdy Chain Trousers" taskname:"Med_Armorsmithing_Tier1_Chain_Pants_Set2".
        LVL:5 ,name:"Sturdy Scale Pants" taskname:"Med_Armorsmithing_Tier1_Scale_Pants".
        LVL:5 ,name:"Sturdy Scale Trousers" taskname:"Med_Armorsmithing_Tier1_Scale_Pants_Set2".
        LVL:5 ,name:"Berserker's Scale Armor +1" taskname:"Med_Armorsmithing_Tier1_Scale_Armor_Set_2".
        LVL:5 ,name:"Chain Armor +1" taskname:"Med_Armorsmithing_Tier1_Chain_Armor_Set_1".
        LVL:5 ,name:"Prelate's Chain Armor +1" taskname:"Med_Armorsmithing_Tier1_Chain_Armor_Set_3".
        LVL:5 ,name:"Scale Armor +1" taskname:"Med_Armorsmithing_Tier1_Scale_Armor_Set_1".
        LVL:5 ,name:"Soldier's Scale Armor +1" taskname:"Med_Armorsmithing_Tier1_Scale_Armor_Set_3".
        LVL:5 ,name:"Zealot's Chain Armor +1" taskname:"Med_Armorsmithing_Tier1_Chain_Armor_Set_2".
        LVL:6 ,name:"Berserker's Scale Gauntlets +1" taskname:"Med_Armorsmithing_Tier1_Scale_Gloves_Set_2".
        LVL:6 ,name:"Chain Gloves +1" taskname:"Med_Armorsmithing_Tier1_Chain_Gloves_Set_1".
        LVL:6 ,name:"Prelate's Chain Gloves +1" taskname:"Med_Armorsmithing_Tier1_Chain_Gloves_Set_3".
        LVL:6 ,name:"Scale Gauntlets +1" taskname:"Med_Armorsmithing_Tier1_Scale_Gloves_Set_1".
        LVL:6 ,name:"Soldier's Scale Gauntlets +1" taskname:"Med_Armorsmithing_Tier1_Scale_Gloves_Set_3".
        LVL:6 ,name:"Zealot's Chain Gloves +1" taskname:"Med_Armorsmithing_Tier1_Chain_Gloves_Set_2".
        LVL:7 ,name:"Upgrade Prospector" taskname:"Med_Armorsmithing_Tier2_Recruit_Journeyman".
        LVL:7 ,name:"High Quality Iron Ore Trading" taskname:"Med_Armorsmithing_Tier2_Gather_Special".
        LVL:7 ,name:"Forge Steel Rings and Scales" taskname:"Med_Armorsmithing_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass Steel Rings and Scales Forging" taskname:"Med_Armorsmithing_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Detailed Chain Gambeson" taskname:"Med_Armorsmithing_Tier2_Chain_Shirt_Set2".
        LVL:7 ,name:"Detailed Chain Shirt" taskname:"Med_Armorsmithing_Tier2_Chain_Shirt".
        LVL:7 ,name:"Detailed Scale Gambeson" taskname:"Med_Armorsmithing_Tier2_Scale_Shirt_Set2".
        LVL:7 ,name:"Detailed Scale Shirt" taskname:"Med_Armorsmithing_Tier2_Scale_Shirt".
        LVL:7 ,name:"Chain Boots +2" taskname:"Med_Armorsmithing_Tier2_Chain_Boots_Set_1".
        LVL:7 ,name:"Scale Boots +2" taskname:"Med_Armorsmithing_Tier2_Scale_Boots_Set_1".
        LVL:8 ,name:"Steel Rings and Scales Trading" taskname:"Med_Armorsmithing_Tier2_Refine_Special".
        LVL:8 ,name:"Lesser Power Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Power_01".
        LVL:8 ,name:"Lesser Recovery Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Recovery_01".
        LVL:8 ,name:"Detailed Chain Pants" taskname:"Med_Armorsmithing_Tier2_Chain_Pants_1".
        LVL:8 ,name:"Detailed Chain Trousers" taskname:"Med_Armorsmithing_Tier2_Chain_Pants_1_Set2".
        LVL:8 ,name:"Detailed Scale Pants" taskname:"Med_Armorsmithing_Tier2_Scale_Pants_1".
        LVL:8 ,name:"Detailed Scale Trousers" taskname:"Med_Armorsmithing_Tier2_Scale_Pants_1_Set2".
        LVL:8 ,name:"Chain Armor +2" taskname:"Med_Armorsmithing_Tier2_Chain_Armor_Set_1".
        LVL:8 ,name:"Scale Armor +2" taskname:"Med_Armorsmithing_Tier2_Scale_Armor_Set_1".
        LVL:9 ,name:"Chain Helm +2" taskname:"Med_Armorsmithing_Tier2_Chain_Helm_Set_1".
        LVL:9 ,name:"Scale Helm +2" taskname:"Med_Armorsmithing_Tier2_Scale_Helm_Set_1".
        LVL:9 ,name:"Chain Gloves +2" taskname:"Med_Armorsmithing_Tier2_Chain_Gloves_Set_1".
        LVL:9 ,name:"Scale Gauntlets +2" taskname:"Med_Armorsmithing_Tier2_Scale_Gloves_Set_1".
        LVL:10 ,name:"Superb Chain Gambeson" taskname:"Med_Armorsmithing_Tier2_Chain_Shirt_2_Set2".
        LVL:10 ,name:"Superb Chain Shirt" taskname:"Med_Armorsmithing_Tier2_Chain_Shirt_2".
        LVL:10 ,name:"Superb Scale Gambeson" taskname:"Med_Armorsmithing_Tier2_Scale_Shirt_2_Set2".
        LVL:10 ,name:"Superb Scale Shirt" taskname:"Med_Armorsmithing_Tier2_Scale_Shirt_2".
        LVL:10 ,name:"Berserker's Scale Boots +2" taskname:"Med_Armorsmithing_Tier2_Scale_Boots_Set_2".
        LVL:10 ,name:"Prelate's Chain Boots +2" taskname:"Med_Armorsmithing_Tier2_Chain_Boots_Set_3".
        LVL:10 ,name:"Soldier's Scale Boots +2" taskname:"Med_Armorsmithing_Tier2_Scale_Boots_Set_3".
        LVL:10 ,name:"Zealot's Chain Boots +2" taskname:"Med_Armorsmithing_Tier2_Chain_Boots_Set_2".
        LVL:11 ,name:"Superb Chain Pants" taskname:"Med_Armorsmithing_Tier2_Chain_Pants_2".
        LVL:11 ,name:"Superb Chain Trousers" taskname:"Med_Armorsmithing_Tier2_Chain_Pants_2_Set2".
        LVL:11 ,name:"Superb Scale Pants" taskname:"Med_Armorsmithing_Tier2_Scale_Pants_2".
        LVL:11 ,name:"Superb Scale Trousers" taskname:"Med_Armorsmithing_Tier2_Scale_Pants_2_Set2".
        LVL:11 ,name:"Berserker's Scale Armor +2" taskname:"Med_Armorsmithing_Tier2_Scale_Armor_Set_2".
        LVL:11 ,name:"Prelate's Chain Armor +2" taskname:"Med_Armorsmithing_Tier2_Chain_Armor_Set_3".
        LVL:11 ,name:"Soldier's Scale Armor +2" taskname:"Med_Armorsmithing_Tier2_Scale_Armor_Set_3".
        LVL:11 ,name:"Zealot's Chain Armor +2" taskname:"Med_Armorsmithing_Tier2_Chain_Armor_Set_2".
        LVL:12 ,name:"Berserker's Scale Gauntlets +2" taskname:"Med_Armorsmithing_Tier2_Scale_Gloves_Set_2".
        LVL:12 ,name:"Prelate's Chain Gloves +2" taskname:"Med_Armorsmithing_Tier2_Chain_Gloves_Set_3".
        LVL:12 ,name:"Soldier's Scale Gauntlets +2" taskname:"Med_Armorsmithing_Tier2_Scale_Gloves_Set_3".
        LVL:12 ,name:"Zealot's Chain Gloves +2" taskname:"Med_Armorsmithing_Tier2_Chain_Gloves_Set_2".
        LVL:13 ,name:"Berserker's Scale Helm +2" taskname:"Med_Armorsmithing_Tier2_Scale_Helm_Set_2".
        LVL:13 ,name:"Prelate's Chain Helm +2" taskname:"Med_Armorsmithing_Tier2_Chain_Helm_Set_3".
        LVL:13 ,name:"Soldier's Scale Helm +2" taskname:"Med_Armorsmithing_Tier2_Scale_Helm_Set_3".
        LVL:13 ,name:"Zealot's Chain Helm +2" taskname:"Med_Armorsmithing_Tier2_Chain_Helm_Set_2".
        LVL:14 ,name:"Upgrade Blacksmith" taskname:"Med_Armorsmithing_Tier3_Recruit_Master".
        LVL:14 ,name:"Mithral Ore Trading" taskname:"Med_Armorsmithing_Tier3_Gather_Special".
        LVL:14 ,name:"Forge Mithral Rings and Scales" taskname:"Med_Armorsmithing_Tier3_Refine_Basic".
        LVL:14 ,name:"Mass Mithral Rings and Scales Forging" taskname:"Med_Armorsmithing_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Ornate Chain Gambeson" taskname:"Med_Armorsmithing_Tier3_Chain_Shirt_Set2".
        LVL:14 ,name:"Ornate Chain Shirt" taskname:"Med_Armorsmithing_Tier3_Chain_Shirt".
        LVL:14 ,name:"Ornate Scale Gambeson" taskname:"Med_Armorsmithing_Tier3_Scale_Shirt_Set2".
        LVL:14 ,name:"Ornate Scale Shirt" taskname:"Med_Armorsmithing_Tier3_Scale_Shirt".
        LVL:14 ,name:"Chain Boots +4" taskname:"Med_Armorsmithing_Tier3_Chain_Boots_Set_1".
        LVL:14 ,name:"Scale Boots +4" taskname:"Med_Armorsmithing_Tier3_Scale_Boots_Set_1".
        LVL:15 ,name:"Mithral Rings and Scales Trading" taskname:"Med_Armorsmithing_Tier3_Refine_Special".
        LVL:15 ,name:"Power Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Power_02".
        LVL:15 ,name:"Recovery Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Recovery_02".
        LVL:15 ,name:"Ornate Chain Pants" taskname:"Med_Armorsmithing_Tier3_Chain_Pants".
        LVL:15 ,name:"Ornate Chain Trousers" taskname:"Med_Armorsmithing_Tier3_Chain_Pants_Set2".
        LVL:15 ,name:"Ornate Scale Pants" taskname:"Med_Armorsmithing_Tier3_Scale_Pants".
        LVL:15 ,name:"Ornate Scale Trousers" taskname:"Med_Armorsmithing_Tier3_Scale_Pants_Set2".
        LVL:15 ,name:"Fancy Chain Gambeson" taskname:"Med_Armorsmithing_Tier3_Chain_Shirt2_Set2".
        LVL:15 ,name:"Fancy Chain Shirt" taskname:"Med_Armorsmithing_Tier3_Chain_Shirt2".
        LVL:15 ,name:"Fancy Scale Gambeson" taskname:"Med_Armorsmithing_Tier3_Scale_Shirt2_Set2".
        LVL:15 ,name:"Fancy Scale Shirt" taskname:"Med_Armorsmithing_Tier3_Scale_Shirt2".
        LVL:15 ,name:"Chain Armor +4" taskname:"Med_Armorsmithing_Tier3_Chain_Armor_Set_1".
        LVL:15 ,name:"Scale Armor +4" taskname:"Med_Armorsmithing_Tier3_Scale_Armor_Set_1".
        LVL:16 ,name:"Fancy Chain Pants" taskname:"Med_Armorsmithing_Tier3_Chain_Pants2".
        LVL:16 ,name:"Fancy Chain Trousers" taskname:"Med_Armorsmithing_Tier3_Chain_Pants2_Set2".
        LVL:16 ,name:"Fancy Scale Pants" taskname:"Med_Armorsmithing_Tier3_Scale_Pants2".
        LVL:16 ,name:"Fancy Scale Trousers" taskname:"Med_Armorsmithing_Tier3_Scale_Pants2_Set2".
        LVL:16 ,name:"Chain Helm +4" taskname:"Med_Armorsmithing_Tier3_Chain_Helm_Set_1".
        LVL:16 ,name:"Scale Helm +4" taskname:"Med_Armorsmithing_Tier3_Scale_Helm_Set_1".
        LVL:16 ,name:"Chain Gloves +4" taskname:"Med_Armorsmithing_Tier3_Chain_Gloves_Set_1".
        LVL:16 ,name:"Scale Gauntlets +4" taskname:"Med_Armorsmithing_Tier3_Scale_Gloves_Set_1".
        LVL:17 ,name:"Berserker's Scale Boots +4" taskname:"Med_Armorsmithing_Tier3_Scale_Boots_Set_2".
        LVL:17 ,name:"Prelate's Chain Boots +4" taskname:"Med_Armorsmithing_Tier3_Chain_Boots_Set_3".
        LVL:17 ,name:"Soldier's Scale Boots +4" taskname:"Med_Armorsmithing_Tier3_Scale_Boots_Set_3".
        LVL:17 ,name:"Zealot's Chain Boots +4" taskname:"Med_Armorsmithing_Tier3_Chain_Boots_Set_2".
        LVL:18 ,name:"Emperor's Mail Pants" taskname:"Med_Armorsmithing_Tier3_Mail_Pants_Invisible_2".
        LVL:18 ,name:"Emperor's Mail Shirt" taskname:"Med_Armorsmithing_Tier3_Mail_Shirt_Invisible".
        LVL:18 ,name:"Berserker's Scale Armor +4" taskname:"Med_Armorsmithing_Tier3_Scale_Armor_Set_2".
        LVL:18 ,name:"Prelate's Chain Armor +4" taskname:"Med_Armorsmithing_Tier3_Chain_Armor_Set_3".
        LVL:18 ,name:"Soldier's Scale Armor +4" taskname:"Med_Armorsmithing_Tier3_Scale_Armor_Set_3".
        LVL:18 ,name:"Zealot's Chain Armor +4" taskname:"Med_Armorsmithing_Tier3_Chain_Armor_Set_2".
        LVL:19 ,name:"Berserker's Scale Helm +4" taskname:"Med_Armorsmithing_Tier3_Scale_Helm_Set_2".
        LVL:19 ,name:"Prelate's Chain Helm +4" taskname:"Med_Armorsmithing_Tier3_Chain_Helm_Set_3".
        LVL:19 ,name:"Soldier's Scale Helm +4" taskname:"Med_Armorsmithing_Tier3_Scale_Helm_Set_3".
        LVL:19 ,name:"Zealot's Chain Helm +4" taskname:"Med_Armorsmithing_Tier3_Chain_Helm_Set_2".
        LVL:19 ,name:"Berserker's Scale Gauntlets +4" taskname:"Med_Armorsmithing_Tier3_Scale_Gloves_Set_2".
        LVL:19 ,name:"Prelate's Chain Gloves +4" taskname:"Med_Armorsmithing_Tier3_Chain_Gloves_Set_3".
        LVL:19 ,name:"Soldier's Scale Gauntlets +4" taskname:"Med_Armorsmithing_Tier3_Scale_Gloves_Set_3".
        LVL:19 ,name:"Zealot's Chain Gloves +4" taskname:"Med_Armorsmithing_Tier3_Chain_Gloves_Set_2".
        LVL:19 ,name:"Boots of the Divine Avenger" taskname:"Med_Armorsmithing_Special_Chain_Feet_Divine_Avenger".
        LVL:19 ,name:"Boots of the Dragonslayer" taskname:"Med_Armorsmithing_Special_Scale_Feet_Dragonslayer".
        LVL:20 ,name:"Greater Power Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Power".
        LVL:20 ,name:"Greater Recovery Armor Kit" taskname:"Med_Armorsmithing_Special_Reinforcement_Kit_Recovery".
        LVL:20 ,name:"Gloves of the Divine Avenger" taskname:"Med_Armorsmithing_Special_Chain_Arms_Divine_Avenger".
        LVL:20 ,name:"Gloves of the Dragonslayer" taskname:"Med_Armorsmithing_Special_Scale_Arms_Dragonslayer".
        LVL:21 ,name:"Forge Adamantine Rings and Scales" taskname:"Crafted_Med_Armorsmithing_T4_Refine_Basic".
        LVL:21 ,name:"Mass Adamantine Ring and Scale Forging" taskname:"Crafted_Med_Armorsmithing_T4_Refine_Basic_Mass".
        LVL:21 ,name:"Berserker's Elemental Chausses" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Dps".
        LVL:21 ,name:"Prelate's Elemental Chausses" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Tank".
        LVL:21 ,name:"Soldier's Elemental Chausses" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Pants_Tank".
        LVL:21 ,name:"Zealot's Elemental Chausses" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Pants_Dps".
        LVL:21 ,name:"Berserker's Elemental Chainmail" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Dps".
        LVL:21 ,name:"Prelate's Elemental Chainmail" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Tank".
        LVL:21 ,name:"Soldier's Elemental Chainmail" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Shirt_Tank".
        LVL:21 ,name:"Zealot's Elemental Chainmail" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Shirt_Dps".
        LVL:21 ,name:"Elemental Chain Helm" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Helm".
        LVL:21 ,name:"Elemental Scale Helm" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Helm".
        LVL:22 ,name:"Adamant Ore Trading" taskname:"Crafted_Med_Armorsmithing_T4_Gather_Special".
        LVL:22 ,name:"Adamantine Ring and Scales Trading" taskname:"Crafted_Med_Armorsmithing_T4_Refine_Special".
        LVL:22 ,name:"Elemental Chain Gauntlets" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Gloves".
        LVL:22 ,name:"Elemental Scale Gauntlets" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Gloves".
        LVL:22 ,name:"Elemental Chain Boots" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Boots".
        LVL:22 ,name:"Elemental Scale Boots" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Boots".
        LVL:23 ,name:"Elemental Chain Armor" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Armor".
        LVL:23 ,name:"Elemental Scale Armor" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Armor".
        LVL:24 ,name:"Berserker's Elemental Scale Helm" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Helm_Dps".
        LVL:24 ,name:"Prelate's Elemental Chain Helm" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Helm_Tank".
        LVL:24 ,name:"Soldier's Elemental Scale Helm" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Helm_Tank".
        LVL:24 ,name:"Zealot's Elemental Chain Helm" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Helm_Dps".
        LVL:24 ,name:"Berserker's Elemental Scale Gauntlets" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Gloves_Dps".
        LVL:24 ,name:"Prelate's Elemental Chain Gauntlets" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Gloves_Tank".
        LVL:24 ,name:"Soldier's Elemental Scale Gauntlets" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Gloves_Tank".
        LVL:24 ,name:"Zealot's Elemental Chain Gauntlets" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Gloves_Dps".
        LVL:24 ,name:"Berserker's Elemental Scale Boots" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Boots_Dps".
        LVL:24 ,name:"Prelate's Elemental Chain Boots" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Boots_Tank".
        LVL:24 ,name:"Soldier's Elemental Scale Boots" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Boots_Tank".
        LVL:24 ,name:"Zealot's Elemental Chain Boots" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Boots_Dps".
        LVL:25 ,name:"Major Power Armor Kit" taskname:"Crafted_Med_Armorsmithing_T4_Reinforcement_Kit_Power".
        LVL:25 ,name:"Major Recovery Armor Kit" taskname:"Crafted_Med_Armorsmithing_T4_Reinforcement_Kit_Recovery".
        LVL:25 ,name:"Berserker's Elemental Scale Armor" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Armor_Dps".
        LVL:25 ,name:"Prelate's Elemental Chain Armor" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Armor_Tank".
        LVL:25 ,name:"Soldier's Elemental Scale Armor" taskname:"Crafted_Med_Armorsmithing_Scale_T4_Green_Armor_Tank".
        LVL:25 ,name:"Zealot's Elemental Chain Armor" taskname:"Crafted_Med_Armorsmithing_Chain_T4_Green_Armor_Dps".
 
Rares:
        Med_Armorsmithing_Special_T06_Gwf_Damage_Gloves : "Avatar of War's Bracers",
        Med_Armorsmithing_Special_T06_Devoted_Faithful_Gloves : "Beacon of Faith's Gauntlets",
        Med_Armorsmithing_Special_Chain_Arms_Divine_Avenger : "Gloves of the Divine Avenger",
        Med_Armorsmithing_Special_Scale_Arms_Dragonslayer : "Gloves of the Dragonslayer",
        Med_Armorsmithing_Special_T06_Devoted_Righteous_Gloves : "Grand Templar's Gauntlets",
        Med_Armorsmithing_Special_T06_Devoted_Virtuous_Gloves : "Miracle Healer's Gauntlets",
        Med_Armorsmithing_Special_T06_Gwf_Tank_Gloves : "Titan's Bracers",
        Med_Armorsmithing_Special_T06_Gwf_Instigator_Gloves : "Vigilant Warlord's Bracers",
        Med_Armorsmithing_Tier1_Chain_Boots_Special_1 : "Chain Boots +1",
        Med_Armorsmithing_Tier1_Chain_Gloves_Special_1 : "Chain Gloves +1",
        Med_Armorsmithing_Tier1_Scale_Boots_Special_1 : "Scale Boots +1",
        Med_Armorsmithing_Tier1_Scale_Gloves_Special : "Scale Gauntlets +1",
        Med_Armorsmithing_Tier1_Chain_Armor_Special_1 : "Chain Armor +1",
        Med_Armorsmithing_Tier1_Scale_Armor_Special_1 : "Scale Armor +1",
        Med_Armorsmithing_Tier1_Chain_Helm_Special_1 : "Chain Helm +1",
        Med_Armorsmithing_Tier1_Scale_Helm_Special_1 : "Scale Helm +1",
        Med_Armorsmithing_Tier2_Chain_Armor_Special_2 : "Chain Armor +2",
        Med_Armorsmithing_Tier2_Chain_Boots_Special_2 : "Chain Boots +2",
        Med_Armorsmithing_Tier2_Scale_Armor_Special_2 : "Scale Armor +2",
        Med_Armorsmithing_Tier2_Scale_Boots_Special_2 : "Scale Boots +2",
        Med_Armorsmithing_Tier2_Chain_Gloves_Special_2 : "Chain Gloves +2",
        Med_Armorsmithing_Tier2_Scale_Gloves_Special_2 : "Scale Gauntlets +2",
        Med_Armorsmithing_Tier2_Chain_Helm_Special_2 : "Chain Helm +2",
        Med_Armorsmithing_Tier2_Scale_Helm_Special_2 : "Scale Helm +2",
        Med_Armorsmithing_Tier2_Chain_Armor_Special_3 : "Chain Armor +3",
        Med_Armorsmithing_Tier2_Chain_Boots_Special_3 : "Chain Boots +3",
        Med_Armorsmithing_Tier2_Scale_Armor_Special_3 : "Scale Armor +3",
        Med_Armorsmithing_Tier2_Scale_Boots_Special_3 : "Scale Boots +3",
        Med_Armorsmithing_Tier2_Chain_Gloves_Special_3 : "Chain Gloves +3",
        Med_Armorsmithing_Tier2_Scale_Gloves_Special_3 : "Scale Gauntlets +3",
        Med_Armorsmithing_Tier2_Chain_Helm_Special_3 : "Chain Helm +3",
        Med_Armorsmithing_Tier2_Chain_Gambeson_Special : "Embroidered Chain Gambeson",
        Med_Armorsmithing_Tier2_Chain_Pants_Special : "Embroidered Chain Pants",
        Med_Armorsmithing_Tier2_Chain_Shirt_Special : "Embroidered Chain Shirt",
        Med_Armorsmithing_Tier2_Chain_Trousers_Special : "Embroidered Chain Trousers",
        Med_Armorsmithing_Tier2_Scale_Gambeson_Special : "Embroidered Scale Gambeson",
        Med_Armorsmithing_Tier2_Scale_Pants_Special : "Embroidered Scale Pants",
        Med_Armorsmithing_Tier2_Scale_Shirt_Special : "Embroidered Scale Shirt",
        Med_Armorsmithing_Tier2_Scale_Trousers_Special : "Embroidered Scale Trousers",
        Med_Armorsmithing_Tier2_Scale_Helm_Special_3 : "Scale Helm +3",
        Med_Armorsmithing_Tier3_Chain_Armor_Special_4 : "Chain Armor +4",
        Med_Armorsmithing_Tier3_Chain_Boots_Special_4 : "Chain Boots +4",
        Med_Armorsmithing_Tier3_Chain_Gloves_Special_4 : "Chain Gloves +4",
        Med_Armorsmithing_Tier3_Scale_Armor_Special_4 : "Scale Armor +4",
        Med_Armorsmithing_Tier3_Scale_Boots_Special_4 : "Scale Boots +4",
        Med_Armorsmithing_Tier3_Scale_Gloves_Special_4 : "Scale Gauntlets +4",
        Med_Armorsmithing_Tier3_Chain_Helm_Special_4 : "Chain Helm +4",
        Med_Armorsmithing_Tier3_Scale_Helm_Special_4 : "Scale Helm +4",
        Med_Armorsmithing_Tier3_Chain_Boots_Special_5 : "Chain Boots +5",
        Med_Armorsmithing_Tier3_Scale_Boots_Special_5 : "Scale Boots +5",
        Med_Armorsmithing_Tier3_Chain_Armor_Special_5 : "Chain Armor +5",
        Med_Armorsmithing_Tier3_Scale_Armor_Special_5 : "Scale Arnor +5",
        Med_Armorsmithing_Tier3_Chain_Gloves_Special_5 : "Chain Gloves +5",
        Med_Armorsmithing_Tier3_Chain_Gambeson_Special : "Elegant Chain Gambeson",
        Med_Armorsmithing_Tier3_Chain_Shirt_Special : "Elegant Chain Shirt",
        Med_Armorsmithing_Tier3_Chain_Trousers_Special : "Elegant Chain Trousers",
        Med_Armorsmithing_Tier3_Scale_Gambeson_Special : "Elegant Scale Gambeson",
        Med_Armorsmithing_Tier3_Scale_Shirt_Special : "Elegant Scale Shirt",
        Med_Armorsmithing_Tier3_Scale_Trousers_Special : "Elegant Scale Trousers",
        Med_Armorsmithing_Tier3_Scale_Gloves_Special_5 : "Scale Gauntlets +5",
        Med_Armorsmithing_Tier3_Chain_Helm_Special : "Chain Helm +5",
        Med_Armorsmithing_Tier3_Chain_Pants_Special : "Elegant Chain Pants",
        Med_Armorsmithing_Tier3_Scale_Pants_Special : "Elegant Scale Pants",
        Med_Armorsmithing_Tier3_Scale_Helm_Special : "Scale Helm +5",
        Med_Armorsmithing_Tier3_Chain_Armor_Special_6 : "Chain Armor +6",
        Med_Armorsmithing_Tier3_Chain_Boots_Special_6 : "Chain Boots +6",
        Med_Armorsmithing_Tier3_Chain_Gloves_Special_6 : "Chain Gloves +6",
        Med_Armorsmithing_Tier3_Chain_Helm_Special_6 : "Chain Helm +6",
        Med_Armorsmithing_Tier3_Chain_Gambeson_Special_2 : "Exquisite Chain Gambeson",
        Med_Armorsmithing_Tier3_Chain_Pants_Special_2 : "Exquisite Chain Pants",
        Med_Armorsmithing_Tier3_Chain_Shirt_Special_2 : "Exquisite Chain Shirt",
        Med_Armorsmithing_Tier3_Chain_Trousers_Special_2 : "Exquisite Chain Trousers",
        Med_Armorsmithing_Tier3_Scale_Gambeson_Special_2 : "Exquisite Scale Gambeson",
        Med_Armorsmithing_Tier3_Scale_Pants_Special_2 : "Exquisite Scale Pants",
        Med_Armorsmithing_Tier3_Scale_Shirt_Special_2 : "Exquisite Scale Shirt",
        Med_Armorsmithing_Tier3_Scale_Trousers_Special_2 : "Exquisite Scale Trousers",
        Med_Armorsmithing_Tier3_Scale_Armor_Special_6 : "Scale Armor +6",
        Med_Armorsmithing_Tier3_Scale_Boots_Special_6 : "Scale Boots +6",
        Med_Armorsmithing_Tier3_Scale_Gloves_Special_6 : "Scale Gauntlets +6",
        Med_Armorsmithing_Tier3_Scale_Helm_Special_6 : "Scale Helm +6",
    },
    Armorsmithing_Heavy : { // Platesmithing
        Hvy_Armorsmithing_Tier0_Intro : "Hire your first Miner",
        LVL:1 ,name:"Forge Iron Plates" taskname:"Hvy_Armorsmithing_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass Iron Plate forging" taskname:"Hvy_Armorsmithing_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier1_Plate_Shirt_1_Set2".
        LVL:1 ,name:"Plate Shirt" taskname:"Hvy_Armorsmithing_Tier1_Plate_Shirt_1".
        LVL:1 ,name:"Iron Shield" taskname:"Hvy_Armorsmithing_Tier1_Shield_1".
        LVL:1 ,name:"Plate Boots" taskname:"Hvy_Armorsmithing_Tier1_Plate_Boots_1".
        LVL:2 ,name:"Iron Ore Trading" taskname:"Hvy_Armorsmithing_Tier1_Gather_Special".
        LVL:2 ,name:"Plate Pants" taskname:"Hvy_Armorsmithing_Tier1_Plate_Pants_1".
        LVL:2 ,name:"Plate Trousers" taskname:"Hvy_Armorsmithing_Tier1_Plate_Pants_1_Set2".
        LVL:2 ,name:"Plate Armor" taskname:"Hvy_Armorsmithing_Tier1_Plate_Armor_1".
        LVL:3 ,name:"Upgrade Platesmith" taskname:"Hvy_Armorsmithing_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Iron Plate Trading" taskname:"Hvy_Armorsmithing_Tier1_Refine_Special".
        LVL:3 ,name:"Trade Iron Anvils for a Steel Anvil." taskname:"Hvy_Armorsmithing_Tier3_Trade_Anvil_Blue".
        LVL:3 ,name:"Trade Iron Bellows for Steel Bellows" taskname:"Hvy_Armorsmithing_Tier3_Trade_Bellows_Blue".
        LVL:3 ,name:"Trade Iron Hammers for a Steel Hammer" taskname:"Hvy_Armorsmithing_Tier3_Trade_Hammer_Blue".
        LVL:3 ,name:"Iron Shield +1" taskname:"Hvy_Armorsmithing_Tier1_Shield_Set_1".
        LVL:3 ,name:"Plate Gauntlets" taskname:"Hvy_Armorsmithing_Tier1_Plate_Gloves_1".
        LVL:3 ,name:"Plate Boots +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Boots_Set_1".
        LVL:4 ,name:"Upgrade Master Platesmith" taskname:"Hvy_Armorsmithing_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Trade Steel Anvils for a Mithral Anvil" taskname:"Hvy_Armorsmithing_Tier3_Trade_Anvil_Purple".
        LVL:4 ,name:"Trade Steel Bellows for Mithral Bellows" taskname:"Hvy_Armorsmithing_Tier3_Trade_Bellows_Purple".
        LVL:4 ,name:"Trade Steel Hammers for a Mithral Hammer" taskname:"Hvy_Armorsmithing_Tier3_Trade_Hammer_Purple".
        LVL:4 ,name:"Sturdy Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier1_Plate_Shirt2_Set2".
        LVL:4 ,name:"Sturdy Plate Shirt" taskname:"Hvy_Armorsmithing_Tier1_Plate_Shirt2".
        LVL:4 ,name:"Defender's Iron Shield +1" taskname:"Hvy_Armorsmithing_Tier1_Shield_Set_3".
        LVL:4 ,name:"Warrior's Iron Shield +1" taskname:"Hvy_Armorsmithing_Tier1_Shield_Set_2".
        LVL:4 ,name:"Defender's Plate Boots +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Boots_Set_3".
        LVL:4 ,name:"Warrior's Plate Boots +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Boots_Set_2".
        LVL:5 ,name:"Sturdy Plate Pants" taskname:"Hvy_Armorsmithing_Tier1_Plate_Pants".
        LVL:5 ,name:"Sturdy Plate Trousers" taskname:"Hvy_Armorsmithing_Tier1_Plate_Pants_Set2".
        LVL:5 ,name:"Defender's Plate Armor +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Armor_Set_3".
        LVL:5 ,name:"Plate Armor +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Armor_Set_1".
        LVL:5 ,name:"Warrior's Plate Armor +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Armor_Set_2".
        LVL:6 ,name:"Defender's Plate Gauntlets +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Gloves_Set_3".
        LVL:6 ,name:"Plate Gauntlets +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Gloves_Set_1".
        LVL:6 ,name:"Warrior's Plate Gauntlets +1" taskname:"Hvy_Armorsmithing_Tier1_Plate_Gloves_Set_2".
        LVL:7 ,name:"Upgrade Miner" taskname:"Hvy_Armorsmithing_Tier2_Recruit_Journeyman".
        LVL:7 ,name:"High Quality Iron Ore Trading" taskname:"Hvy_Armorsmithing_Tier2_Gather_Special".
        LVL:7 ,name:"Forge Steel Plates" taskname:"Hvy_Armorsmithing_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass Steel Plate Forging" taskname:"Hvy_Armorsmithing_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Detailed Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier2_Plate_Shirt_Set2".
        LVL:7 ,name:"Detailed Plate Shirt" taskname:"Hvy_Armorsmithing_Tier2_Plate_Shirt".
        LVL:7 ,name:"Steel Shield +2" taskname:"Hvy_Armorsmithing_Tier2_Shield_Set_1".
        LVL:7 ,name:"Plate Boots +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Boots_Set_1".
        LVL:8 ,name:"Steel Plate Trading" taskname:"Hvy_Armorsmithing_Tier2_Refine_Special".
        LVL:8 ,name:"Lesser Defense Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Defense_01".
        LVL:8 ,name:"Lesser Hit Points Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Hitpoints_01".
        LVL:8 ,name:"Detailed Plate Pants" taskname:"Hvy_Armorsmithing_Tier2_Plate_Pants_1".
        LVL:8 ,name:"Detailed Plate Trousers" taskname:"Hvy_Armorsmithing_Tier2_Plate_Pants_1_Set2".
        LVL:8 ,name:"Plate Armor +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Armor_Set_1".
        LVL:9 ,name:"Plate Helm +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Helm_Set_1".
        LVL:9 ,name:"Plate Gauntlets +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Gloves_Set_1".
        LVL:10 ,name:"Superb Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier2_Plate_Shirt_2_Set2".
        LVL:10 ,name:"Superb Plate Shirt" taskname:"Hvy_Armorsmithing_Tier2_Plate_Shirt_2".
        LVL:10 ,name:"Defender's Steel Shield +2" taskname:"Hvy_Armorsmithing_Tier2_Shield_Set_3".
        LVL:10 ,name:"Warrior's Steel Shield +2" taskname:"Hvy_Armorsmithing_Tier2_Shield_Set_2".
        LVL:10 ,name:"Defender's Plate Boots +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Boots_Set_3".
        LVL:10 ,name:"Warrior's Plate Boots +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Boots_Set_2".
        LVL:11 ,name:"Superb Plate Pants" taskname:"Hvy_Armorsmithing_Tier2_Plate_Pants_2".
        LVL:11 ,name:"Superb Plate Trousers" taskname:"Hvy_Armorsmithing_Tier2_Plate_Pants_2_Set2".
        LVL:11 ,name:"Defender's Plate Armor +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Armor_Set_3".
        LVL:11 ,name:"Warrior's Plate Armor +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Armor_Set_2".
        LVL:12 ,name:"Defender's Plate Gauntlets +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Gloves_Set_3".
        LVL:12 ,name:"Warrior's Plate Gauntlets +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Gloves_Set_2".
        LVL:13 ,name:"Defender's Plate Helm +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Helm_Set_3".
        LVL:13 ,name:"Warrior's Plate Helm +2" taskname:"Hvy_Armorsmithing_Tier2_Plate_Helm_Set_2".
        LVL:14 ,name:"Upgrade Armorer" taskname:"Hvy_Armorsmithing_Tier3_Recruit_Master".
        LVL:14 ,name:"Mithral Ore Trading" taskname:"Hvy_Armorsmithing_Tier3_Gather_Special".
        LVL:14 ,name:"Forge Mithral Plates" taskname:"Hvy_Armorsmithing_Tier3_Refine_Basic".
        LVL:14 ,name:"Mass Mithral Plates Forging" taskname:"Hvy_Armorsmithing_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Ornate Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier3_Plate_Shirt_Set2".
        LVL:14 ,name:"Ornate Plate Shirt" taskname:"Hvy_Armorsmithing_Tier3_Plate_Shirt".
        LVL:14 ,name:"Mithral Shield +4" taskname:"Hvy_Armorsmithing_Tier3_Shield_Set_1".
        LVL:14 ,name:"Plate Boots +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Boots_Set_1".
        LVL:15 ,name:"Mithral Plate Trading" taskname:"Hvy_Armorsmithing_Tier3_Refine_Special".
        LVL:15 ,name:"Defense Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Defense_02".
        LVL:15 ,name:"Hit Points Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Hitpoints_02".
        LVL:15 ,name:"Ornate Plate Pants" taskname:"Hvy_Armorsmithing_Tier3_Plate_Pants".
        LVL:15 ,name:"Ornate Plate Trousers" taskname:"Hvy_Armorsmithing_Tier3_Plate_Pants_Set2".
        LVL:15 ,name:"Fancy Plate Gambeson" taskname:"Hvy_Armorsmithing_Tier3_Plate_Shirt2_Set2".
        LVL:15 ,name:"Fancy Plate Shirt" taskname:"Hvy_Armorsmithing_Tier3_Plate_Shirt2".
        LVL:15 ,name:"Plate Armor +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Armor_Set_1".
        LVL:16 ,name:"Fancy Plate Pants" taskname:"Hvy_Armorsmithing_Tier3_Plate_Pants2".
        LVL:16 ,name:"Fancy Plate Trousers" taskname:"Hvy_Armorsmithing_Tier3_Plate_Pants2_Set2".
        LVL:16 ,name:"Plate Helm +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Helm_Set_1".
        LVL:16 ,name:"Plate Gauntlets +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Gloves_Set_1".
        LVL:17 ,name:"Defender's Mithral Shield +4" taskname:"Hvy_Armorsmithing_Tier3_Shield_Set_3".
        LVL:17 ,name:"Warrior's Mithral Shield +4" taskname:"Hvy_Armorsmithing_Tier3_Shield_Set_2".
        LVL:17 ,name:"Defender's Plate Boots +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Boots_Set_3".
        LVL:17 ,name:"Warrior's Plate Boots +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Boots_Set_2".
        LVL:18 ,name:"Emperor's Plate Pants" taskname:"Hvy_Armorsmithing_Tier3_Plate_Pants_Invisible".
        LVL:18 ,name:"Emperor's Plate Shirt" taskname:"Hvy_Armorsmithing_Tier3_Plate_Shirt_Invisible".
        LVL:18 ,name:"Defender's Plate Armor +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Armor_Set_3".
        LVL:18 ,name:"Warrior's Plate Armor +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Armor_Set_2".
        LVL:19 ,name:"Defender's Plate Helm +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Helm_Set_3".
        LVL:19 ,name:"Warrior's Plate Helm +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Helm_Set_2".
        LVL:19 ,name:"Defender's Plate Gauntlets +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Gloves_Set_3".
        LVL:19 ,name:"Warrior's Plate Gauntlets +4" taskname:"Hvy_Armorsmithing_Tier3_Plate_Gloves_Set_2".
        LVL:19 ,name:"Boots of the Impenetrable Bastion" taskname:"Hvy_Armorsmithing_Special_Plate_Feet_Impenetrable".
        LVL:20 ,name:"Greater Defense Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Defense".
        LVL:20 ,name:"Greater Hit Points Armor Kit" taskname:"Hvy_Armorsmithing_Special_Reinforcement_Kit_Hitpoints".
        LVL:20 ,name:"Gloves of the Impenetrable Bastion" taskname:"Hvy_Armorsmithing_Special_Plate_Arms_Impenetrable".
        LVL:21 ,name:"Forge Adamantine Plates" taskname:"Crafted_Hvy_Armorsmithing_T4_Refine_Basic".
        LVL:21 ,name:"Mass Adamantine Plate Forging" taskname:"Crafted_Hvy_Armorsmithing_T4_Refine_Basic_Mass".
        LVL:21 ,name:"Defender's Elemental Chausses" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Pants_Tank".
        LVL:21 ,name:"Warrior's Elemental Chausses" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Pants_Dps".
        LVL:21 ,name:"Defender's Elemental Chainmail" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Shirt_Tank".
        LVL:21 ,name:"Warrior's Elemental Chainmail" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Shirt_Dps".
        LVL:21 ,name:"Elemental Shield" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Shield".
        LVL:21 ,name:"Elemental Plate Helm" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Helm".
        LVL:22 ,name:"Adamant Ore Trading" taskname:"Crafted_Hvy_Armorsmithing_T4_Gather_Special".
        LVL:22 ,name:"Adamantine Plate Trading" taskname:"Crafted_Hvy_Armorsmithing_T4_Refine_Special".
        LVL:22 ,name:"Elemental Plate Gauntlets" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Gloves".
        LVL:22 ,name:"Elemental Plate Boots" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Boots".
        LVL:23 ,name:"Defender's Elemental Shield" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Shield_Tank".
        LVL:23 ,name:"Warrior's Elemental Shield" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Shield_Dps".
        LVL:23 ,name:"Elemental Plate Armor" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Armor".
        LVL:24 ,name:"Defender's Elemental Plate Helm" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Helm_Tank".
        LVL:24 ,name:"Warrior's Elemental Plate Helm" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Helm_Dps".
        LVL:24 ,name:"Defender's Elemental Plate Gauntlets" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Gloves_Tank".
        LVL:24 ,name:"Warrior's Elemental Plate Gauntlets" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Gloves_Dps".
        LVL:24 ,name:"Defender's Elemental Plate Boots" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Boots_Tank".
        LVL:24 ,name:"Warrior's Elemental Plate Boots" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Boots_Dps".
        LVL:25 ,name:"Major Defense Armor Kit" taskname:"Crafted_Hvy_Armorsmithing_T4_Reinforcement_Kit_Defense".
        LVL:25 ,name:"Major Hit Points Armor Kit" taskname:"Crafted_Hvy_Armorsmithing_T4_Reinforcement_Kit_Hitpoints".
        LVL:25 ,name:"Defender's Elemental Plate Armor" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Armor_Tank".
        LVL:25 ,name:"Warrior's Elemental Plate Armor" taskname:"Crafted_Hvy_Armorsmithing_T4_Green_Armor_Dps".
 
Rares:
        Hvy_Armorsmithing_Special_Plate_Feet_Impenetrable : "Boots of the Impenetrable Bastion",
        Hvy_Armorsmithing_Special_Plate_Arms_Impenetrable : "Gloves of the Impenetrable Bastion",
        Hvy_Armorsmithing_Special_T06_Guardian_Tank_Gloves : "Grand Regent's Gauntlets",
        Hvy_Armorsmithing_Special_T06_Guardian_Leader_Gloves : "High General's Gauntlets",
        Hvy_Armorsmithing_Special_T06_Guardian_Damage_Gloves : "Timeless Hero's Gauntlets",
        Hvy_Armorsmithing_Tier1_Shield_Special_1 : "Iron Shield +1",
        Hvy_Armorsmithing_Tier1_Plate_Boots_Special_1 : "Plate Boots +1",
        Hvy_Armorsmithing_Tier1_Plate_Armor_Special_1 : "Plate Armor +1",
        Hvy_Armorsmithing_Tier1_Plate_Gloves_Special_1 : "Plate Gauntlets +1",
        Hvy_Armorsmithing_Tier1_Plate_Helm_Special_1 : "Plate Helm +1",
        Hvy_Armorsmithing_Tier2_Shield_Special_2 : "Iron Shield +2",
        Hvy_Armorsmithing_Tier2_Plate_Armor_Special_2 : "Plate Armor +2",
        Hvy_Armorsmithing_Tier2_Plate_Boots_Special_2 : "Plate Boots +2",
        Hvy_Armorsmithing_Tier2_Plate_Gloves_Special_2 : "Plate Gauntlets +2",
        Hvy_Armorsmithing_Tier2_Plate_Helm_Special_2 : "Plate Helm +2",
        Hvy_Armorsmithing_Tier2_Plate_Armor_Special_3 : "Plate Armor +3",
        Hvy_Armorsmithing_Tier2_Plate_Boots_Special_3 : "Plate Boots +3",
        Hvy_Armorsmithing_Tier2_Shield_Special_3 : "Steel Shield +3",
        Hvy_Armorsmithing_Tier2_Plate_Gambeson_Special_2 : "Embroidered Plate Gambeson",
        Hvy_Armorsmithing_Tier2_Plate_Shirt_Special_2 : "Embroidered Plate Shirt",
        Hvy_Armorsmithing_Tier2_Plate_Gloves_Special_3 : "Plate Gauntlets +3",
        Hvy_Armorsmithing_Tier2_Plate_Pants_Special_2 : "Embroidered Plate Pants",
        Hvy_Armorsmithing_Tier2_Plate_Pants_Special_2 : "Embroidered Plate Trousers",
        Hvy_Armorsmithing_Tier2_Plate_Helm_Special_3 : "Plate Helm +3",
        Hvy_Armorsmithing_Tier3_Shield_Special_4 : "Mithral Shield +4",
        Hvy_Armorsmithing_Tier3_Plate_Armor_Special_4 : "Plate Armor +4",
        Hvy_Armorsmithing_Tier3_Plate_Boots_Special_4 : "Plate Boots +4",
        Hvy_Armorsmithing_Tier3_Plate_Gloves_Special_4 : "Plate Gauntlets +4",
        Hvy_Armorsmithing_Tier3_Plate_Helm_Special_4 : "Plate Helm +4",
        Hvy_Armorsmithing_Tier3_Shield_Special_5 : "Mithral Shield +5",
        Hvy_Armorsmithing_Tier3_Plate_Boots_Special_5 : "Plate Boots +5",
        Hvy_Armorsmithing_Tier3_Plate_Armor_Special_5 : "Plate Armor +5",
        Hvy_Armorsmithing_Tier3_Plate_Gambeson_Special : "Elegant Plate Gambeson",
        Hvy_Armorsmithing_Tier3_Plate_Shirt_Special : "Elegant Plate Shirt",
        Hvy_Armorsmithing_Tier3_Plate_Gloves_Special_5 : "Plate Gauntlets +5",
        Hvy_Armorsmithing_Tier3_Plate_Pants_Special : "Elegant Plate Pants",
        Hvy_Armorsmithing_Tier3_Plate_Trousers_Special : "Elegant Plate Trousers",
        Hvy_Armorsmithing_Tier3_Plate_Helm_Special : "Plate Helm +5",
        Hvy_Armorsmithing_Tier3_Plate_Gambeson_Special_2 : "Exquisite Plate Gambeson",
        Hvy_Armorsmithing_Tier3_Plate_Pants_Special_2 : "Exquisite Plate Pants",
        Hvy_Armorsmithing_Tier3_Plate_Shirt_Special_2 : "Exquisite Plate Shirt",
        Hvy_Armorsmithing_Tier3_Plate_Trousers_Special_2 : "Exquisite Plate Trousers",
        Hvy_Armorsmithing_Tier3_Shield_Special_6 : "Mithral Shield +6",
        Hvy_Armorsmithing_Tier3_Plate_Armor_Special_6 : "Plate Armor +6",
        Hvy_Armorsmithing_Tier3_Plate_Boots_Special_6 : "Plate Boots +6",
        Hvy_Armorsmithing_Tier3_Plate_Gloves_Special_6 : "Plate Gauntlets +6",
        Hvy_Armorsmithing_Tier3_Plate_Helm_Special_6 : "Plate Helm +6",
    },
    Tailoring : {
        Tailoring_Tier0_Intro : "Hire your first Weaver",
        LVL:1 ,name:"Mass Wool cloth weaving" taskname:"Tailoring_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Weave Wool Cloth" taskname:"Tailoring_Tier1_Refine_Basic".
        LVL:1 ,name:"Cloth Shirt" taskname:"Tailoring_Tier1_Cloth_Shirt_1".
        LVL:1 ,name:"Cloth Tunic" taskname:"Tailoring_Tier1_Cloth_Shirt_1_Set2".
        LVL:1 ,name:"Cloth Boots" taskname:"Tailoring_Tier1_Cloth_Boots_1".
        LVL:2 ,name:"Wool Scraps Trading" taskname:"Tailoring_Tier1_Gather_Special".
        LVL:2 ,name:"Cloth Pants" taskname:"Tailoring_Tier1_Cloth_Pants_1".
        LVL:2 ,name:"Cloth Trousers" taskname:"Tailoring_Tier1_Cloth_Pants_1_Set2".
        LVL:2 ,name:"Cloth Robes" taskname:"Tailoring_Tier1_Cloth_Armor_1".
        LVL:3 ,name:"Upgrade Tailor." taskname:"Tailoring_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Wool Cloth Trading" taskname:"Tailoring_Tier1_Refine_Special".
        LVL:3 ,name:"Trade Iron Awls for a Steel Awl" taskname:"Tailoring_Tier3_Trade_Awl_Blue".
        LVL:3 ,name:"Trade Iron Needles for Steel Needle" taskname:"Tailoring_Tier3_Trade_Needle_Blue".
        LVL:3 ,name:"Trade Iron Shears for Steel Shears" taskname:"Tailoring_Tier3_Trade_Shears_Blue".
        LVL:3 ,name:"Cloth Sleeves" taskname:"Tailoring_Tier1_Cloth_Gloves_1".
        LVL:3 ,name:"Cloth Boots +1" taskname:"Tailoring_Tier1_Cloth_Boots_Set_1".
        LVL:4 ,name:"Upgrade Master Tailor" taskname:"Tailoring_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Trade Steel Awls for a Mithral Awl" taskname:"Tailoring_Tier3_Trade_Awl_Purple".
        LVL:4 ,name:"Trade Steel Needles for Mithral Needle" taskname:"Tailoring_Tier3_Trade_Needle_Purple".
        LVL:4 ,name:"Trade Steel Shears for Mithral Shears" taskname:"Tailoring_Tier3_Trade_Shears_Purple".
        LVL:4 ,name:"Sturdy Cloth Shirt" taskname:"Tailoring_Tier1_Cloth_Shirt2".
        LVL:4 ,name:"Sturdy Cloth Tunic" taskname:"Tailoring_Tier1_Cloth_Shirt2_Set2".
        LVL:4 ,name:"Mage's Cloth Boots +1" taskname:"Tailoring_Tier1_Cloth_Boots_Set_3".
        LVL:4 ,name:"Scholar's Cloth Boots +1" taskname:"Tailoring_Tier1_Cloth_Boots_Set_2".
        LVL:5 ,name:"Sturdy Cloth Pants" taskname:"Tailoring_Tier1_Cloth_Pants".
        LVL:5 ,name:"Sturdy Cloth Trousers" taskname:"Tailoring_Tier1_Cloth_Pants_Set2".
        LVL:5 ,name:"Cloth Robes +1" taskname:"Tailoring_Tier1_Cloth_Armor_Set_1".
        LVL:5 ,name:"Mage's Cloth Robes +1" taskname:"Tailoring_Tier1_Cloth_Armor_Set_3".
        LVL:5 ,name:"Scholar's Cloth Robes +1" taskname:"Tailoring_Tier1_Cloth_Armor_Set_2".
        LVL:6 ,name:"Cloth Sleeves +1" taskname:"Tailoring_Tier1_Cloth_Gloves_Set_1".
        LVL:6 ,name:"Mage's Cloth Sleeves +1" taskname:"Tailoring_Tier1_Cloth_Gloves_Set_3".
        LVL:6 ,name:"Scholar's Cloth Sleeves +1" taskname:"Tailoring_Tier1_Cloth_Gloves_Set_2".
        LVL:7 ,name:"Upgrade Weaver" taskname:"Tailoring_Tier2_Recruit_Journeyman".
        LVL:7 ,name:"Cotton Scrap Trading" taskname:"Tailoring_Tier2_Gather_Special".
        LVL:7 ,name:"Mass Cotton Cloth Weaving" taskname:"Tailoring_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Weave Cotton Cloth" taskname:"Tailoring_Tier2_Refine_Basic".
        LVL:7 ,name:"Detailed Cloth Shirt" taskname:"Tailoring_Tier2_Cloth_Shirt".
        LVL:7 ,name:"Detailed Cloth Tunic" taskname:"Tailoring_Tier2_Cloth_Shirt_Set2".
        LVL:7 ,name:"Cloth Boots +2" taskname:"Tailoring_Tier2_Cloth_Boots_Set_1".
        LVL:8 ,name:"Cotton Cloth Trading" taskname:"Tailoring_Tier2_Refine_Special".
        LVL:8 ,name:"Lesser Armor Penetration Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Armorpen_01".
        LVL:8 ,name:"Lesser Life Steal Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Healthsteal_01".
        LVL:8 ,name:"Detailed Cloth Pants" taskname:"Tailoring_Tier2_Cloth_Pants_1".
        LVL:8 ,name:"Detailed Cloth Trousers" taskname:"Tailoring_Tier2_Cloth_Pants_1_Set2".
        LVL:8 ,name:"Cloth Robes +2" taskname:"Tailoring_Tier2_Cloth_Armor_Set_1".
        LVL:9 ,name:"Cloth Cap +2" taskname:"Tailoring_Tier2_Cloth_Helm_Set_1".
        LVL:9 ,name:"Cloth Sleeves +2" taskname:"Tailoring_Tier2_Cloth_Gloves_Set_1".
        LVL:10 ,name:"Superb Cloth Shirt" taskname:"Tailoring_Tier2_Cloth_Shirt_2".
        LVL:10 ,name:"Superb Cloth Tunic" taskname:"Tailoring_Tier2_Cloth_Shirt_2_Set2".
        LVL:10 ,name:"Mage's Cloth Boots +2" taskname:"Tailoring_Tier2_Cloth_Boots_Set_3".
        LVL:10 ,name:"Scholar's Cloth Boots +2" taskname:"Tailoring_Tier2_Cloth_Boots_Set_2".
        LVL:11 ,name:"Superb Cloth Pants" taskname:"Tailoring_Tier2_Cloth_Pants_2".
        LVL:11 ,name:"Superb Cloth Trousers" taskname:"Tailoring_Tier2_Cloth_Pants_2_Set2".
        LVL:11 ,name:"Mage's Cloth Robes +2" taskname:"Tailoring_Tier2_Cloth_Armor_Set_3".
        LVL:11 ,name:"Scholar's Cloth Robes +2" taskname:"Tailoring_Tier2_Cloth_Armor_Set_2".
        LVL:12 ,name:"Mage's Cloth Sleeves +2" taskname:"Tailoring_Tier2_Cloth_Gloves_Set_3".
        LVL:12 ,name:"Scholar's Cloth Sleeves +2" taskname:"Tailoring_Tier2_Cloth_Gloves_Set_2".
        LVL:13 ,name:"Mage's Cloth Cap +2" taskname:"Tailoring_Tier2_Cloth_Helm_Set_3".
        LVL:13 ,name:"Scholar's Cloth Cap +2" taskname:"Tailoring_Tier2_Cloth_Helm_Set_2".
        LVL:14 ,name:"Upgrade Outfitter" taskname:"Tailoring_Tier3_Recruit_Master".
        LVL:14 ,name:"Shimmerweave Scrap Trading" taskname:"Tailoring_Tier3_Gather_Special".
        LVL:14 ,name:"Mass Shimmerweave Weaving" taskname:"Tailoring_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Weave Shimmerweave Cloth" taskname:"Tailoring_Tier3_Refine_Basic".
        LVL:14 ,name:"Ornate Cloth Shirt" taskname:"Tailoring_Tier3_Cloth_Shirt".
        LVL:14 ,name:"Ornate Cloth Tunic" taskname:"Tailoring_Tier3_Cloth_Shirt_Set2".
        LVL:14 ,name:"Cloth Boots +4" taskname:"Tailoring_Tier3_Cloth_Boots_Set_1".
        LVL:15 ,name:"Shimmerweave Cloth Trading" taskname:"Tailoring_Tier3_Refine_Special".
        LVL:15 ,name:"Armor Penetration Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Armorpen_02".
        LVL:15 ,name:"Life Steal Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Healthsteal_02".
        LVL:15 ,name:"Ornate Cloth Pants" taskname:"Tailoring_Tier3_Cloth_Pants".
        LVL:15 ,name:"Ornate Cloth Trousers" taskname:"Tailoring_Tier3_Cloth_Pants_Set2".
        LVL:15 ,name:"Fancy Cloth Shirt" taskname:"Tailoring_Tier3_Cloth_Shirt2".
        LVL:15 ,name:"Fancy Cloth Tunic" taskname:"Tailoring_Tier3_Cloth_Shirt2_Set2".
        LVL:15 ,name:"Cloth Robes +4" taskname:"Tailoring_Tier3_Cloth_Armor_Set_1".
        LVL:16 ,name:"Fancy Cloth Pants" taskname:"Tailoring_Tier3_Cloth_Pants2".
        LVL:16 ,name:"Fancy Cloth Trousers" taskname:"Tailoring_Tier3_Cloth_Pants2_Set2".
        LVL:16 ,name:"Cloth Cap +4" taskname:"Tailoring_Tier3_Cloth_Helm_Set_1".
        LVL:16 ,name:"Cloth Sleeves +4" taskname:"Tailoring_Tier3_Cloth_Gloves_Set_1".
        LVL:17 ,name:"Mage's Cloth Boots +4" taskname:"Tailoring_Tier3_Cloth_Boots_Set_3".
        LVL:17 ,name:"Scholar's Cloth Boots +4" taskname:"Tailoring_Tier3_Cloth_Boots_Set_2".
        LVL:18 ,name:"Emperor's Cloth Pants" taskname:"Tailoring_Tier3_Cloth_Pants_Invisible".
        LVL:18 ,name:"Emperor's Cloth Shirt" taskname:"Tailoring_Tier3_Cloth_Shirt_Invisible".
        LVL:18 ,name:"Mage's Cloth Robes +4" taskname:"Tailoring_Tier3_Cloth_Armor_Set_3".
        LVL:18 ,name:"Scholar's Cloth Robes +4" taskname:"Tailoring_Tier3_Cloth_Armor_Set_2".
        LVL:19 ,name:"Mage's Cloth Cap +4" taskname:"Tailoring_Tier3_Cloth_Helm_Set_3".
        LVL:19 ,name:"Scholar's Cloth Cap +4" taskname:"Tailoring_Tier3_Cloth_Helm_Set_2".
        LVL:19 ,name:"Mage's Cloth Sleeves +4" taskname:"Tailoring_Tier3_Cloth_Gloves_Set_3".
        LVL:19 ,name:"Scholar's Cloth Sleeves +4" taskname:"Tailoring_Tier3_Cloth_Gloves_Set_2".
        LVL:19 ,name:"Boots of the Arcane Wanderer" taskname:"Tailoring_Special_Cloth_Feet_Arcane".
        LVL:20 ,name:"Greater Armor Penetration Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Armorpen".
        LVL:20 ,name:"Greater Life Steal Armor Kit" taskname:"Tailoring_Special_Reinforcement_Kit_Healthsteal".
        LVL:20 ,name:"Gloves of the Arcane Wanderer" taskname:"Tailoring_Special_Cloth_Arms_Arcane".
        LVL:21 ,name:"Weave Taffeta Cloth" taskname:"Crafted_Tailoring_T4_Refine_Basic".
        LVL:21 ,name:"Mass Taffeta Cloth Weaving" taskname:"Crafted_Tailoring_T4_Refine_Basic_Mass".
        LVL:21 ,name:"Elemental Pants" taskname:"Crafted_Tailoring_T4_Green_Pants_Dps".
        LVL:21 ,name:"Elemental Shirt" taskname:"Crafted_Tailoring_T4_Green_Shirt_Dps".
        LVL:21 ,name:"Elemental Cloth Cap" taskname:"Crafted_Tailoring_T4_Green_Helm".
        LVL:22 ,name:"Fine Silk Thread Trading" taskname:"Crafted_Tailoring_T4_Gather_Special".
        LVL:22 ,name:"Taffeta Cloth Trading" taskname:"Crafted_Tailoring_T4_Refine_Special".
        LVL:22 ,name:"Elemental Cloth Sleeves" taskname:"Crafted_Tailoring_T4_Green_Gloves".
        LVL:22 ,name:"Elemental Cloth Boots" taskname:"Crafted_Tailoring_T4_Green_Boots".
        LVL:23 ,name:"Elemental Cloth Robes" taskname:"Crafted_Tailoring_T4_Green_Armor".
        LVL:24 ,name:"Mage's Elemental Cloth Cap" taskname:"Crafted_Tailoring_T4_Green_Helm_Dps".
        LVL:24 ,name:"Scholar's Elemental Cloth Cap" taskname:"Crafted_Tailoring_T4_Green_Helm_Dps2".
        LVL:24 ,name:"Mage's Elemental Cloth Sleeves" taskname:"Crafted_Tailoring_T4_Green_Gloves_Dps".
        LVL:24 ,name:"Scholar's Elemental Cloth Sleeves" taskname:"Crafted_Tailoring_T4_Green_Gloves_Dps2".
        LVL:24 ,name:"Mage's Elemental Cloth Boots" taskname:"Crafted_Tailoring_T4_Green_Boots_Dps".
        LVL:24 ,name:"Scholar's Elemental Cloth Boots" taskname:"Crafted_Tailoring_T4_Green_Boots_Dps2".
        LVL:25 ,name:"Major Armor Penetration Armor Kit" taskname:"Crafted_Tailoring_T4_Reinforcement_Kit_Armorpen".
        LVL:25 ,name:"Major Life Steal Armor Kit" taskname:"Crafted_Tailoring_T4_Reinforcement_Kit_Healthsteal".
        LVL:25 ,name:"Mage's Elemental Cloth Robes" taskname:"Crafted_Tailoring_T4_Green_Armor_Dps".
        LVL:25 ,name:"Scholar's Elemental Cloth Robes" taskname:"Crafted_Tailoring_T4_Green_Armor_Dps2".
       
Rares:
        Tailoring_Special_T06_Controller_Control_Gloves : "High Vizier's Gloves",
        Tailoring_Special_T06_Controller_Damage_Gloves : "Magelord's Gloves",
        Tailoring_Special_T06_Controller_Renegade_Gloves : "Shadow Weaver's Gloves",
        Tailoring_Tier1_Cloth_Boots_Special_1 : "Cloth Boots +1",
        Tailoring_Tier1_Cloth_Armor_Special_1 : "Cloth Robes +1",
        Tailoring_Tier1_Cloth_Gloves_Special_1 : "Cloth Sleeves +1",
        Tailoring_Tier1_Cloth_Helm_Special_1 : "Cloth Cap +1",
        Tailoring_Tier2_Cloth_Boots_Special_2 : "Cloth Boots +2",
        Tailoring_Tier2_Cloth_Armor_Special_2 : "Cloth Robes +2",
        Tailoring_Tier2_Cloth_Gloves_Special_2 : "Cloth Sleeves +2",
        Tailoring_Tier2_Cloth_Helm_Special_2 : "Cloth Cap +2",
        Tailoring_Tier2_Cloth_Boots_Special_3 : "Cloth Boots +3",
        Tailoring_Tier2_Cloth_Armor_Special_3 : "Cloth Robes +3",
        Tailoring_Tier2_Cloth_Gloves_Special_3 : "Cloth Sleeves +3",
        Tailoring_Tier2_Cloth_Shirt_Special_2 : "Embroidered Cloth Shirt",
        Tailoring_Tier2_Cloth_Tunic_Special_2 : "Embroidered Cloth Tunic",
        Tailoring_Tier2_Cloth_Helm_Special_3 : "Cloth Cap +3",
        Tailoring_Tier2_Cloth_Pants_Special_2 : "Embroidered Cloth Pants",
        Tailoring_Tier2_Cloth_Trousers_Special_2 : "Embroidered Cloth Trousers",
        Tailoring_Tier3_Cloth_Boots_Special_4 : "Cloth Boots +4",
        Tailoring_Tier3_Cloth_Armor_Special_4 : "Cloth Robes +4",
        Tailoring_Tier3_Cloth_Gloves_Special_4 : "Cloth Sleves +4",
        Tailoring_Tier3_Cloth_Helm_Special_4 : "Cloth Cap +4",
        Tailoring_Tier3_Cloth_Boots_Special_5 : "Cloth Boots +5",
        Tailoring_Tier3_Cloth_Armor_Special_5 : "Cloth Robes +5",
        Tailoring_Tier3_Cloth_Armor_Special_5 : "Cloth Sleeves +5",
        Tailoring_Tier3_Cloth_Shirt_Special : "Elegant Cloth Shirt",
        Tailoring_Tier3_Cloth_Tunic_Special : "Elegant Cloth Tunic",
        Tailoring_Tier3_Cloth_Helm_Special : "Cloth Cap +5",
        Tailoring_Tier3_Cloth_Pants_Special : "Elegant Cloth Pants",
        Tailoring_Tier3_Cloth_Trousers_Special : "Elegant Cloth Trousers",
        Tailoring_Tier3_Cloth_Boots_Special_6 : "Cloth Boots +6",
        Tailoring_Tier3_Cloth_Helm_Special_6 : "Cloth Cap +6",
        Tailoring_Tier3_Cloth_Armor_Special_6 : "Cloth Robes +6",
        Tailoring_Tier3_Cloth_Gloves_Special_6 : "Cloth Sleeves +6",
        Tailoring_Tier3_Cloth_Pants_Special_2 : "Exquisite Cloth Pants",
        Tailoring_Tier3_Cloth_Shirt_Special_2 : "Exquisite Cloth Shirt",
        Tailoring_Tier3_Cloth_Trousers_Special_2 : "Exquisite Cloth Trousers",
        Tailoring_Tier3_Cloth_Tunic_Special_2 : "Exquisite Cloth Tunic",
        LVL:25 ,name:"Exquisite Elemental Shirt" taskname:"Crafted_Tailoring_T4_Purple_Shirt_Dps".
    },
    Weaponsmithing : {
        Weaponsmithing_Tier0_Intro : "Hire your first Smelter",
        LVL:1 ,name:"Craft Iron Blades and Pine Hafts" taskname:"Weaponsmithing_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass Iron Blades and Pine Hafts crafting" taskname:"Weaponsmithing_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Dagger +1" taskname:"Weaponsmithing_Tier1_Dagger_1".
        LVL:1 ,name:"Greatsword +1" taskname:"Weaponsmithing_Tier1_Greatsword_1".
        LVL:1 ,name:"Longbow +1" taskname:"Weaponsmithing_Tier1_Longbow_1".
        LVL:1 ,name:"Longsword +1" taskname:"Weaponsmithing_Tier1_Longsword_1".
        LVL:1 ,name:"Mace +1" taskname:"Weaponsmithing_Tier1_Mace_1".
        LVL:2 ,name:"Iron and Pine Trading" taskname:"Weaponsmithing_Tier1_Gather_Special".
        LVL:2 ,name:"Battleaxe +1" taskname:"Weaponsmithing_Tier1_Battleaxe_1".
        LVL:2 ,name:"Blades +1" taskname:"Weaponsmithing_Tier1_Blades_1".
        LVL:2 ,name:"Greataxe +1" taskname:"Weaponsmithing_Tier1_Greataxe_1".
        LVL:2 ,name:"Short Sword +1" taskname:"Weaponsmithing_Tier1_Shortsword_1".
        LVL:3 ,name:"Upgrade Weaponsmith" taskname:"Weaponsmithing_Tier3_Recruit_Master_Blue".
        LVL:3 ,name:"Iron Blades and Pine Hafts trading" taskname:"Weaponsmithing_Tier1_Refine_Special".
        LVL:3 ,name:"Trade Iron Anvils for a Steel Anvil" taskname:"Weaponsmithing_Tier3_Trade_Anvil_Blue".
        LVL:3 ,name:"Trade Iron Grindstones for a Steel Grindstone" taskname:"Weaponsmithing_Tier3_Trade_Grindstone_Blue".
        LVL:3 ,name:"Trade Iron Hammers for Steel Hammer" taskname:"Weaponsmithing_Tier3_Trade_Hammer_Blue".
        LVL:3 ,name:"Sword Knot +1" taskname:"Weaponsmithing_Tier1_Swordknot_1".
        LVL:4 ,name:"Upgrade Master Weaponsmith" taskname:"Weaponsmithing_Tier3_Recruit_Master_Purple".
        LVL:4 ,name:"Trade Steel Anvils for a Mithral Anvil" taskname:"Weaponsmithing_Tier3_Trade_Anvil_Purple".
        LVL:4 ,name:"Trade Steel Grindstones for a Mithral Grindstone" taskname:"Weaponsmithing_Tier3_Trade_Grindstone_Purple".
        LVL:4 ,name:"Trade Steel Hammers for a Mithral Hammer" taskname:"Weaponsmithing_Tier3_Trade_Hammer_Purple".
        LVL:4 ,name:"Dagger +2" taskname:"Weaponsmithing_Tier1_Dagger_2".
        LVL:4 ,name:"Greatsword +2" taskname:"Weaponsmithing_Tier1_Greatsword_2".
        LVL:4 ,name:"Longbow +2" taskname:"Weaponsmithing_Tier1_Longbow_2".
        LVL:4 ,name:"Longsword +2" taskname:"Weaponsmithing_Tier1_Longsword_2".
        LVL:4 ,name:"Mace +2" taskname:"Weaponsmithing_Tier1_Mace_2".
        LVL:5 ,name:"Battleaxe +2" taskname:"Weaponsmithing_Tier1_Battleaxe_2".
        LVL:5 ,name:"Blades +2" taskname:"Weaponsmithing_Tier1_Blades_2".
        LVL:5 ,name:"Greataxe +2" taskname:"Weaponsmithing_Tier1_Greataxe_2".
        LVL:5 ,name:"Short Sword +2" taskname:"Weaponsmithing_Tier1_Shortsword_2".
        LVL:6 ,name:"Upgrade Smelter" taskname:"Weaponsmithing_Tier2_Recruit_Journeyman".
        LVL:6 ,name:"Sword Knot +2" taskname:"Weaponsmithing_Tier1_Swordknot_2".
        LVL:7 ,name:"High Quality Iron and Barausk Trading" taskname:"Weaponsmithing_Tier2_Gather_Special".
        LVL:7 ,name:"Craft Steel Blades and Barausk Hafts" taskname:"Weaponsmithing_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass Blades and Hafts crafting" taskname:"Weaponsmithing_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Dagger +3" taskname:"Weaponsmithing_Tier2_Dagger_3".
        LVL:7 ,name:"Greatsword +3" taskname:"Weaponsmithing_Tier2_Greatsword_3".
        LVL:7 ,name:"Longbow +3" taskname:"Weaponsmithing_Tier2_Longbow_3".
        LVL:7 ,name:"Longsword +3" taskname:"Weaponsmithing_Tier2_Longsword_3".
        LVL:7 ,name:"Mace +3" taskname:"Weaponsmithing_Tier2_Mace_3".
        LVL:8 ,name:"Steel Blades and Barausk Hafts trading" taskname:"Weaponsmithing_Tier2_Refine_Special".
        LVL:8 ,name:"Battleaxe +3" taskname:"Weaponsmithing_Tier2_Battleaxe_3".
        LVL:8 ,name:"Blades +3" taskname:"Weaponsmithing_Tier2_Blades_3".
        LVL:8 ,name:"Greataxe +3" taskname:"Weaponsmithing_Tier2_Greataxe_3".
        LVL:8 ,name:"Short Sword +3" taskname:"Weaponsmithing_Tier2_Shortsword_3".
        LVL:9 ,name:"Sword Knot +3" taskname:"Weaponsmithing_Tier2_Swordknot_3".
        LVL:10 ,name:"Archer's Longbow +3" taskname:"Weaponsmithing_Tier2_Longbow_Set_2".
        LVL:10 ,name:"Berserker's Greatsword +3" taskname:"Weaponsmithing_Tier2_Greatsword_Set_2".
        LVL:10 ,name:"Prowler's Dagger +3" taskname:"Weaponsmithing_Tier2_Dagger_Set_2".
        LVL:10 ,name:"Warrior's Longsword +3" taskname:"Weaponsmithing_Tier2_Longsword_Set_2".
        LVL:10 ,name:"Warrior's Mace +3" taskname:"Weaponsmithing_Tier2_Mace_Set_2".
        LVL:11 ,name:"Archer's Blades +3" taskname:"Weaponsmithing_Tier2_Blades_Set_2".
        LVL:11 ,name:"Berserker's Greataxe +3" taskname:"Weaponsmithing_Tier2_Greataxe_Set_2".
        LVL:11 ,name:"Prowler's Short Sword +3" taskname:"Weaponsmithing_Tier2_Shortsword_Set_2".
        LVL:11 ,name:"Warrior's Battleaxe +3" taskname:"Weaponsmithing_Tier2_Battleaxe_Set_2".
        LVL:12 ,name:"Soldier's Sword Knot +3" taskname:"Weaponsmithing_Tier2_Swordknot_Set_2".
        LVL:13 ,name:"Upgrade Grinder" taskname:"Weaponsmithing_Tier3_Recruit_Master".
        LVL:13 ,name:"Defender's Longsword +3" taskname:"Weaponsmithing_Tier2_Longsword_Set_3".
        LVL:13 ,name:"Defender's Mace +3" taskname:"Weaponsmithing_Tier2_Mace_Set_3".
        LVL:13 ,name:"Soldier's Greatsword +3" taskname:"Weaponsmithing_Tier2_Greatsword_Set_3".
        LVL:13 ,name:"Vagabond's Dagger +3" taskname:"Weaponsmithing_Tier2_Dagger_Set_3".
        LVL:13 ,name:"Warden's Blades +3" taskname:"Weaponsmithing_Tier2_Blades_Set_3".
        LVL:13 ,name:"Warden's Longbow +3" taskname:"Weaponsmithing_Tier2_Longbow_Set_3".
        LVL:14 ,name:"Mithral and Phandar Trading" taskname:"Weaponsmithing_Tier3_Gather_Special".
        LVL:14 ,name:"Craft Mithral Blades and Phandar Hafts" taskname:"Weaponsmithing_Tier3_Refine_Basic".
        LVL:14 ,name:"Dagger +4" taskname:"Weaponsmithing_Tier3_Dagger_4".
        LVL:14 ,name:"Greatsword +4" taskname:"Weaponsmithing_Tier3_Greatsword_4".
        LVL:14 ,name:"Longbow +4" taskname:"Weaponsmithing_Tier3_Longbow_4".
        LVL:14 ,name:"Longsword +4" taskname:"Weaponsmithing_Tier3_Longsword_4".
        LVL:15 ,name:"Mithral Blades and Phandar Hafts trading" taskname:"Weaponsmithing_Tier3_Refine_Special".
        LVL:15 ,name:"Battleaxe +4" taskname:"Weaponsmithing_Tier3_Battleaxe_4".
        LVL:15 ,name:"Blades +4" taskname:"Weaponsmithing_Tier3_Blades_4".
        LVL:15 ,name:"Greataxe +4" taskname:"Weaponsmithing_Tier3_Greataxe_4".
        LVL:15 ,name:"Short Sword +4" taskname:"Weaponsmithing_Tier3_Shortsword_4".
        LVL:16 ,name:"Sword Knot +4" taskname:"Weaponsmithing_Tier3_Swordknot_4".
        LVL:17 ,name:"Archer's Longbow +4" taskname:"Weaponsmithing_Tier3_Longbow_Set_2".
        LVL:17 ,name:"Berserker's Greatsword +4" taskname:"Weaponsmithing_Tier3_Greatsword_Set_2".
        LVL:17 ,name:"Prowler's Dagger +4" taskname:"Weaponsmithing_Tier3_Dagger_Set_2".
        LVL:17 ,name:"Warrior's Longsword +4" taskname:"Weaponsmithing_Tier3_Longsword_Set_2".
        LVL:18 ,name:"Archer's Blades +4" taskname:"Weaponsmithing_Tier3_Blades_Set_2".
        LVL:18 ,name:"Berserker's Greataxe +4" taskname:"Weaponsmithing_Tier3_Greataxe_Set_2".
        LVL:18 ,name:"Prowler's Short Sword +4" taskname:"Weaponsmithing_Tier3_Shortsword_Set_2".
        LVL:18 ,name:"Warrior's Battleaxe +4" taskname:"Weaponsmithing_Tier3_Battleaxe_Set_2".
        LVL:19 ,name:"Soldier's Sword Knot +4" taskname:"Weaponsmithing_Tier3_Swordknot_Set_2".
        LVL:20 ,name:"Dagger of Aryvandaar" taskname:"Weaponsmithing_Tier3_P_Dagger_Purple_Special".
        LVL:20 ,name:"Defender's Longsword +4" taskname:"Weaponsmithing_Tier3_Longsword_Set_3".
        LVL:20 ,name:"Defender's Mace +4" taskname:"Weaponsmithing_Tier3_Mace_Set_3".
        LVL:20 ,name:"Greatsword of Aryvandaar" taskname:"Weaponsmithing_Tier3_Greatsword_Purple_Special".
        LVL:20 ,name:"Longbow of Aryvandaar" taskname:"Weaponsmithing_Tier3_Longbow_Purple".
        LVL:20 ,name:"Longsword of Aryvandaar" taskname:"Weaponsmithing_Tier3_Longsword_Purple".
        LVL:20 ,name:"Soldier's Greatsword +4" taskname:"Weaponsmithing_Tier3_Greatsword_Set_3".
        LVL:20 ,name:"Vagabond's Dagger +4" taskname:"Weaponsmithing_Tier3_Dagger_Set_3".
        LVL:20 ,name:"Warden's Blades +4" taskname:"Weaponsmithing_Tier3_Blades_Set_3".
        LVL:20 ,name:"Warden's Longbow +4" taskname:"Weaponsmithing_Tier3_Longbow_Set_3".
        LVL:21 ,name:"Craft Adamantine Blades and Ebony Hafts" taskname:"Weaponsmithing_Tier4_Refine_Basic".
        LVL:21 ,name:"Mass Blades and Hafts Crafting" taskname:"Weaponsmithing_Tier4_Refine_Basic_Mass".
        LVL:21 ,name:"Elemental Dagger" taskname:"Weaponsmithing_Tier4_Dagger_4".
        LVL:21 ,name:"Elemental Greatsword" taskname:"Weaponsmithing_Tier4_Greatsword_4".
        LVL:21 ,name:"Elemental Longbow" taskname:"Weaponsmithing_Tier4_Longbow_4".
        LVL:21 ,name:"Elemental Longsword" taskname:"Weaponsmithing_Tier4_Longsword_4".
        LVL:21 ,name:"Elemental Mace" taskname:"Weaponsmithing_Tier4_Mace_4".
        LVL:22 ,name:"Adamant and Ebony Trading" taskname:"Weaponsmithing_Tier4_Gather_Special".
        LVL:22 ,name:"Adamantine Blades and Ebony Hafts Trading" taskname:"Weaponsmithing_Tier4_Refine_Special".
        LVL:22 ,name:"Elemental Battleaxe" taskname:"Weaponsmithing_Tier4_Battleaxe_4".
        LVL:22 ,name:"Elemental Blades" taskname:"Weaponsmithing_Tier4_Blades_4".
        LVL:22 ,name:"Elemental Greataxe" taskname:"Weaponsmithing_Tier4_Greataxe_4".
        LVL:22 ,name:"Elemental Short Sword" taskname:"Weaponsmithing_Tier4_Shortsword_4".
        LVL:23 ,name:"Archer's Elemental Longbow" taskname:"Weaponsmithing_Tier4_Longbow_Set_2".
        LVL:23 ,name:"Berserker's Elemental Greatsword" taskname:"Weaponsmithing_Tier4_Greatsword_Set_2".
        LVL:23 ,name:"Elemental Sword Knot" taskname:"Weaponsmithing_Tier4_Swordknot_4".
        LVL:23 ,name:"Knight's Elemental Mace" taskname:"Weaponsmithing_Tier4_Mace_Set_2".
        LVL:23 ,name:"Prowler's Elemental Dagger" taskname:"Weaponsmithing_Tier4_Dagger_Set_2".
        LVL:23 ,name:"Warrior's Elemental Longsword" taskname:"Weaponsmithing_Tier4_Longsword_Set_2".
        LVL:24 ,name:"Archer's Elemental Blades" taskname:"Weaponsmithing_Tier4_Blades_Set_2".
        LVL:24 ,name:"Berserker's Elemental Greataxe" taskname:"Weaponsmithing_Tier4_Greataxe_Set_2".
        LVL:24 ,name:"Prowler's Elemental Short Sword" taskname:"Weaponsmithing_Tier4_Shortsword_Set_2".
        LVL:24 ,name:"Soldier's Elemental Sword Knot" taskname:"Weaponsmithing_Tier4_Swordknot_Set_2".
        LVL:24 ,name:"Warrior's Elemental Battleaxe" taskname:"Weaponsmithing_Tier4_Battleaxe_Set_2".
        LVL:25 ,name:"Defender's Elemental Longsword" taskname:"Weaponsmithing_Tier4_Longsword_Set_3".
        LVL:25 ,name:"Radiant Elemental Mace" taskname:"Weaponsmithing_Tier4_Mace_Set_3".
        LVL:25 ,name:"Soldier's Elemental Greatsword" taskname:"Weaponsmithing_Tier4_Greatsword_Set_3".
        LVL:25 ,name:"Vagabond's Elemental Dagger" taskname:"Weaponsmithing_Tier4_Dagger_Set_3".
        LVL:25 ,name:"Warden's Elemental Blades" taskname:"Weaponsmithing_Tier4_Blades_Set_3".
        LVL:25 ,name:"Warden's Elemental Longbow" taskname:"Weaponsmithing_Tier4_Longbow_Set_3".
 
Rares:
        Weaponsmithing_Tier1_Battleaxe_Blue_1 : "Battleaxe +1",
        Weaponsmithing_Tier1_Blades_Blue_1 : "Blades +1",
        Weaponsmithing_Tier1_Dagger_Blue_1 : "Dagger +1",
        Weaponsmithing_Tier1_Greataxe_Blue_1 : "Greataxe +1",
        Weaponsmithing_Tier1_Greatsword_Blue_1 : "Greatsword +1",
        Weaponsmithing_Tier1_Blades_Blue_1 : "Longbow +1",
        Weaponsmithing_Tier1_Longsword_Blue_1 : "Longsword +1",
        Weaponsmithing_Tier1_Shortsword_Blue_1 : "Short Sword +1",
        Weaponsmithing_Tier1_Swordknot_Blue_1 : "Sword Knot +1",
        Weaponsmithing_Tier1_Dagger_Blue_2 : "Dagger +2",
        Weaponsmithing_Tier1_Greatsword_Blue_2 : "Greatsword +2",
        Weaponsmithing_Tier1_Longbow_Blue_2 : "Longbow +2",
        Weaponsmithing_Tier1_Battleaxe_Blue_2 : "Battleaxe +2",
        Weaponsmithing_Tier1_Blades_Blue_2 : "Blades +2",
        Weaponsmithing_Tier1_Shortsword_Blue_2 : "Short Sword +2",
        Weaponsmithing_Tier1_Swordknot_Blue_2 : "Sword Knot +2",
        Weaponsmithing_Tier2_Battleaxe_Blue_3 : "Battleaxe +3",
        Weaponsmithing_Tier2_Blades_Blue_3 : "Blades +3",
        Weaponsmithing_Tier2_Greataxe_Blue_3 : "Greataxe +3",
        Weaponsmiithing_Tier2_Greatsword_Blue_3 : "Greatsword +3",
        Weaponsmithing_Tier2_Blades_Blue_3 : "Longbow +3",
        Weaponsmithing_Tier3_Blades_Blue_4 : "Blades +4",
        Weaponsmithing_Tier3_Dagger_Blue_4 : "Dagger +4",
        Weaponsmithing_Tier3_Greatsword_Blue_4 : "Greatsword +4",
        Weaponsmithing_Tier3_Longbow_Blue_4 : "Longbow +4",
        Weaponsmithing_Tier3_Battleaxe_Blue_4 : "Battleaxe +4",
        Weaponsmithing_Tier3_P_Shortsword_Blue_4 : "Charmed Short Sword +4",
        Weaponsmithing_Tier3_Shortsword_Blue_4 : "Short Sword +4",
        Weaponsmithing_Tier3_Blades_Blue_4 : "Blades +4",
        Weaponsmithing_Tier3_Longbow_Blue_4 : "Longbow +4",
        Weaponsmithing_Tier3_Longsword_Blue_5 : "Longsword +5",
        Weaponsmithing_Tier3_P_Shortsword_Blue_5 : "Charmed Short Sword +5",
        Weaponsmithing_Tier3_Shortsword_Blue_5 : "Short Sword +5",
        Weaponsmithing_Tier3_Swordknot_Blue_5 : "Sword Knot +5",
        Weaponsmithing_Tier3_Battleaxe_Purple_6 : "Battleaxe +6",
        Weaponsmithing_Tier3_Blades_ : "Blades +6",
        Weaponsmithing_Tier3_Greataxe_Purple_6 : "Greataxe +6",
        Weaponsmithing_Tier3_Longsword_Purple_6 : "Longsword +6",
        Weaponsmithing_Tier3_Shortsword_Purple_6 : "Short Sword +6",
        Weaponsmithing_Tier3_Swordknot_Purple_6 : "Sword Knot +6",
    },
Jewelcrafting : {
        LVL:1 ,name:"Craft Gems and Leather Strips" taskname:"Jewelcrafting_Tier1_Refine_Basic".
        LVL:1 ,name:"Mass Gems and Leather Strips crafting" taskname:"Jewelcrafting_Tier1_Refine_Basic_Mass".
        LVL:1 ,name:"Witch's Belt" taskname:"Jewelcrafting_Tier1_Waist_Offense_1".
        LVL:2 ,name:"Iron and Pelt Trading" taskname:"Jewelcrafting_Tier1_Gather_Special".
        LVL:2 ,name:"Witch's Ring" taskname:"Jewelcrafting_Tier1_Ring_Offense_1".
        LVL:3 ,name:"Upgrade Jewelcrafter" taskname:"Jewelcrafting_Tier1_Recruit_Master_Blue".
        LVL:3 ,name:"Raw Gems and Simple Leather Strip trading" taskname:"Jewelcrafting_Tier1_Refine_Special".
        LVL:3 ,name:"Upgrade Iron Bezel Pusher" taskname:"Jewelcrafting_Tier1_Trade_Bezaelpusher_Blue".
        LVL:3 ,name:"Upgrade Iron Jeweler's Loupe" taskname:"Jewelcrafting_Tier1_Trade_Loupe_Blue".
        LVL:3 ,name:"Upgrade Iron Crucible" taskname:"Jewelcrafting_Tier1_Trade_Crucible_Blue".
        LVL:3 ,name:"Witch's Necklace" taskname:"Jewelcrafting_Tier1_Neck_Offense_1".
        LVL:3 ,name:"Defender's Belt" taskname:"Jewelcrafting_Tier1_Waist_Defense_1".
        LVL:4 ,name:"Upgrade Master Jewelcrafter" taskname:"Jewelcrafting_Tier1_Recruit_Master_Purple".
        LVL:4 ,name:"Upgrade Steel Bezel Pusher" taskname:"Jewelcrafting_Tier2_Trade_Bezaelpusher_Purple".
        LVL:4 ,name:"Upgrade Steel Crucible" taskname:"Jewelcrafting_Tier1_Trade_Crucible_Purple".
        LVL:4 ,name:"Upgrade Steel Jeweler's Loupe" taskname:"Jewelcrafting_Tier1_Trade_Loupe_Purple".
        LVL:4 ,name:"Defender's Ring" taskname:"Jewelcrafting_Tier1_Ring_Defense_1".
        LVL:4 ,name:"Belt of Reformation" taskname:"Jewelcrafting_Tier1_Waist_Misc_1".
        LVL:5 ,name:"Defender's Necklace" taskname:"Jewelcrafting_Tier1_Neck_Defense_1".
        LVL:5 ,name:"Ring of Reformation" taskname:"Jewelcrafting_Tier1_Ring_Misc_1".
        LVL:6 ,name:"Upgrade Polisher" taskname:"Jewelcrafting_Tier1_Recruit_Journeyman".
        LVL:6 ,name:"Necklace of Reformation" taskname:"Jewelcrafting_Tier1_Neck_Misc_1".
        LVL:7 ,name:"Iron and Pelt Trading" taskname:"Jewelcrafting_Tier2_Gather_Special".
        LVL:7 ,name:"Gem and Leather Strip crafting" taskname:"Jewelcrafting_Tier2_Refine_Basic".
        LVL:7 ,name:"Mass Gem and Leather Strip crafting" taskname:"Jewelcrafting_Tier2_Refine_Basic_Mass".
        LVL:7 ,name:"Mage's Belt" taskname:"Jewelcrafting_Tier2_Waist_Offense_2".
        LVL:8 ,name:"Gem and Leather Strip Trading" taskname:"Jewelcrafting_Tier2_Refine_Special".
        LVL:8 ,name:"Mage's Ring" taskname:"Jewelcrafting_Tier2_Ring_Offense_2".
        LVL:9 ,name:"Mage's Necklace" taskname:"Jewelcrafting_Tier2_Neck_Offense_2".
        LVL:9 ,name:"Warrior's Belt" taskname:"Jewelcrafting_Tier2_Waist_Defense_2".
        LVL:10 ,name:"Warrior's Ring" taskname:"Jewelcrafting_Tier2_Ring_Defense_2".
        LVL:10 ,name:"Belt of Replenishment" taskname:"Jewelcrafting_Tier2_Waist_Misc_2".
        LVL:11 ,name:"Warrior's Necklace" taskname:"Jewelcrafting_Tier2_Neck_Defense_2".
        LVL:12 ,name:"Ring of Replenishment" taskname:"Jewelcrafting_Tier2_Ring_Misc_2".
        LVL:13 ,name:"Upgrade Gem Setter" taskname:"Jewelcrafting_Tier2_Recruit_Journeyman".
        LVL:13 ,name:"Necklace of Replenishment" taskname:"Jewelcrafting_Tier2_Neck_Misc_2".
        LVL:14 ,name:"Mithral and Pelt Trading" taskname:"Jewelcrafting_Tier3_Gather_Special".
        LVL:14 ,name:"Gem and Leather Strip crafting" taskname:"Jewelcrafting_Tier3_Refine_Basic".
        LVL:14 ,name:"Mass Gem and Leather Strip crafting" taskname:"Jewelcrafting_Tier3_Refine_Basic_Mass".
        LVL:14 ,name:"Wizard's Belt" taskname:"Jewelcrafting_Tier3_Waist_Offense_3".
        LVL:15 ,name:"Gem and Leather Strip Trading" taskname:"Jewelcrafting_Tier3_Refine_Special".
        LVL:15 ,name:"Action Point Gain Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Apgain_02".
        LVL:15 ,name:"Regeneration Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Regeneration_02".
        LVL:15 ,name:"Stamina Regeneration Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Staregen_02".
        LVL:15 ,name:"Wizard's Ring" taskname:"Jewelcrafting_Tier3_Ring_Offense_3".
        LVL:16 ,name:"Wizard's Necklace" taskname:"Jewelcrafting_Tier3_Neck_Offense_3".
        LVL:16 ,name:"Knight's Belt" taskname:"Jewelcrafting_Tier3_Waist_Defense_3".
        LVL:17 ,name:"Knight's Necklace" taskname:"Jewelcrafting_Tier3_Neck_Defense_3".
        LVL:17 ,name:"Knight's Ring" taskname:"Jewelcrafting_Tier3_Ring_Defense_3".
        LVL:18 ,name:"Belt of Renewal" taskname:"Jewelcrafting_Tier3_Waist_Misc_3".
        LVL:19 ,name:"Ring of Renewal" taskname:"Jewelcrafting_Tier3_Ring_Misc_3".
        LVL:20 ,name:"Greater Action Point Gain Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Apgain".
        LVL:20 ,name:"Greater Regeneration Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Regeneration".
        LVL:20 ,name:"Greater Stamina Regeneration Jewel" taskname:"Jewelcrafting_Tier3_Special_Reinforcement_Kit_Staregen".
        LVL:20 ,name:"Necklace of Renewal" taskname:"Jewelcrafting_Tier3_Neck_Misc_3".
        LVL:20 ,name:"Personalized Archmage's Necklace +6" taskname:"Jewelcrafting_Tier3_Neck_Offense_4_Purple_2".
        LVL:20 ,name:"Personalized Hero's Necklace +6" taskname:"Jewelcrafting_Tier3_Neck_Defense_4_Purple_2".
        LVL:20 ,name:"Personalized Necklace of Revitalization +6" taskname:"Jewelcrafting_Tier3_Neck_Misc_4_Purple_2".
        LVL:20 ,name:"Personalized Archmage's Ring +6" taskname:"Jewelcrafting_Tier3_Ring_Offense_4_Purple_2".
        LVL:20 ,name:"Personalized Hero's Ring +6" taskname:"Jewelcrafting_Tier3_Ring_Defense_4_Purple_2".
        LVL:20 ,name:"Personalized Ring of Revitalization +6" taskname:"Jewelcrafting_Tier3_Ring_Misc_4_Purple_2".
        LVL:20 ,name:"Personalized Archmage's Belt +6" taskname:"Jewelcrafting_Tier3_Waist_Offense_4_Purple_2".
        LVL:20 ,name:"Personalized Belt of Revitalization +6" taskname:"Jewelcrafting_Tier3_Waist_Misc_4_Purple_2".
        LVL:20 ,name:"Personalized Hero's Belt +6" taskname:"Jewelcrafting_Tier3_Waist_Defense_4_Purple_2".
        LVL:21 ,name:"Perfect Gem and Aberrant Leather Strip Crafting" taskname:"Jewelcrafting_Tier4_Refine_Basic".
        LVL:21 ,name:"Mass Gem and Leather Strip Crafting" taskname:"Jewelcrafting_Tier4_Refine_Basic_Mass".
        LVL:22 ,name:"Adamant Ore and Aberrant Pelt Trading" taskname:"Jewelcrafting_Tier4_Gather_Special".
        LVL:22 ,name:"Perfect Gem and Aberrant Leather Strip Trading" taskname:"Jewelcrafting_Tier4_Refine_Special".
        LVL:22 ,name:"Adamant Necklace" taskname:"Jewelcrafting_Tier4_Neck_Base_3".
        LVL:22 ,name:"Adamant Ring" taskname:"Jewelcrafting_Tier4_Ring_Base_3".
        LVL:22 ,name:"Aberrant Belt" taskname:"Jewelcrafting_Tier4_Waist_Base_3".
        LVL:23 ,name:"Adamant Necklace of Piercing" taskname:"Jewelcrafting_Tier4_Neck_Offense_3".
        LVL:23 ,name:"Adamant Necklace of Regeneration" taskname:"Jewelcrafting_Tier4_Neck_Defense_3".
        LVL:23 ,name:"Adamant Ring of Piercing" taskname:"Jewelcrafting_Tier4_Ring_Offense_3".
        LVL:23 ,name:"Adamant Ring of Regeneration" taskname:"Jewelcrafting_Tier4_Ring_Defense_3".
        LVL:23 ,name:"Aberrant Belt of Piercing" taskname:"Jewelcrafting_Tier4_Waist_Offense_3".
        LVL:23 ,name:"Aberrant Belt of Regeneration" taskname:"Jewelcrafting_Tier4_Waist_Defense_3".
        LVL:24 ,name:"Adamant Necklace of Recovery" taskname:"Jewelcrafting_Tier4_Neck_Misc_3".
        LVL:24 ,name:"Adamant Ring of Recovery" taskname:"Jewelcrafting_Tier4_Ring_Misc_3".
        LVL:24 ,name:"Aberrant Belt of Recovery" taskname:"Jewelcrafting_Tier4_Waist_Misc_3".
        LVL:25 ,name:"Major Action Point Gain Jewel" taskname:"Jewelcrafting_Tier4_Special_Reinforcement_Kit_Apgain".
        LVL:25 ,name:"Major Regeneration Jewel" taskname:"Jewelcrafting_Tier4_Special_Reinforcement_Kit_Regeneration".
        LVL:25 ,name:"Major Stamina Regeneration Jewel" taskname:"Jewelcrafting_Tier4_Special_Reinforcement_Kit_Staregen".
        LVL:25 ,name:"Personalized Adamant Necklace of Piercing" taskname:"Jewelcrafting_Tier4_Neck_Offense_4_Purple_2".
        LVL:25 ,name:"Personalized Adamant Necklace of Recovery" taskname:"Jewelcrafting_Tier4_Neck_Misc_4_Purple_2".
        LVL:25 ,name:"Personalized Adamant Necklace of Regeneration" taskname:"Jewelcrafting_Tier4_Neck_Defense_4_Purple_2".
        LVL:25 ,name:"Personalized Adamant Ring of Piercing" taskname:"Jewelcrafting_Tier4_Ring_Offense_4_Purple_2".
        LVL:25 ,name:"Personalized Adamant Ring of Recovery" taskname:"Jewelcrafting_Tier4_Ring_Misc_4_Purple_2".
        LVL:25 ,name:"Personalized Adamant Ring of Regeneration" taskname:"Jewelcrafting_Tier4_Ring_Defense_4_Purple_2".
        LVL:25 ,name:"Personalized Aberrant Belt of Piercing" taskname:"Jewelcrafting_Tier4_Waist_Offense_4_Purple_2".
        LVL:25 ,name:"Personalized Aberrant Belt of Recovery" taskname:"Jewelcrafting_Tier4_Waist_Misc_4_Purple_2".
        LVL:25 ,name:"Personalized Aberrant Belt of Regeneration" taskname:"Jewelcrafting_Tier4_Waist_Defense_4_Purple_2".
 
Rares:
        LVL:3 ,name:"Witch's Ring +1" taskname:"Jewelcrafting_Tier1_Ring_Offense_1_Blue".
        LVL:20 ,name:"Necklace of Revitalization +6" taskname:"Jewelcrafting_Tier3_Neck_Misc_4_Purple".
        LVL:25 ,name:"Superior Adamant Necklace of Recovery" taskname:"Jewelcrafting_Tier4_Neck_Misc_3_Blue".
        LVL:25 ,name:"Superior Adamant Ring of Recovery" taskname:"Jewelcrafting_Tier4_Ring_Misc_3_Blue".
        LVL:25 ,name:"Superior Aberrant Belt of Recovery" taskname:"Jewelcrafting_Tier4_Waist_Misc_3_Blue".
  },
BlackIce : { // Black Ice Shaping
        LVL:1 ,name:"Upgrade Chillwright" taskname:"Blackice_Tier1_Recruit_Blackice_Smith".
        LVL:1 ,name:"Gather Raw Black Ice" taskname:"Blackice_Tier1_Gather_Rawblackice".
        LVL:1 ,name:"Process Raw Black Ice" taskname:"Blackice_Tier1_Process_Blackice".
        LVL:1 ,name:"Mass Process Raw Black Ice" taskname:"Blackice_Tier1_Mass_Process_Blackice".
        LVL:1 ,name:"Forge Hammerstone Pick" taskname:"Blackice_Tier1_Hammerstone_Pick".
        LVL:1 ,name:"Truesilver Pick Grip" taskname:"Blackice_Tier1_Greenpotion".
        LVL:2 ,name:"Upgrade Black Ice Smith" taskname:"Blackice_Tier2_Recruit_Assistant_Cryomancer".
        LVL:2 ,name:"Upgrade Cryomancer" taskname:"Blackice_Tier2_Recruit_Master_Cyromancer".
        LVL:2 ,name:"Lesser Corrupt Black Ice Enchantment" taskname:"Blackice_Tier2_Corrupt_Enchantment_Lesser".
        LVL:2 ,name:"Lesser Corrupt Lethal Enchantment" taskname:"Blackice_Tier2_Corrupt_Enchantment_Crit_Lesser".
        LVL:2 ,name:"Lesser Corrupt Piercing Enchantment" taskname:"Blackice_Tier2_Corrupt_Enchantment_Arpen_Lesser".
        LVL:2 ,name:"Lesser Purified Black Ice Enchantment" taskname:"Blackice_Tier2_Purified_Enchantment_Lesser".
        LVL:2 ,name:"Lesser Purified Restoration Enchantment" taskname:"Blackice_Tier2_Purified_Enchantment_Healthsteal_Lesser".
        LVL:2 ,name:"Lesser Purified Tempered Enchantment" taskname:"Blackice_Tier2_Purified_Enchantment_Deflect_Lesser".
        LVL:2 ,name:"Trade Iron Gauntlets for Steel Gauntlets" taskname:"Blackice_Tier2_Trade_Gauntlets_Blue".
        LVL:2 ,name:"Trade Iron Gravers for Steel Gravers" taskname:"Blackice_Tier2_Trade_Graver_Blue".
        LVL:2 ,name:"Corrupted Black Ice Cowl" taskname:"Blackice_Tier2_Corrupt_Head_Controller".
        LVL:2 ,name:"Purified Black Ice Cowl" taskname:"Blackice_Tier2_Purified_Head_Controller".
        LVL:2 ,name:"Corrupted Black Ice Gloves" taskname:"Blackice_Tier2_Corrupt_Arms_Controller".
        LVL:2 ,name:"Purified Black Ice Gloves" taskname:"Blackice_Tier2_Purified_Arms_Controller".
        LVL:2 ,name:"Corrupted Black Ice Boots" taskname:"Blackice_Tier2_Corrupt_Feet_Controller".
        LVL:2 ,name:"Purified Black Ice Boots" taskname:"Blackice_Tier2_Purified_Feet_Controller".
        LVL:3 ,name:"Upgrade the Black Ice Forge" taskname:"Blackice_Tier3_Upgrade_Blackice_Forge_Rank4".
        LVL:3 ,name:"Upgrade Master Cryomancer" taskname:"Blackice_Tier3_Recruit_Gandmaster_Cyromancer".
        LVL:3 ,name:"Greater Corrupt Black Ice Enchantment" taskname:"Blackice_Tier3_Corrupt_Enchantment_Greater".
        LVL:3 ,name:"Greater Corrupt Lethal Enchantment" taskname:"Blackice_Tier3_Corrupt_Enchantment_Crit_Greater".
        LVL:3 ,name:"Greater Corrupt Piercing Enchantment" taskname:"Blackice_Tier3_Corrupt_Enchantment_Arpen_Greater".
        LVL:3 ,name:"Greater Purified Black Ice Enchantment" taskname:"Blackice_Tier3_Purified_Enchantment_Greater".
        LVL:3 ,name:"Greater Purified Restoration Enchantment"taskname:"Blackice_Tier3_Purified_Enchantment_Healthsteal_Greater".
        LVL:3 ,name:"Greater Purified Tempered Enchantment" taskname:"Blackice_Tier3_Purified_Enchantment_Deflect_Greater".
        LVL:3 ,name:"Trade Steel Gauntlets for Mithral Gauntlets" taskname:"Blackice_Tier2_Trade_Gauntlets_Purple".
        LVL:3 ,name:"Trade Steel Gravers for Mithral Gravers" taskname:"Blackice_Tier2_Trade_Graver_Purple".
        LVL:3 ,name:"Corrupted Black Ice Armor" taskname:"Blackice_Tier3_Corrupt_Body_Controller".
        LVL:3 ,name:"Purified Black Ice Armor" taskname:"Blackice_Tier3_Purified_Body_Controller".
        LVL:3 ,name:"Corrupted Black Ice Orb" taskname:"Blackice_Tier3_Corrupt_Primary_Controller".
        LVL:3 ,name:"Purified Black Ice Orb" taskname:"Blackice_Tier3_Purified_Primary_Controller".
        LVL:3 ,name:"Corrupted Black Ice Talisman" taskname:"Blackice_Tier3_Corrupt_Secondary_Controller".
        LVL:3 ,name:"Purified Black Ice Talisman" taskname:"Blackice_Tier3_Purified_Secondary_Controller".
        LVL:4 ,name:"Upgrade the Black Ice Forge" taskname:"Blackice_Tier4_Upgrade_Blackice_Forge_Rank_5".
        LVL:4 ,name:"Elemental Purified Black Ice Armor" taskname:"Blackice_Tier4_Elemental_Purified_Body_Controller".
        LVL:4 ,name:"Elemental Purified Black Ice Boots" taskname:"Blackice_Tier4_Elemental_Purified_Feet_Controller".
        LVL:4 ,name:"Elemental Purified Black Ice Cowl" taskname:"Blackice_Tier4_Elemental_Purified_Head_Controller".
        LVL:4 ,name:"Elemental Purified Black Ice Gloves" taskname:"Blackice_Tier4_Elemental_Purified_Arms_Controller".
        LVL:4 ,name:"Elemental Purified Black Ice Gloves" taskname:"Blackice_Tier4_Elemental_Purified_Arms_Controller_2".
        LVL:4 ,name:"Elemental Corrupted Black Ice Armor" taskname:"Blackice_Tier4_Elemental_Corrupt_Body_Controller".
        LVL:4 ,name:"Elemental Corrupted Black Ice Cowl" taskname:"Blackice_Tier4_Elemental_Corrupt_Head_Controller".
        LVL:4 ,name:"Elemental Corrupted Black Ice Gloves" taskname:"Blackice_Tier4_Elemental_Corrupt_Arms_Controller_2".
        LVL:4 ,name:"Elemental Corrupted Black Ice Gloves" taskname:"Blackice_Tier4_Elemental_Corrupt_Arms_Controller".
        LVL:4 ,name:"Elemental Corrupted Black Ice Boots" taskname:"Blackice_Tier4_Elemental_Corrupt_Feet_Controller".
        LVL:5 ,name:"Elemental Alliance Assault Boots" taskname:"Blackice_Tier4_Elemental_Alliance_01_Feet_Controller".
        LVL:5 ,name:"Elemental Alliance Assault Cowl" taskname:"Blackice_Tier4_Elemental_Alliance_01_Head_Controller".
        LVL:5 ,name:"Elemental Alliance Assault Gloves" taskname:"Blackice_Tier4_Elemental_Alliance_01_Arms_Controller".
        LVL:5 ,name:"Elemental Alliance Assault Robes" taskname:"Blackice_Tier4_Elemental_Alliance_01_Body_Controller_2".
        LVL:5 ,name:"Elemental Alliance Raid Boots" taskname:"Blackice_Tier4_Elemental_Alliance_02_Feet_Controller".
        LVL:5 ,name:"Elemental Alliance Raid Cowl" taskname:"Blackice_Tier4_Elemental_Alliance_02_Head_Controller".
        LVL:5 ,name:"Elemental Alliance Raid Gloves" taskname:"Blackice_Tier4_Elemental_Alliance_02_Arms_Controller".
        LVL:5 ,name:"Elemental Alliance Raid Robes" taskname:"Blackice_Tier4_Elemental_Alliance_02_Body_Controller".
        LVL:5 ,name:"Elemental Elven Assault Boots" taskname:"Blackice_Tier4_Elemental_Elven_01_Feet_Controller".
        LVL:5 ,name:"Elemental Elven Assault Cowl" taskname:"Blackice_Tier4_Elemental_Elven_01_Head_Controller".
        LVL:5 ,name:"Elemental Elven Assault Gloves" taskname:"Blackice_Tier4_Elemental_Elven_01_Arms_Controller".
        LVL:5 ,name:"Elemental Elven Assault Robes" taskname:"Blackice_Tier4_Elemental_Elven_01_Body_Controller_2".
        LVL:5 ,name:"Elemental Elven Raid Boots" taskname:"Blackice_Tier4_Elemental_Elven_02_Feet_Controller".
        LVL:5 ,name:"Elemental Elven Raid Cowl" taskname:"Blackice_Tier4_Elemental_Elven_02_Head_Controller".
        LVL:5 ,name:"Elemental Elven Raid Gloves" taskname:"Blackice_Tier4_Elemental_Elven_02_Arms_Controller".
        LVL:5 ,name:"Elemental Elven Raid Robes" taskname:"Blackice_Tier4_Elemental_Elven_02_Body_Controller".
 },
}