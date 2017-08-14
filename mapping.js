export const admins = [
  { "pid" : "0000001", "familyName" : "本地", "firstName" : "開發者" },
  { "pid" : "359135", "familyName" : "區", "firstName" : "育瑋" },
  { "pid" : "2658071", "familyName" : "林", "firstName" : "美鈴" },
  { "pid" : "4265141", "familyName" : "許", "firstName" : "凱雯" },
  { "pid" : "3409199", "familyName" : "周", "firstName" : "危微" },
  { "pid" : "269330", "familyName" : "李", "firstName" : "坤承" },
  { "pid" : "8307224", "familyName" : "陳", "firstName" : "怡茹" },
  { "pid" : "1591478", "familyName" : "曹", "firstName" : "仁輝" },
  { "pid" : "2637855", "familyName" : "洪", "firstName" : "菽鄖" },
  { "pid" : "804764", "familyName" : "詹", "firstName" : "宛榕" },
  { "pid" : "3742963", "familyName" : "吳", "firstName" : "麗雪" },
  { "pid" : "2413165", "familyName" : "蔡", "firstName" : "佩樺" },
  { "pid" : "1460837", "familyName" : "楊", "firstName" : "基寬" },
  { "pid" : "8580934", "familyName" : "Liao", "firstName" : "Robin"},
  { "pid" : "7721761", "familyName" : "Lin", "firstName" : "Connie" },
  { "pid" : "7915433", "familyName" : "cheng", "firstName" : "nikki" },
  { "pid" : "1312239", "familyName" : "黃", "firstName" : "子瑋"},
  { "pid" : "8335966", "familyName" : "黃", "firstName" : "霈蓁"},
  { "pid" : "4255384", "familyName" : "王", "firstName" : "新華" },
  { "pid" : "2885732", "familyName" : "徐", "firstName" : "憲驊" },
  { "pid" : "2854834", "familyName" : "許", "firstName" : "益晨" },
  { "pid" : "2425992", "familyName" : "齊", "firstName" : "怡惠" },
];

