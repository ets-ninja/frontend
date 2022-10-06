import JarStepOne from './jarImages/JarStep1.png';
import JarStepTwo from './jarImages/JarStep2.png';
import JarStepThree from './jarImages/JarStep3.png';
import JarStepFour from './jarImages/JarStep4.png';
import JarStepFive from './jarImages/JarStep5.png';
import JarStepSix from './jarImages/JarStep6.png';

const jarStepHandler = (value, goal) => {
  const JarImagesArr = [
    JarStepOne,
    JarStepTwo,
    JarStepThree,
    JarStepFour,
    JarStepFive,
    JarStepSix,
  ];
  const idx = (value * 6) / goal;
  if (idx >= 3.5 && idx <= 5.5) return JarImagesArr[4];
  return JarImagesArr[idx > 5.5 ? 5 : Math.round(idx)];
};

export default jarStepHandler;
