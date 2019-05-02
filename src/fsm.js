import StateMachine from 'javascript-state-machine';

const StateMachineHistory = require('javascript-state-machine/lib/history');

function createFsm() {
  return new StateMachine({
    init: 'start',
    transitions: [
      { name: 'gotStart', from: '*', to: 'mainMenu' }, // 主選單

      { name: 'selfIntro', from: '*', to: 'selfIntro' }, // 自我介紹
      { name: 'school', from: 'selfIntro', to: 'selfIntro_School' }, // 自我介紹_學校科系
      { name: 'leaveSchool', from: 'selfIntro_School', to: 'mainMenu' }, // 離開自我介紹_學校科系
      { name: 'interest', from: 'selfIntro', to: 'selfIntro_Interest' }, // 自我介紹_喜歡的事物
      { name: 'leaveInterest', from: 'selfIntro_Interest', to: 'mainMenu' }, // 離開自我介紹_喜歡的事物
      { name: 'laeveSelfIntro', from: 'selfIntro', to: 'mainMenu' }, // 離開自我介紹

      { name: 'workExperience', from: '*', to: 'workExperience' }, // 工作經驗
      { name: 'leaveWorkExperience', from: 'workExperience', to: 'mainMenu' }, // 工作經驗

      { name: 'advantech', from: 'workExperience', to: 'workExperience_Advantech' }, // 工作經驗_advantech
      { name: 'leaveAdvantech', from: 'workExperience_Advantech', to: 'mainMenu' }, // 離開工作經驗_advantech（回選單）
      { name: 'advantechBackToWorkExperience', from: 'workExperience_Advantech', to: 'workExperience' }, // advantech回工作經驗

      { name: 'trunkStudio', from: 'workExperience', to: 'workExperience_TrunkStudio' }, // 工作經驗_trunk
      { name: 'leaveTrunkStudio', from: 'workExperience_TrunkStudio', to: 'mainMenu' }, // 離開工作經驗_trunk（回選單）
      { name: 'trunkStudioBackToWorkExperience', from: 'workExperience_TrunkStudio', to: 'workExperience' }, // trunk回工作經驗

      { name: 'taiwanCloud', from: 'workExperience', to: 'workExperience_TaiwanCloud' }, // 工作經驗_taiwanCloud
      { name: 'leaveTaiwanCloud', from: 'workExperience_TaiwanCloud', to: 'mainMenu' }, // 離開工作經驗_taiwanCloud（回選單）
      { name: 'taiwanCloudBackToWorkExperience', from: 'workExperience_TaiwanCloud', to: 'workExperience' }, // taiwanCloud回工作經驗

      { name: 'projects', from: '*', to: 'projects' }, // 專案作品
      { name: 'leaveProjects', from: 'projects', to: 'mainMenu' }, // 離開專案作品

      { name: 'ghowa', from: 'projects', to: 'projects_Ghowa' }, // 專案作品_Ghowa
      { name: 'backToGhowa', from: '*', to: 'projects_Ghowa' }, // 專案作品_Ghowa
      { name: 'ghowaRole', from: 'projects_Ghowa', to: 'projects_Ghowa_Role' }, // 專案作品_Ghowa_擔任角色
      { name: 'ghowaLang', from: 'projects_Ghowa', to: 'projects_Ghowa_Lang' }, // 專案作品_Ghowa_程式語言
      { name: 'ghowaScreen', from: 'projects_Ghowa', to: 'projects_Ghowa_Screen' }, // 專案作品_Ghowa_實際畫面

      { name: 'meracle', from: 'projects', to: 'projects_Meracle' }, // 專案作品_Meracle
      { name: 'backToMeracle', from: '*', to: 'projects_Meracle' }, // 專案作品_Meracle
      { name: 'meracleRole', from: 'projects_Meracle', to: 'projects_Meracle_Role' }, // 專案作品_Meracle_擔任角色
      { name: 'meracleLang', from: 'projects_Meracle', to: 'projects_Meracle_Lang' }, // 專案作品_Meracle_程式語言
      { name: 'meracleScreen', from: 'projects_Meracle', to: 'projects_Meracle_Screen' }, // 專案作品_Meracle_實際畫面

      { name: 'here', from: 'projects', to: 'projects_HERE' }, // 專案作品_HERE
      { name: 'backToHERE', from: '*', to: 'projects_HERE' }, // 專案作品_HERE
      { name: 'hereRole', from: 'projects_HERE', to: 'projects_HERE_Role' }, // 專案作品_here_擔任角色
      { name: 'hereLang', from: 'projects_HERE', to: 'projects_HERE_Lang' }, // 專案作品_here_程式語言
      { name: 'hereScreen', from: 'projects_HERE', to: 'projects_HERE_Screen' }, // 專案作品_here_實際畫面

      { name: 'bonERP', from: 'projects', to: 'projects_BonERP' }, // 專案作品_BonERP
      { name: 'backToBonERP', from: '*', to: 'projects_BonERP' }, // 專案作品_BonERP
      { name: 'bonERPRole', from: 'projects_BonERP', to: 'projects_BonERP_Role' }, // 專案作品_BonERP_擔任角色
      { name: 'bonERPLang', from: 'projects_BonERP', to: 'projects_BonERP_Lang' }, // 專案作品_BonERP_程式語言
      { name: 'bonERPScreen', from: 'projects_BonERP', to: 'projects_BonERP_Screen' }, // 專案作品_BonERP_實際畫面

      { name: 'skills', from: '*', to: 'skills' }, // 專長技能
    ],
    plugins: [
      new StateMachineHistory(),
    ],
  });
}