export const mapUrlToPermission = {
  "HAPPINESS_ENTERPRISE_CUSTOMER_MANAGMENT": {/*企業客戶管理*/
    url: "/admin/operationsManagement/corporateClient", permissionId: [
      "HAPPINESS_ENTERPRISE_CUSTOMER_MANAGEMENT_BASIC_INFORMATION",
      "HAPPINESS_ENTERPRISE_CUSTOMER_MANAGEMENT_CONTRACT_INFORMATION",
      "HAPPINESS_ENTERPRISE_CUSTOMER_MANAGEMENT_ACCOUNTING_INFORMATION"
    ]
  },
  "HAPPINESS_CARE_INSTITUTION_MANAGMENT": {/*照顧機構管理*/
    url: "/admin/operationsManagement/careInstitution", permissionId: [
      "HAPPINESS_CARE_INSTITUTION_MANAGMENT_BASIC_INFORMATION",
      "HAPPINESS_CARE_INSTITUTION_MANAGMENT_CONTRACT_INFORMATION",
      "HAPPINESS_CARE_INSTITUTION_MANAGMENT_ACCOUNTING_INFORMATION",
      "HAPPINESS_CARE_INSTITUTION_MANAGMENT_PRODUCT_LAUNCH_INFORMATION",
      "HAPPINESS_CARE_INSTITUTION_MANAGMENT_SERVICE_RECORD"
    ]
  },
  "HAPPINESS_CARE_MANAGER_MANAGMENT": {/*照顧經理管理*/
    url: "/admin/operationsManagement/careManager", permissionId: [
      "HAPPINESS_CARE_MANAGER_MANAGMENT_BASIC_INFORMATION",
      "HAPPINESS_CARE_MANAGER_MANAGMENT_CONTRACT_INFORMATION",
      "HAPPINESS_CARE_MANAGER_MANAGMENT_ACCOUNTING_INFORMATION",
      "HAPPINESS_CARE_MANAGER_MANAGMENT_PRODUCT_LAUNCH_INFORMATION",
      "HAPPINESS_CARE_MANAGER_MANAGMENT_SERVICE_RECORD"
    ]
  },
  "HAPPINESS_CARE_GIVER_MANAGMENT": {/*照顧管家管理*/
    url: "/admin/operationsManagement/careHousekeeper", permissionId: [
      "HAPPINESS_CARE_GIVER_MANAGMENT_BASIC_INFORMATION",
      "HAPPINESS_CARE_GIVER_MANAGMENT_CONTRACT_INFORMATION",
      "HAPPINESS_CARE_GIVER_MANAGMENT_ACCOUNTING_INFORMATION",
      "HAPPINESS_CARE_GIVER_MANAGMENT_PRODUCT_LAUNCH_INFORMATION",
      "HAPPINESS_CARE_GIVER_MANAGMENT_SERVICE_RECORD"
    ]
  },
  "HAPPINESS_CARE_INSTITUTION_CONTACT": {/*照顧管家機構管家管理*/
    url: [
      "/admin/careGiverManagement",
      "/admin/careGiverManagement/careGiverList"
    ],
    permissionId: [
      "HAPPINESS_CARE_INSTITUTION_MASTER_CONTACT"
    ]
  },
  "HAPPINESS_CONTRACT_MANAGMENT": {/*合約管理*/
    url: "/admin/operationsManagement/contractManagement", permissionId: [
      "HAPPINESS_CONTRACT_MANAGMENT"
    ]
  },
  "HAPPINESS_ACCOUNTING_MANAGMENT": {/*帳務管理*/
    url: "/admin/operationsManagement/accountingManagement", permissionId: [
      "HAPPINESS_ACCOUNTING_MANAGMENT"
    ]
  },
  "HAPPINESS_STATISTICS_OF_ENTERPRISE_CUSTOMER": {/*企業客戶使用服務統計*/
    url: "", permissionId: [
      "HAPPINESS_STATISTICS_OF_ENTERPRISE_CUSTOMER_USE_SERVICE"
    ]
  },
  "HAPPINESS_STATISTIC_OF_CARE_MAMAGER": {/*照顧經理服務統計*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_STATISTIC_OF_CARE_MAMAGER"
    ]
  },
  "HAPPINESS_STATISTICS_OF_CARE_INSTITUTION": {/*照顧機構服務統計*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_STATISTIC_OF_CARE_INSTITUTION"
    ]
  },
  "HAPPINESS_STATISTICS_OF_CARE_GIVER": {/*照顧管家服務統計*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_STATISTIC_OF_CARE_GIVER"
    ]
  },
  "HAPPINESS_STATISTICS_OF_INSURANT": {/*保障對象變更轉換統計*/
    url: "", permissionId: [
      "HAPPINESS_STATISTICS_OF_CHANGING_MAIN_INSURANT"
    ]
  },
  "HAPPINESS_STATISTICS_OF_EACH_AREA": {/*各地區服務統計*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_STATISTIC_OF_EACH_AREA"
    ]
  },
  "HAPPINESS_STATISTICS_OF_CONTRACT": {/*合約續約統計*/
    url: "", permissionId: [
      "HAPPINESS_STATISTICS_OF_CONTRACT_RENEWAL"
    ]
  },
  "HAPPINESS_HEALTH_SUGGESTION": {/*健康建議書管理*/
    url: "", permissionId: [
      "HAPPINESS_HEALTH_SUGGESTION_MANAGMENT"
    ]
  },
  "HAPPINESS_CALL_RECORD": {/*來電紀錄管理*/
    url: "", permissionId: [
      "HAPPINESS_CALL_RECORD_MANAGMENT"
    ]
  },
  "HAPPINESS_VISIT_RECORD": {/*到訪記錄管理*/
    url: "", permissionId: [
      "HAPPINESS_VISIT_RECORD_MANAGMENT"
    ]
  },
  "HAPPINESS_SERVICE_PLAN": {/*服務計畫管理*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_PLAN_MANAGMENT"
    ]
  },
  "HAPPINESS_CARE_CALL_RECORD": {/*去電關懷管理*/
    url: "", permissionId: [
      "HAPPINESS_CARE_CALL_RECORD_MANAGMENT"
    ]
  },
  "HAPPINESS_CARE_SUGGESTION": {/*照顧建議書管理*/
    url: "", permissionId: [
      "HAPPINESS_CARE_SUGGESTION_MANAGMENT"
    ]
  },
  "HAPPINESS_BANNER": {/*BANNER管理*/
    url: "", permissionId: [
      "HAPPINESS_BANNER_MANAGMENT"
    ]
  },
  "HAPPINESS_SERVICE_INSTANCE": {/*服務實例管理*/
    url: "", permissionId: [
      "HAPPINESS_SERVICE_INSTANCE_MANAGMENT"
    ]
  },
  "HAPPINESS_HOSPITALIZATION_INFORMATION": {/*住院資訊管理*/
    url: "", permissionId: [
      "HAPPINESS_HOSPITALIZATION_INFORMATION_MANAGMENT"
    ]
  },
  "1": {url: "/admin/employeeApplyService", permissionId: ""},
  "2": {url: "/admin/userConsole", permissionId: ""},
  "3": {url: "/admin/refIns", permissionId: ""},
  "4": {url: "/admin/roleList", permissionId: ""},
  "5": {url: "/admin/memberList", permissionId: ""},
  "6": {url: "/admin/youtubePage", permissionId: ""}
};

