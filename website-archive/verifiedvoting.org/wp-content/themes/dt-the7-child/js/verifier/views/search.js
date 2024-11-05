search = {
  ejsTemplate: undefined,

  render: function () {
    if (this.ejsTemplate === undefined) {
      this.ejsTemplate = new EJS({url: '/wp-content/themes/dt-the7-child/js/verifier/templates/search.ejs'});
    }

    $('#advanced-search-container').show();
    $('#advanced-search-container').html(this.ejsTemplate.render());

    $('#machine-search').submit(function () {
      verifier.search();
      return false;
    });

    $('#reset-search').click(function () {
      $('#machine-search').find('select').prop('selectedIndex', 0);

      verifier.navigate({
        year: appConstants.defaultYear,
        state: undefined,
        equipment: undefined,
        make: undefined,
        model: undefined
      });

      verifier.searchResetClick = true;
      verifier.search();

      return false;
    });
  },

  remove: function () {
    $('#advanced-search-container').empty();
    $('#advanced-search-container').hide();
  },

  searchEquipments: [
    {key: "Ballot Marking Device", value: "Ballot Marking Device"},
    {key: "Commercial Electronic Poll Book", value: "Commercial Electronic Poll Book"},
    {key: "DRE", value: "DRE"},
    {key: "- DRE-Dial", value: "DRE-Dial"},
    {key: "- DRE-Push Button", value: "DRE-Push Button"},
    {key: "- DRE-Touchscreen", value: "DRE-Touchscreen"},
    {key: "Hand Counted Paper Ballots", value: "Hand Counted Paper Ballots"},
    {key: "Hybrid BMD/Tabulator", value: "Hybrid BMD/Tabulator"},
    {key: "Hybrid Optical Scan/BMD", value: "Hybrid Optical Scan/BMD"},
    {key: "Hybrid Optical Scan/DRE", value: "Hybrid Optical Scan/DRE"},
    {key: "In-House Electronic Poll Book", value: "In-House Electronic Poll Book"},
    {key: "Internet Voting (certain voters)", value: "Internet Voting"},
    {key: "- Internet Voting: Email (certain voters)", value: "Internet Voting: Email"},
    {key: "- Internet Voting: Fax (certain voters)", value: "Internet Voting: Fax"},
    {key: "- Internet Voting: Web Portal (certain voters)", value: "Internet Voting: Web Portal"},
    {key: "Mechanical Lever Machine", value: "Mechanical Lever Machine"},
    {key: "Optical Scanner", value: "Optical Scanner"},
    {key: "- Batch-Fed Optical Scanner", value: "Batch-Fed Optical Scanner"},
    {key: "- Hand-Fed Optical Scanner", value: "Hand-Fed Optical Scanner"},
    {key: "Paper Poll Book", value: "Paper Poll Book"},
    {key: "Punch Card Voting System", value: "Punch Card Voting System"},
    {key: "Remote Ballot Marking System (certain voters)", value: "Remote Ballot Marking System"},
    {key: "- Remote Ballot Marking System: Client-Side", value: "Remote Ballot Marking System: Client-Side"},
    {key: "- Remote Ballot Marking System: Server-Side", value: "Remote Ballot Marking System: Server-Side"}
  ],

  searchMakes: [
    {value: "AVS"},
    {value: "Avante"},
    {value: "Clear Ballot"},
    {value: "Danaher"},
    {value: "Democracy Live"},
    {value: "DemTech"},
    {value: "DFM"},
    {value: "Diebold"},
    {value: "Dominion"},
    {value: "ES&S"},
    {value: "Enhanced Voting"},
    {value: "Five Cedars"},
    {value: "Hart InterCivic"},
    {value: "HelpSystems"},
    {value: "IVS"},
    {value: "KNOWiNK"},
    {value: "MicroVote"},
    {value: "Populex"},
    {value: "Premier (Diebold)"},
    {value: "Prime III"},
    {value: "Robis"},
    {value: "Scytl"},
    {value: "Sequoia"},
    {value: "Smartmatic"},
    {value: "Tenex"},
    {value: "TRIAD"},
    {value: "Unisyn"},
    {value: "Voatz"},
    {value: "Vote-PAD"},
    {value: "Votec"},
    {value: "Votem"},
    {value: "VotingWorks"},
    {value: "VTI"},
    {value: "VR Systems"}
  ],

  searchModels: [
    {value: "Accessible Ballot Marking Tool (ABMT)"},
    {value: "AccuVote OS"},
    {value: "AccuVote OS Central"},
    {value: "AccuVote OSX"},
    {value: "AccuVote TS"},
    {value: "AccuVote TSX"},
    {value: "Advocate Precinct"},
    {value: "Alternate Format Ballot"},
    {value: "AskED ePollbook"},
    {value: "AutoMARK"},
    {value: "AVC Advantage"},
    {value: "AVC Edge"},
    {value: "Ballot Now"},
    {value: "BallotSafe"},
    {value: "CastIron"},
    {value: "ClearAccess"},
    {value: "ClearCast"},
    {value: "ClearCount"},
    {value: "ClearMark"},
    {value: "DS200"},
    {value: "DS300"},
    {value: "DS450"},
    {value: "DS850"},
    {value: "DS950"},
    {value: "EIMS"},
    {value: "Enhanced Ballot"},
    {value: "ePollTAB"},
    {value: "eScan"},
    {value: "eScan A/T"},
    {value: "eSlate"},
    {value: "EViD"},
    {value: "ExpressPoll"},
    {value: "ExpressTouch"},
    {value: "ExpressVote"},
    {value: "ExpressVote Tabulator"},
    {value: "ExpressVote XL"},
    {value: "GoAnywhere MFT"},
    {value: "ImageCast Central"},
    {value: "ImageCast Evolution"},
    {value: "ImageCast Precinct"},
    {value: "ImageCast Precinct ATI"},
    {value: "ImageCast Precinct BMD"},
    {value: "ImageCast X BMD"},
    {value: "ImageCast X DRE"},
    {value: "ImageCast Remote"},
    {value: "Infinity"},
    {value: "InkaVote"},
    {value: "Inspire Ballot Marking System"},
    {value: "Inspire Vote By Phone"},
    {value: "iVotronic"},
    {value: "LiveBallot"},
    {value: "Mark-a-Vote"},
    {value: "MicroVote/Chatsworth Scanner"},
    {value: "Mobile Voting App"},
    {value: "Model 100"},
    {value: "Model 150"},
    {value: "Model 550"},
    {value: "Model 650"},
    {value: "MV-464"},
    {value: "MyBallot"},
    {value: "OmniBallot Online"},
    {value: "OmniBallot Tablet"},
    {value: "OpenElect FVS"},
    {value: "OpenElect FVT"},
    {value: "OpenElect OVI"},
    {value: "OpenElect OVI-VC"},
    {value: "OpenElect OVO"},
    {value: "OpenElect OVCS"},
    {value: "Optech 400C"},
    {value: "Optech IIIP-Eagle"},
    {value: "Optech Insight"},
    {value: "Optech IV-C"},
    {value: "Patriot"},
    {value: "Patriot Marksense Scanner"},
    {value: "Poll Pad"},
    {value: "PopulexSlate"},
    {value: "Precinct Central"},
    {value: "Prime III"},
    {value: "Secure Select"},
    {value: "Shouptronic 1242"},
    {value: "Verity Central"},
    {value: "Verity Duo"},
    {value: "Verity Scan"},
    {value: "Verity Touch"},
    {value: "Verity Touch Writer"},
    {value: "Vote Center App"},
    {value: "Vote-PAD Ballot Marking System"},
    {value: "Vote-Trakker"},
    {value: "VoteSafe"},
    {value: "Votomatic"},
    {value: "VSAP Ballot Marking Device"},
    {value: "VSAP Interactive Sample Ballot"},
    {value: "VSAP Tally"},
    {value: "VX Ballot Marking Device"},
    {value: "VX Ballot Scanner"},
    {value: "WinScan"},
    {value: "WinVote"}
  ],

"model_list": {
        "AES": [
            "AutoVote"
        ],
        "American Election Systems": [
            "Auto Poll Book"
        ],
        "American Elections": [
            "Auto Poll Book"
        ],
        "American Elections Inc.": [
            "Auto Poll Book"
        ],
        "American Elections Systems": [
            " Auto Poll Book",
            "Auto Poll Book"
        ],
        "Amerrican Election Systems": [
            "Auto Poll Book"
        ],
        "Avante": [
            "Optical Vote-Trakker",
            "Vote-Trakker",
            "Vote-Trakker Ballot Marking Device"
        ],
        "AVM": [
            "AVM Manual",
            "AVM Printomatic",
        ],
        "AVS": [
            "WinScan",
            "WinVote"
        ],
        "AZ SoS": [
            "Uniformed and Overseas Citizen Portal",
            "UOCAVA Portal"
        ],
        "Boone County": [
            "Boone County Electronic Pollbook"
        ],
        "BPro": [
            "TotalVote ePollbook"
        ],
        "Cerro Gordo County IA": [
            "Precinct Atlas"
        ],
        "Clear Ballot": [
            "ClearAccess",
            "ClearCast",
            "ClearCast Go",
            "ClearCount",
            "ClearMark"
        ],
        "CO SoS": [
            "CO Electronic Pollbook",
            "Electronic PollBook",
            "SCORE"
        ],
        "ContentActive": [
            "Electronic Pollbook",
            "Harris County Electronic Pollbook"
        ],
        "Danaher": [
            "Shouptronic 1242",
        ],
        "Data Unavailable": [
            "Data Unavailable",
        ],
        "Decision Support": [
            "EViD"
        ],
        "Democracy Live": [
            "LiveBallot",
            "OmniBallot Online",
            "OmniBallot Tablet",
            "Secure Select"
        ],
        "DemTech": [
            "Advocate Precinct",
            "ePollTAB"
        ],
        "DFM": [
            "EIMS",
            "Mark-a-Vote",
            "Vote Center App"
        ],
        "Diebold": [
            "AccuVote OS",
            "AccuVote OS Central",
            "AccuVote TS",
            "AccuVote TSX",
            "ExpressPoll"
        ],
        "Dominion": [
            "ImageCast Central",
            "ImageCast Evolution",
            "ImageCast Precinct",
            "ImageCast Precinct ATI",
            "ImageCast Precinct BMD",
            "ImageCast Remote",
            "ImageCast X BMD",
            "ImageCast X DRE"
        ],
        "Election Administrators": [
            "EA Pollbook",
            "EA Tablet"
        ],
        "Enhanced Voting": [
            "Enhanced Ballot",
            "MyBallot"
        ],
        "ES&S": [
            "AutoMARK",
            "DS200",
            "DS300",
            "DS450",
            "DS850",
            "DS950",
            "ExpressPoll",
            "ExpressTouch",
            "ExpressVote",
            "ExpressVote Tabulator",
            "ExpressVote XL",
            "InkaVote Plus",
            "InkaVote Plus PBC",
            "iPower Profile",
            "iVotronic",
            "Model 100",
            "Model 115",
            "Model 150",
            "Model 315",
            "Model 550",
            "Model 650",
            "Optech",
            "OpTech 2",
            "Optech IIIP-Eagle",
            "Optech Insight",
            "Optech IV-C",
            "Votomatic",
        ],
        "Everyone Counts": [
            "eLect",
            "eLect Electronic Poll Book"
        ],
        "Five Cedars": [
            "Alternate Format Ballot"
        ],
        "GBS": [
            "Valid Voter"
        ],
        "Hart InterCivic": [
            "Ballot Now",
            "ePollBook",
            "eScan",
            "eScan A\/T",
            "eSlate",
            "EViD",
            "Verity Central",
            "Verity Duo",
            "Verity Scan",
            "Verity Touch",
            "Verity Touch Writer"
        ],
        "HelpSystems": [
            "GoAnywhere MFT"
        ],
        "HI Office of Elections": [
            "Voter Registration System"
        ],
        "IA SoS": [
            "Express Voter"
        ],
        "IES": [
            "Shoup Manual",
        ],
        "IPAC": [
            "Precinct Atlas"
        ],
        "IVS": [
            "Inspire Ballot Marking System",
            "Inspire Vote By Phone"
        ],
        "Jefferson County": [
            "Jefferson County Electronic Pollbook"
        ],
        "KNOWiNK": [
            "Poll Pad",
            "Precinct Central"
        ],
        "Konnech": [
            "ABVote",
            "EVSW"
        ],
        "Larimer County": [
            "Larimer County Electronic Poll Book"
        ],
        "LEDS": [
            "e-Poll Book",
            "Vote Center Pollbook"
        ],
        "Los Angeles County": [
            "MTS",
            "VSAP BMD",
            "VSAP Interactive Sample Ballot",
            "VSAP Tally"
        ],
        "Louisiana SoS": [
            "Geaux Vote"
        ],
        "Maricopa County": [
            "SiteBook"
        ],
        "MD BoE": [
            "Online Ballot Marking Tool"
        ],
        "MI BoE": [
            "MI BoE Electronic Pollbook"
        ],
        "MicroVote": [
            "Infinity",
            "MicroVote\/Chatsworth Scanner",
            "MV-464"
        ],
        "MO SoS": [
            "Military and Overseas Voting Access Portal"
        ],
        "Montgomery County": [
            "Montgomery County Elections eVote"
        ],
        "Montgomery County TX": [
            "Montgomery County Elections eVote"
        ],
        "NASA": [
            "TDRS"
        ],
        "NCSBE": [
            "OVRD",
            "SOSA"
        ],
        "ND SoS": [
            "UOCAVA Portal"
        ],
        "No Accessible Equipment": [
            "No Accessible Equipment"
        ],
        "Not Applicable": [
            "Not Applicable",
            "Verity Scan"
        ],
        "NV SoS": [
            "EASE"
        ],
        "OR SoS": [
            "My Vote"
        ],
        "Orange County FL": [
            "OCVotes ePoll Book",
            "OCVotes Laptop Solution"
        ],
        "Platinum": [
            "Platinum Poll Book"
        ],
        "Populex": [
            "PopulexSlate"
        ],
        "Premier (Diebold)": [
            "AccuVote OS",
            "AccuVote OS Central",
            "AccuVote OSX",
            "AccuVote TS",
            "AccuVote TSX",
            "AutoMARK",
            "ExpressPoll",
            "Premier Central Scan"
        ],
        "Prime III": [
            "One4All"
        ],
        "Robis": [
            "AskED ePollbook"
        ],
        "Runbeck": [
            "EMS-DIMS"
        ],
        "Rutherford County TN": [
            "Rutherford Voter Registration Database",
            "Voter Registration Database"
        ],
        "SC State Election Commission": [
            "SC Electronic Voter Registration List (EVRL)"
        ],
        "Scantron": [
            "ES 2800"
        ],
        "Scytl": [
            "BallotSafe",
            "eBallot Delivery",
            "SecureBallot"
        ],
        "Sequoia": [
            "AVC Advantage",
            "AVC Edge",
            "Datavote",
            "e-pollbook",
            "NCS OpScan",
            "NCS OpScan 5",
            "NCS OpScan 6",
            "Optech 2",
            "Optech 400C",
            "Optech IIIP-Eagle",
            "Optech Insight",
            "Teamwork Model 25"
        ],
        "State of Utah": [
            "VISTA Local"
        ],
        "State of Wisconsin": [
            "Badger Book"
        ],
        "Tenex": [
            "Precinct Central"
        ],
        "Triad": [
            "Accessible Ballot Marking Tool (ABMT)",
        ],
        "Unilect": [
            "Patriot",
            "Patriot Marksense Scanner"
        ],
        "Unisyn": [
            "OpenElect FVS",
            "OpenElect FVT",
            "OpenElect OVCS",
            "OpenElect OVCS mini",
            "OpenElect OVI",
            "OpenElect OVI-VC",
            "OpenElect OVO"
        ],
        "University of Florida": [
            "Prime III*"
        ],
        "Virginia SBoE": [
            "Elect EPB"
        ],
        "Voatz": [
            "Mobile Voting App"
        ],
        "Vote-PAD": [
            "Vote-PAD Ballot Marking System"
        ],
        "Votec": [
            "VoteSafe"
        ],
        "Votem": [
            "CastIron"
        ],
        "VotingWorks": [
            "VxCentralScan",
            "VxMark",
            "VxScan"
        ],
        "VR Systems": [
            "EViD"
        ],
        "VTI": [
            "VoTWARE"
        ],
        "WA SoS": [
            "VoteWA"
        ],
        "Weld County": [
            "Weld County Electronic Pollbook"
        ],
        "WI Election Commission": [
            "Badger Book"
        ],
        "Wilson County TN": [
            "Wilson County EPB"
        ]
    }

}
