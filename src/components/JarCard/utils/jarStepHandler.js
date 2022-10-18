import JarStepOne from '../images/JarStep1.png';
import JarStepTwo from '../images/JarStep2.png';
import JarStepThree from '../images/JarStep3.png';
import JarStepFour from '../images/JarStep4.png';
import JarStepFive from '../images/JarStep5.png';
import JarStepSix from '../images/JarStep6.png';

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