export const sexNameMap = {
  '0':'女',
  '1':'男'
};

export const zipsMap = {
  "6001001001": {
    "name": "台北市中正區"
  },
  "6001001002": {
    "name": "台北市大同區"
  },
  "6001001003": {
    "name": "台北市中山區"
  },
  "6001001004": {
    "name": "台北市松山區"
  },
  "6001001005": {
    "name": "台北市大安區"
  },
  "6001001006": {
    "name": "台北市萬華區"
  },
  "6001001007": {
    "name": "台北市信義區"
  },
  "6001001008": {
    "name": "台北市士林區"
  },
  "6001001009": {
    "name": "台北市北投區"
  },
  "6001001010": {
    "name": "台北市內湖區"
  },
  "6001001011": {
    "name": "台北市南港區"
  },
  "6001001012": {
    "name": "台北市文山區"
  },
  "6001002001": {
    "name": "新北市萬里區"
  },
  "6001002002": {
    "name": "新北市金山區"
  },
  "6001002003": {
    "name": "新北市板橋區"
  },
  "6001002004": {
    "name": "新北市汐止區"
  },
  "6001002005": {
    "name": "新北市深坑區"
  },
  "6001002006": {
    "name": "新北市石碇區"
  },
  "6001002007": {
    "name": "新北市瑞芳區"
  },
  "6001002008": {
    "name": "新北市平溪區"
  },
  "6001002009": {
    "name": "新北市雙溪區"
  },
  "6001002010": {
    "name": "新北市貢寮區"
  },
  "6001002011": {
    "name": "新北市新店區"
  },
  "6001002012": {
    "name": "新北市坪林區"
  },
  "6001002013": {
    "name": "新北市烏來區"
  },
  "6001002014": {
    "name": "新北市永和區"
  },
  "6001002015": {
    "name": "新北市中和區"
  },
  "6001002016": {
    "name": "新北市土城區"
  },
  "6001002017": {
    "name": "新北市三峽區"
  },
  "6001002018": {
    "name": "新北市樹林區"
  },
  "6001002019": {
    "name": "新北市鶯歌區"
  },
  "6001002020": {
    "name": "新北市三重區"
  },
  "6001002021": {
    "name": "新北市新莊區"
  },
  "6001002022": {
    "name": "新北市泰山區"
  },
  "6001002023": {
    "name": "新北市林口區"
  },
  "6001002024": {
    "name": "新北市蘆洲區"
  },
  "6001002025": {
    "name": "新北市五股區"
  },
  "6001002026": {
    "name": "新北市八里區"
  },
  "6001002027": {
    "name": "新北市淡水區"
  },
  "6001002028": {
    "name": "新北市三芝區"
  },
  "6001002029": {
    "name": "新北市石門區"
  },
  "6001003001": {
    "name": "宜蘭縣宜蘭市"
  },
  "6001003002": {
    "name": "宜蘭縣頭城鎮"
  },
  "6001003003": {
    "name": "宜蘭縣礁溪鄉"
  },
  "6001003004": {
    "name": "宜蘭縣壯圍鄉"
  },
  "6001003005": {
    "name": "宜蘭縣員山鄉"
  },
  "6001003006": {
    "name": "宜蘭縣羅東鎮"
  },
  "6001003007": {
    "name": "宜蘭縣三星鄉"
  },
  "6001003008": {
    "name": "宜蘭縣大同鄉"
  },
  "6001003009": {
    "name": "宜蘭縣五結鄉"
  },
  "6001003010": {
    "name": "宜蘭縣冬山鄉"
  },
  "6001003011": {
    "name": "宜蘭縣蘇澳鎮"
  },
  "6001003012": {
    "name": "宜蘭縣南澳鄉"
  },
  "6001004001": {
    "name": "基隆市仁愛區"
  },
  "6001004002": {
    "name": "基隆市信義區"
  },
  "6001004003": {
    "name": "基隆市中正區"
  },
  "6001004004": {
    "name": "基隆市中山區"
  },
  "6001004005": {
    "name": "基隆市安樂區"
  },
  "6001004006": {
    "name": "基隆市暖暖區"
  },
  "6001004007": {
    "name": "基隆市七堵區"
  },
  "6001005001": {
    "name": "桃園市中壢區"
  },
  "6001005002": {
    "name": "桃園市平鎮區"
  },
  "6001005003": {
    "name": "桃園市龍潭區"
  },
  "6001005004": {
    "name": "桃園市楊梅區"
  },
  "6001005005": {
    "name": "桃園市新屋區"
  },
  "6001005006": {
    "name": "桃園市觀音區"
  },
  "6001005007": {
    "name": "桃園市桃園區"
  },
  "6001005008": {
    "name": "桃園市龜山區"
  },
  "6001005009": {
    "name": "桃園市八德區"
  },
  "6001005010": {
    "name": "桃園市大溪區"
  },
  "6001005011": {
    "name": "桃園市復興區"
  },
  "6001005012": {
    "name": "桃園市大園區"
  },
  "6001005013": {
    "name": "桃園市蘆竹區"
  },
  "6001006001": {
    "name": "新竹市"
  },
  "6001006002": {
    "name": "新竹縣竹北市"
  },
  "6001006003": {
    "name": "新竹縣湖口鄉"
  },
  "6001006004": {
    "name": "新竹縣新豐鄉"
  },
  "6001006005": {
    "name": "新竹縣新埔鎮"
  },
  "6001006006": {
    "name": "新竹縣關西鎮"
  },
  "6001006007": {
    "name": "新竹縣芎林鄉"
  },
  "6001006008": {
    "name": "新竹縣寶山鄉"
  },
  "6001006009": {
    "name": "新竹縣竹東鎮"
  },
  "6001006010": {
    "name": "新竹縣五峰鄉"
  },
  "6001006011": {
    "name": "新竹縣橫山鄉"
  },
  "6001006012": {
    "name": "新竹縣尖石鄉"
  },
  "6001006013": {
    "name": "新竹縣北埔鄉"
  },
  "6001006014": {
    "name": "新竹縣峨眉鄉"
  },
  "6001007001": {
    "name": "苗栗縣竹南鎮"
  },
  "6001007002": {
    "name": "苗栗縣頭份鎮"
  },
  "6001007003": {
    "name": "苗栗縣三灣鄉"
  },
  "6001007004": {
    "name": "苗栗縣南庄鄉"
  },
  "6001007005": {
    "name": "苗栗縣獅潭鄉"
  },
  "6001007006": {
    "name": "苗栗縣後龍鎮"
  },
  "6001007007": {
    "name": "苗栗縣通霄鎮"
  },
  "6001007008": {
    "name": "苗栗縣苑裡鎮"
  },
  "6001007009": {
    "name": "苗栗縣苗栗市"
  },
  "6001007010": {
    "name": "苗栗縣造橋鄉"
  },
  "6001007011": {
    "name": "苗栗縣頭屋鄉"
  },
  "6001007012": {
    "name": "苗栗縣公館鄉"
  },
  "6001007013": {
    "name": "苗栗縣大湖鄉"
  },
  "6001007014": {
    "name": "苗栗縣泰安鄉"
  },
  "6001007015": {
    "name": "苗栗縣銅鑼鄉"
  },
  "6001007016": {
    "name": "苗栗縣三義鄉"
  },
  "6001007017": {
    "name": "苗栗縣西湖鄉"
  },
  "6001007018": {
    "name": "苗栗縣卓蘭鎮"
  },
  "6001008001": {
    "name": "台中市中　區"
  },
  "6001008002": {
    "name": "台中市東　區"
  },
  "6001008003": {
    "name": "台中市南　區"
  },
  "6001008004": {
    "name": "台中市西　區"
  },
  "6001008005": {
    "name": "台中市北　區"
  },
  "6001008006": {
    "name": "台中市北屯區"
  },
  "6001008007": {
    "name": "台中市西屯區"
  },
  "6001008008": {
    "name": "台中市南屯區"
  },
  "6001008009": {
    "name": "台中市太平區"
  },
  "6001008010": {
    "name": "台中市大里區"
  },
  "6001008011": {
    "name": "台中市霧峰區"
  },
  "6001008012": {
    "name": "台中市烏日區"
  },
  "6001008013": {
    "name": "台中市豐原區"
  },
  "6001008014": {
    "name": "台中市后里區"
  },
  "6001008015": {
    "name": "台中市石岡區"
  },
  "6001008016": {
    "name": "台中市東勢區"
  },
  "6001008017": {
    "name": "台中市和平區"
  },
  "6001008018": {
    "name": "台中市新社區"
  },
  "6001008019": {
    "name": "台中市潭子區"
  },
  "6001008020": {
    "name": "台中市大雅區"
  },
  "6001008021": {
    "name": "台中市神岡區"
  },
  "6001008022": {
    "name": "台中市大肚區"
  },
  "6001008023": {
    "name": "台中市沙鹿區"
  },
  "6001008024": {
    "name": "台中市龍井區"
  },
  "6001008025": {
    "name": "台中市梧棲區"
  },
  "6001008026": {
    "name": "台中市清水區"
  },
  "6001008027": {
    "name": "台中市大甲區"
  },
  "6001008028": {
    "name": "台中市外埔區"
  },
  "6001008029": {
    "name": "台中市大安區"
  },
  "6001010001": {
    "name": "彰化縣彰化市"
  },
  "6001010002": {
    "name": "彰化縣芬園鄉"
  },
  "6001010003": {
    "name": "彰化縣花壇鄉"
  },
  "6001010004": {
    "name": "彰化縣秀水鄉"
  },
  "6001010005": {
    "name": "彰化縣鹿港鎮"
  },
  "6001010006": {
    "name": "彰化縣福興鄉"
  },
  "6001010007": {
    "name": "彰化縣線西鄉"
  },
  "6001010008": {
    "name": "彰化縣和美鎮"
  },
  "6001010009": {
    "name": "彰化縣伸港鄉"
  },
  "6001010010": {
    "name": "彰化縣員林鎮"
  },
  "6001010011": {
    "name": "彰化縣社頭鄉"
  },
  "6001010012": {
    "name": "彰化縣永靖鄉"
  },
  "6001010013": {
    "name": "彰化縣埔心鄉"
  },
  "6001010014": {
    "name": "彰化縣溪湖鎮"
  },
  "6001010015": {
    "name": "彰化縣大村鄉"
  },
  "6001010016": {
    "name": "彰化縣埔鹽鄉"
  },
  "6001010017": {
    "name": "彰化縣田中鎮"
  },
  "6001010018": {
    "name": "彰化縣北斗鎮"
  },
  "6001010019": {
    "name": "彰化縣田尾鄉"
  },
  "6001010020": {
    "name": "彰化縣埤頭鄉"
  },
  "6001010021": {
    "name": "彰化縣溪州鄉"
  },
  "6001010022": {
    "name": "彰化縣竹塘鄉"
  },
  "6001010023": {
    "name": "彰化縣二林鎮"
  },
  "6001010024": {
    "name": "彰化縣大城鄉"
  },
  "6001010025": {
    "name": "彰化縣芳苑鄉"
  },
  "6001010026": {
    "name": "彰化縣二水鄉"
  },
  "6001011001": {
    "name": "南投縣南投市"
  },
  "6001011002": {
    "name": "南投縣中寮鄉"
  },
  "6001011003": {
    "name": "南投縣草屯鎮"
  },
  "6001011004": {
    "name": "南投縣國姓鄉"
  },
  "6001011005": {
    "name": "南投縣埔里鎮"
  },
  "6001011006": {
    "name": "南投縣仁愛鄉"
  },
  "6001011007": {
    "name": "南投縣名間鄉"
  },
  "6001011008": {
    "name": "南投縣集集鎮"
  },
  "6001011009": {
    "name": "南投縣水里鄉"
  },
  "6001011010": {
    "name": "南投縣魚池鄉"
  },
  "6001011011": {
    "name": "南投縣信義鄉"
  },
  "6001011012": {
    "name": "南投縣竹山鎮"
  },
  "6001011013": {
    "name": "南投縣鹿谷鄉"
  },
  "6001012001": {
    "name": "雲林縣斗南鎮"
  },
  "6001012002": {
    "name": "雲林縣大埤鄉"
  },
  "6001012003": {
    "name": "雲林縣虎尾鎮"
  },
  "6001012004": {
    "name": "雲林縣土庫鎮"
  },
  "6001012005": {
    "name": "雲林縣褒忠鄉"
  },
  "6001012006": {
    "name": "雲林縣東勢鄉"
  },
  "6001012007": {
    "name": "雲林縣台西鄉"
  },
  "6001012008": {
    "name": "雲林縣崙背鄉"
  },
  "6001012009": {
    "name": "雲林縣麥寮鄉"
  },
  "6001012010": {
    "name": "雲林縣斗六市"
  },
  "6001012011": {
    "name": "雲林縣林內鄉"
  },
  "6001012012": {
    "name": "雲林縣古坑鄉"
  },
  "6001012013": {
    "name": "雲林縣莿桐鄉"
  },
  "6001012014": {
    "name": "雲林縣西螺鎮"
  },
  "6001012015": {
    "name": "雲林縣二崙鄉"
  },
  "6001012016": {
    "name": "雲林縣北港鎮"
  },
  "6001012017": {
    "name": "雲林縣水林鄉"
  },
  "6001012018": {
    "name": "雲林縣口湖鄉"
  },
  "6001012019": {
    "name": "雲林縣四湖鄉"
  },
  "6001012020": {
    "name": "雲林縣元長鄉"
  },
  "6001013001": {
    "name": "嘉義市"
  },
  "6001013002": {
    "name": "嘉義縣番路鄉"
  },
  "6001013003": {
    "name": "嘉義縣梅山鄉"
  },
  "6001013004": {
    "name": "嘉義縣竹崎鄉"
  },
  "6001013005": {
    "name": "嘉義縣阿里山"
  },
  "6001013006": {
    "name": "嘉義縣中埔鄉"
  },
  "6001013007": {
    "name": "嘉義縣大埔鄉"
  },
  "6001013008": {
    "name": "嘉義縣水上鄉"
  },
  "6001013009": {
    "name": "嘉義縣鹿草鄉"
  },
  "6001013010": {
    "name": "嘉義縣太保市"
  },
  "6001013011": {
    "name": "嘉義縣朴子市"
  },
  "6001013012": {
    "name": "嘉義縣東石鄉"
  },
  "6001013013": {
    "name": "嘉義縣六腳鄉"
  },
  "6001013014": {
    "name": "嘉義縣新港鄉"
  },
  "6001013015": {
    "name": "嘉義縣民雄鄉"
  },
  "6001013016": {
    "name": "嘉義縣大林鎮"
  },
  "6001013017": {
    "name": "嘉義縣溪口鄉"
  },
  "6001013018": {
    "name": "嘉義縣義竹鄉"
  },
  "6001013019": {
    "name": "嘉義縣布袋鎮"
  },
  "6001014001": {
    "name": "台南市中西區"
  },
  "6001014002": {
    "name": "台南市東　區"
  },
  "6001014003": {
    "name": "台南市南　區"
  },
  "6001014004": {
    "name": "台南市北　區"
  },
  "6001014005": {
    "name": "台南市安平區"
  },
  "6001014006": {
    "name": "台南市安南區"
  },
  "6001014007": {
    "name": "台南市永康區"
  },
  "6001014008": {
    "name": "台南市歸仁區"
  },
  "6001014009": {
    "name": "台南市新化區"
  },
  "6001014010": {
    "name": "台南市左鎮區"
  },
  "6001014011": {
    "name": "台南市玉井區"
  },
  "6001014012": {
    "name": "台南市楠西區"
  },
  "6001014013": {
    "name": "台南市南化區"
  },
  "6001014014": {
    "name": "台南市仁德區"
  },
  "6001014015": {
    "name": "台南市關廟區"
  },
  "6001014016": {
    "name": "台南市龍崎區"
  },
  "6001014017": {
    "name": "台南市官田區"
  },
  "6001014018": {
    "name": "台南市麻豆區"
  },
  "6001014019": {
    "name": "台南市佳里區"
  },
  "6001014020": {
    "name": "台南市西港區"
  },
  "6001014021": {
    "name": "台南市七股區"
  },
  "6001014022": {
    "name": "台南市將軍區"
  },
  "6001014023": {
    "name": "台南市學甲區"
  },
  "6001014024": {
    "name": "台南市北門區"
  },
  "6001014025": {
    "name": "台南市新營區"
  },
  "6001014026": {
    "name": "台南市後壁區"
  },
  "6001014027": {
    "name": "台南市白河區"
  },
  "6001014028": {
    "name": "台南市東山區"
  },
  "6001014029": {
    "name": "台南市六甲區"
  },
  "6001014030": {
    "name": "台南市下營區"
  },
  "6001014031": {
    "name": "台南市柳營區"
  },
  "6001014032": {
    "name": "台南市鹽水區"
  },
  "6001014033": {
    "name": "台南市善化區"
  },
  "6001014034": {
    "name": "台南市大內區"
  },
  "6001014035": {
    "name": "台南市山上區"
  },
  "6001014036": {
    "name": "台南市新市區"
  },
  "6001014037": {
    "name": "台南市安定區"
  },
  "6001016001": {
    "name": "高雄市新興區"
  },
  "6001016002": {
    "name": "高雄市前金區"
  },
  "6001016003": {
    "name": "高雄市苓雅區"
  },
  "6001016004": {
    "name": "高雄市鹽埕區"
  },
  "6001016005": {
    "name": "高雄市鼓山區"
  },
  "6001016006": {
    "name": "高雄市旗津區"
  },
  "6001016007": {
    "name": "高雄市前鎮區"
  },
  "6001016008": {
    "name": "高雄市三民區"
  },
  "6001016009": {
    "name": "高雄市楠梓區"
  },
  "6001016010": {
    "name": "高雄市小港區"
  },
  "6001016011": {
    "name": "高雄市左營區"
  },
  "6001016012": {
    "name": "高雄市仁武區"
  },
  "6001016013": {
    "name": "高雄市大社區"
  },
  "6001016014": {
    "name": "高雄市岡山區"
  },
  "6001016015": {
    "name": "高雄市路竹區"
  },
  "6001016016": {
    "name": "高雄市阿蓮區"
  },
  "6001016017": {
    "name": "高雄市田寮區"
  },
  "6001016018": {
    "name": "高雄市燕巢區"
  },
  "6001016019": {
    "name": "高雄市橋頭區"
  },
  "6001016020": {
    "name": "高雄市梓官區"
  },
  "6001016021": {
    "name": "高雄市彌陀區"
  },
  "6001016022": {
    "name": "高雄市永安區"
  },
  "6001016023": {
    "name": "高雄市湖內區"
  },
  "6001016024": {
    "name": "高雄市鳳山區"
  },
  "6001016025": {
    "name": "高雄市大寮區"
  },
  "6001016026": {
    "name": "高雄市林園區"
  },
  "6001016027": {
    "name": "高雄市鳥松區"
  },
  "6001016028": {
    "name": "高雄市大樹區"
  },
  "6001016029": {
    "name": "高雄市旗山區"
  },
  "6001016030": {
    "name": "高雄市美濃區"
  },
  "6001016031": {
    "name": "高雄市六龜區"
  },
  "6001016032": {
    "name": "高雄市內門區"
  },
  "6001016033": {
    "name": "高雄市杉林區"
  },
  "6001016034": {
    "name": "高雄市甲仙區"
  },
  "6001016035": {
    "name": "高雄市桃源區"
  },
  "6001016036": {
    "name": "高雄市那瑪夏"
  },
  "6001016037": {
    "name": "高雄市茂林區"
  },
  "6001016038": {
    "name": "高雄市茄萣區"
  },
  "6001018001": {
    "name": "屏東縣屏東市"
  },
  "6001018002": {
    "name": "屏東縣三地門"
  },
  "6001018003": {
    "name": "屏東縣霧台鄉"
  },
  "6001018004": {
    "name": "屏東縣瑪家鄉"
  },
  "6001018005": {
    "name": "屏東縣九如鄉"
  },
  "6001018006": {
    "name": "屏東縣里港鄉"
  },
  "6001018007": {
    "name": "屏東縣高樹鄉"
  },
  "6001018008": {
    "name": "屏東縣鹽埔鄉"
  },
  "6001018009": {
    "name": "屏東縣長治鄉"
  },
  "6001018010": {
    "name": "屏東縣麟洛鄉"
  },
  "6001018011": {
    "name": "屏東縣竹田鄉"
  },
  "6001018012": {
    "name": "屏東縣內埔鄉"
  },
  "6001018013": {
    "name": "屏東縣萬丹鄉"
  },
  "6001018014": {
    "name": "屏東縣潮州鎮"
  },
  "6001018015": {
    "name": "屏東縣泰武鄉"
  },
  "6001018016": {
    "name": "屏東縣來義鄉"
  },
  "6001018017": {
    "name": "屏東縣萬巒鄉"
  },
  "6001018018": {
    "name": "屏東縣崁頂鄉"
  },
  "6001018019": {
    "name": "屏東縣新埤鄉"
  },
  "6001018020": {
    "name": "屏東縣南州鄉"
  },
  "6001018021": {
    "name": "屏東縣林邊鄉"
  },
  "6001018022": {
    "name": "屏東縣東港鎮"
  },
  "6001018023": {
    "name": "屏東縣琉球鄉"
  },
  "6001018024": {
    "name": "屏東縣佳冬鄉"
  },
  "6001018025": {
    "name": "屏東縣新園鄉"
  },
  "6001018026": {
    "name": "屏東縣枋寮鄉"
  },
  "6001018027": {
    "name": "屏東縣枋山鄉"
  },
  "6001018028": {
    "name": "屏東縣春日鄉"
  },
  "6001018029": {
    "name": "屏東縣獅子鄉"
  },
  "6001018030": {
    "name": "屏東縣車城鄉"
  },
  "6001018031": {
    "name": "屏東縣牡丹鄉"
  },
  "6001018032": {
    "name": "屏東縣恆春鎮"
  },
  "6001018033": {
    "name": "屏東縣滿州鄉"
  },
  "6001019001": {
    "name": "台東縣台東市"
  },
  "6001019002": {
    "name": "台東縣綠島鄉"
  },
  "6001019003": {
    "name": "台東縣蘭嶼鄉"
  },
  "6001019004": {
    "name": "台東縣延平鄉"
  },
  "6001019005": {
    "name": "台東縣卑南鄉"
  },
  "6001019006": {
    "name": "台東縣鹿野鄉"
  },
  "6001019007": {
    "name": "台東縣關山鎮"
  },
  "6001019008": {
    "name": "台東縣海端鄉"
  },
  "6001019009": {
    "name": "台東縣池上鄉"
  },
  "6001019010": {
    "name": "台東縣東河鄉"
  },
  "6001019011": {
    "name": "台東縣成功鎮"
  },
  "6001019012": {
    "name": "台東縣長濱鄉"
  },
  "6001019013": {
    "name": "台東縣太麻里"
  },
  "6001019014": {
    "name": "台東縣金峰鄉"
  },
  "6001019015": {
    "name": "台東縣大武鄉"
  },
  "6001019016": {
    "name": "台東縣達仁鄉"
  },
  "6001020001": {
    "name": "花蓮縣花蓮市"
  },
  "6001020002": {
    "name": "花蓮縣新城鄉"
  },
  "6001020003": {
    "name": "花蓮縣秀林鄉"
  },
  "6001020004": {
    "name": "花蓮縣吉安鄉"
  },
  "6001020005": {
    "name": "花蓮縣壽豐鄉"
  },
  "6001020006": {
    "name": "花蓮縣鳳林鎮"
  },
  "6001020007": {
    "name": "花蓮縣光復鄉"
  },
  "6001020008": {
    "name": "花蓮縣豐濱鄉"
  },
  "6001020009": {
    "name": "花蓮縣瑞穗鄉"
  },
  "6001020010": {
    "name": "花蓮縣萬榮鄉"
  },
  "6001020011": {
    "name": "花蓮縣玉里鎮"
  },
  "6001020012": {
    "name": "花蓮縣卓溪鄉"
  },
  "6001020013": {
    "name": "花蓮縣富里鄉"
  },
  "6001021001": {
    "name": "澎湖縣馬公市"
  },
  "6001021002": {
    "name": "澎湖縣西嶼鄉"
  },
  "6001021003": {
    "name": "澎湖縣望安鄉"
  },
  "6001021004": {
    "name": "澎湖縣七美鄉"
  },
  "6001021005": {
    "name": "澎湖縣白沙鄉"
  },
  "6001021006": {
    "name": "澎湖縣湖西鄉"
  },
  "6001022001": {
    "name": "金門縣金沙鎮"
  },
  "6001022002": {
    "name": "金門縣金湖鎮"
  },
  "6001022003": {
    "name": "金門縣金寧鄉"
  },
  "6001022004": {
    "name": "金門縣金城鎮"
  },
  "6001022005": {
    "name": "金門縣烈嶼鄉"
  },
  "6001022006": {
    "name": "金門縣烏坵鄉"
  },
  "6001023001": {
    "name": "連江縣南竿鄉"
  },
  "6001023002": {
    "name": "連江縣北竿鄉"
  },
  "6001023003": {
    "name": "連江縣莒光鄉"
  },
  "6001023004": {
    "name": "連江縣東引鄉"
  }
}