export const eventFromStateAndMessageText = (state, text) => {
  console.log(state, text);
  switch (state) {
  case 'start':
    return 'gotStart';
  case 'mainMenu':
  {
    switch (text) {
    case '自我介紹':
      return 'selfIntro';
    case '實習工作經歷':
      return 'workExperience';
    case '專案作品':
      return 'projects';
    case '專長＆技能樹':
      return 'skills';
    case undefined:
      return 'gotStart';
    default:
      return 'gotStart';
    }
  }
  case 'selfIntro':
  {
    switch (text) {
    case '學校科系':
      return 'school';
    case '喜歡的事物':
      return 'interest';
    default:
      return 'laeveSelfIntro';
    }
  }
  case 'selfIntro_Interest':
  {
    switch (text) {
    case undefined:
      return 'gotStart';
    default:
      return 'leaveInterest';
    }
  }
  case 'selfIntro_School':
  {
    switch (text) {
    case '回選單':
      return 'leaveSchool';
    default:
      return 'leaveSchool';
    }
  }
  case 'workExperience':
  {
    switch (text) {
    case 'Xinhe 在研華科技...':
      return 'advantech';
    case 'Xinhe 在創科資訊...':
      return 'trunkStudio';
    case 'Xinhe 在臺灣寬雲...':
      return 'taiwanCloud';
    default:
      return 'leaveWorkExperience';
    }
  }
  case 'workExperience_Advantech':
  {
    switch (text) {
    case '回選單':
      return 'leaveAdvantech';
    case '回工作經驗':
      return 'advantechBackToWorkExperience';
    default:
      return 'advantechBackToWorkExperience';
    }
  }
  case 'workExperience_TrunkStudio':
  {
    switch (text) {
    case '回選單':
      return 'leaveTrunkStudio';
    case '回工作經驗':
      return 'trunkStudioBackToWorkExperience';
    default:
      return 'trunkStudioBackToWorkExperience';
    }
  }
  case 'projects':
  {
    switch (text) {
    case '看看Ghowa的詳細介紹':
      return 'ghowa';
    case '看看Meracle的詳細介紹':
      return 'meracle';
    case '看看 HERE 這禮 的詳細介紹':
      return 'here';
    case '看看BonERP的詳細介紹':
      return 'bonERP';
    default:
      return 'leaveProjects';
    }
  }
  case 'projects_Ghowa':
  {
    switch (text) {
    case '擔任的角色':
      return 'ghowaRole';
    case '程式語言':
      return 'ghowaLang';
    case '實際畫面':
      return 'ghowaScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_Meracle':
  {
    switch (text) {
    case '擔任的角色':
      return 'meracleRole';
    case '程式語言':
      return 'meracleLang';
    case '實際畫面':
      return 'meracleScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_HERE':
  {
    switch (text) {
    case '擔任的角色':
      return 'hereRole';
    case '程式語言':
      return 'hereLang';
    case '實際畫面':
      return 'hereScreen';
    default:
      return 'projects';
    }
  }
  case 'projects_BonERP':
  {
    switch (text) {
    case '擔任的角色':
      return 'bonERPRole';
    case '程式語言':
      return 'bonERPLang';
    case '實際畫面':
      return 'bonERPScreen';
    default:
      return 'projects';
    }
  }
  case 'skills':
  {
    switch (text) {
    default:
      return 'gotStart';
    }
  }
  default:
    return 'gotStart';
  }
};

export const fsm = createFsm();
