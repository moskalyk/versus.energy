import { useState, useRef, useEffect } from 'react';
import './App.css';
import defaultImageY from './assets/Y/default_y.png';
import defaultImageX from './assets/X/default_x.png';
import { Swiper, SwiperSlide } from 'swiper/react';
// @ts-ignore
import 'swiper/css';

const muscleExercises: any = {
  abs: [
    { title: "Crunches", description: "Lie on your back, knees bent, and crunch your torso up toward your knees." },
    { title: "Plank", description: "Hold a plank position on your forearms with your body in a straight line." },
    { title: "Bicycle Crunch", description: "Alternate bringing each knee to the opposite elbow in a crunching motion." }
  ],
  forearms: [
    { title: "Wrist Curls", description: "Hold a dumbbell and curl your wrist upward to engage the forearm." },
    { title: "Reverse Wrist Curls", description: "Reverse the grip and curl the wrist to target the other side of the forearm." },
    { title: "Farmer's Walk", description: "Hold a heavy weight in each hand and walk, engaging forearm muscles." }
  ],
  knees: [
    { title: "Leg Extensions", description: "Use a machine to extend your knees, targeting the quadriceps." },
    { title: "Step-Ups", description: "Step up onto a platform, engaging knees and thighs." },
    { title: "Lunges", description: "Step forward and bend your knee to engage thighs and knees." }
  ],
  rhomboids: [
    { title: "Reverse Fly", description: "Hold weights and open arms out wide, squeezing shoulder blades together." },
    { title: "Face Pulls", description: "Use a cable machine to pull towards your face, activating the upper back." },
    { title: "Seated Row", description: "Pull handles towards your torso while keeping shoulders back." }
  ],
  achilles: [
    { title: "Heel Raises", description: "Raise up onto your toes to strengthen the Achilles tendon and calf." },
    { title: "Single-Leg Calf Raise", description: "Stand on one leg and raise onto the ball of the foot." },
    { title: "Ankle Flexion", description: "Flex and extend the ankle to engage the Achilles." }
  ],
  glutes: [
    { title: "Glute Bridges", description: "Lie on your back, lift your hips towards the ceiling to activate glutes." },
    { title: "Hip Thrusts", description: "Use a bench to support your upper back while lifting your hips." },
    { title: "Squats", description: "Lower your body into a squat position to target glutes and thighs." }
  ],
  lats: [
    { title: "Lat Pulldown", description: "Use a cable machine to pull the bar down towards your chest." },
    { title: "Pull-Ups", description: "Grip a bar overhead and pull yourself up until your chin is above the bar." },
    { title: "Dumbbell Row", description: "Row a dumbbell up to your side, engaging your lats and back." }
  ],
  rotator_cuffs: [
    { title: "Internal Rotations", description: "Use a band to rotate the arm inward, focusing on the shoulder." },
    { title: "External Rotations", description: "Rotate the arm outward with a band to strengthen the rotator cuff." },
    { title: "Cable Rotations", description: "Use a cable machine to perform controlled internal and external rotations." }
  ],
  biceps: [
    { title: "Bicep Curls", description: "Curl the dumbbells towards your shoulders, isolating the biceps." },
    { title: "Hammer Curls", description: "Curl with palms facing inward to engage the brachialis and biceps." },
    { title: "Chin-Ups", description: "Pull yourself up on a bar with an underhand grip, targeting the biceps." }
  ],
  hamstrings: [
    { title: "Deadlifts", description: "Lift the barbell from the ground, focusing on hamstrings and lower back." },
    { title: "Leg Curls", description: "Use a machine to curl your legs towards your glutes, isolating hamstrings." },
    { title: "Romanian Deadlift", description: "Keep knees slightly bent and lower the bar to engage hamstrings." }
  ],
  lower_back: [
    { title: "Back Extensions", description: "Use a back extension bench to engage and strengthen the lower back." },
    { title: "Good Mornings", description: "Hinge at the hips, keeping your back straight to target lower back." },
    { title: "Deadlifts", description: "Engage the lower back as you lift the barbell from the ground." }
  ],
  shins: [
    { title: "Tibialis Raises", description: "Lift your toes towards your shins to strengthen the tibialis anterior." },
    { title: "Toe Raises", description: "Stand on your heels and lift your toes off the ground to strengthen the shins." },
    { title: "Heel Walks", description: "Walk on your heels to engage the front of your lower legs." }
  ],
  calfs: [
    { title: "Standing Calf Raises", description: "Raise up onto the balls of your feet to work the calf muscles." },
    { title: "Seated Calf Raises", description: "Perform calf raises while seated to isolate lower calf." },
    { title: "Jump Rope", description: "Jump continuously to work calves with each landing." }
  ],
  hands: [
    { title: "Finger Extensions", description: "Use a rubber band to resist finger extension." },
    { title: "Hand Grippers", description: "Squeeze hand grippers to build grip strength." },
    { title: "Plate Pinches", description: "Pinch weight plates together and hold to strengthen fingers and hands." }
  ],
  neck: [
    { title: "Neck Flexion", description: "Move your head forward against resistance to strengthen the neck." },
    { title: "Neck Extension", description: "Move your head back against resistance, working the neck extensors." },
    { title: "Lateral Neck Flexion", description: "Tilt your head side-to-side against resistance." }
  ],
  thighs: [
    { title: "Squats", description: "Lower your body as if sitting in a chair, working the thigh muscles." },
    { title: "Leg Press", description: "Press weight away from your body using your thighs on the leg press machine." },
    { title: "Lunges", description: "Step forward and bend both knees to target thighs and glutes." }
  ],
  hips: [
    { title: "Hip Thrusts", description: "Use a bench to support your upper back while lifting your hips." },
    { title: "Lateral Leg Raises", description: "Raise your leg out to the side to engage hip abductors." },
    { title: "Clamshells", description: "Lie on your side and open your knees to target the hip abductors." }
  ],
  obliques: [
    { title: "Russian Twists", description: "Twist your torso from side to side while holding a weight." },
    { title: "Side Plank", description: "Hold a plank position on your side to engage the obliques." },
    { title: "Wood Choppers", description: "Twist your torso while pulling weight across your body." }
  ],
  traps: [
    { title: "Shrugs", description: "Lift your shoulders towards your ears to target the trapezius." },
    { title: "Face Pulls", description: "Pull a cable towards your face, focusing on traps and upper back." },
    { title: "Upright Row", description: "Lift weights vertically to engage traps and shoulders." }
  ],
  deltoids: [
    { title: "Shoulder Press", description: "Press weights overhead, engaging deltoids and upper arms." },
    { title: "Lateral Raise", description: "Lift weights out to the sides to target the side deltoids." },
    { title: "Front Raise", description: "Raise weights in front of you, engaging the front deltoids." }
  ],
  inner_thighs: [
    { title: "Sumo Squats", description: "Stand wide and squat, targeting inner thighs." },
    { title: "Cable Adduction", description: "Use a cable machine to bring your leg across your body." },
    { title: "Lateral Lunges", description: "Step out to the side, bending the knee to work the inner thighs." }
  ],
  pecs: [
    { title: "Bench Press", description: "Lower and press a barbell to engage chest muscles." },
    { title: "Push-Ups", description: "Lower and raise your body while keeping your core tight." },
    { title: "Chest Fly", description: "Open and close arms in a hugging motion to engage pecs." }
  ],
  triceps: [
    { title: "Tricep Dips", description: "Lower your body using your arms to engage the triceps." },
    { title: "Overhead Tricep Extension", description: "Lift a weight overhead, extending your arms to work the triceps." },
    { title: "Skull Crushers", description: "Lower weights towards your head, isolating the triceps." }
  ]
};


// CollapsibleCard component
const CollapsibleCard = ({ title, children }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef: any = useRef(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setHeight(contentRef.current.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <div style={styles.container}>
      <div style={styles.header} onClick={toggleCollapse}>
        <h3 style={styles.title}>{title}</h3>
      </div>
      <div
        ref={contentRef}
        style={{
          ...styles.content,
          height: `${height}px`,
          transition: 'height 0.3s ease',
        }}
      >
        <div style={styles.innerContent}>{children}</div>
      </div>
    </div>
  );
};

// Basic styling
const styles = {
  container: {
    border: '1px solid #ddd',
    borderRadius: '5px',
    margin: '10px 0',
    overflow: 'hidden',
  },
  header: {
    fontFamily: "Tiny5",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    cursor: 'pointer',
    padding: '10px 15px',
    backgroundColor: '#f5f5f5',
  },
  title: {
    margin: 0,
    fontSize: '16px',
    fontWeight: '500',
  },
  content: {
    overflow: 'hidden',
    transition: 'height 0.3s ease',
  },
  innerContent: {
    width: '300px',
    padding: '10px 15px',
    backgroundColor: '#fff',
  },
  rotatingImage: {
    transition: 'transform 0.5s ease',
  },
};

function App() {
  const imagesY = import.meta.glob('./assets/Y/*.png', { eager: true });
  const imagesX = import.meta.glob('./assets/X/*.png', { eager: true });
  const shuffleArray = (array: any) => array.sort(() => Math.random() - 0.5);

  // @ts-ignore
  const imageArrayY = [defaultImageY, ...shuffleArray(Object.values(imagesY).map((module) => module.default))];
  
  // @ts-ignore
  const imageArrayX = [defaultImageX, ...shuffleArray(Object.values(imagesX).map((module) => module.default))];

  const [shuffledImagesY, _] = useState<any>(imageArrayY);
  const [shuffledImagesX, __] = useState<any>(imageArrayX);
  const [imageIndexY, setImageIndexY] = useState<any>(0);
  const [imageIndexX, setImageIndexX] = useState<any>(0);
  const [currentExercises, setCurrentExercises] = useState<any>([]);

  const rotateImage = (setIndex: any) => {
    setIndex((prevIndex: any) => (prevIndex + 1) % shuffledImagesY.length);
  };

  // Effect to load exercises based on updated image indices
  useEffect(() => {
    const currentImagePath = shuffledImagesY[imageIndexY];
    const imageName = currentImagePath.split('/').pop().split('?')[0].replace('.png', ''); // Remove query parameters and .png

    const exercises = muscleExercises[imageName] || [];
    setCurrentExercises(exercises);
    console.log(exercises)

  }, [imageIndexY, shuffledImagesY]);

  useEffect(() => {
    const currentImagePath = shuffledImagesX[imageIndexX];
    const imageName = currentImagePath.split('/').pop().split('?')[0].replace('.png', ''); // Remove query parameters and .png
    const exercises = muscleExercises[imageName] || [];
    setCurrentExercises(exercises);
  }, [imageIndexX, shuffledImagesX]);

   const resetState = () => {
    setCurrentExercises([]); // Clear the exercises list
    setImageIndexY(0); // Reset Y image index
    setImageIndexX(0); // Reset X image index
  };

  const handleSlideChange = () => {
    resetState();
  };

  return (
    <div>
      <p style={{ color: 'black' }}>Versus</p>
      <p style={{ color: 'black' }}>Train against AI</p>
      <Swiper onSlideChange={handleSlideChange} slidesPerView={1} spaceBetween={30} loop={true} className="mySwiper">
        <SwiperSlide>
          <img
            src={shuffledImagesY[imageIndexY]}
            className="logo"
            alt="Exercise"
            onClick={() => rotateImage(setImageIndexY)}
            style={{ ...styles.rotatingImage, width: '350px', height: '350px', cursor: 'pointer' }}
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={shuffledImagesX[imageIndexX]}
            className="logo"
            alt="Exercise"
            onClick={() => rotateImage(setImageIndexX)}
            style={{ ...styles.rotatingImage, width: '350px', height: '350px', cursor: 'pointer' }}
          />
        </SwiperSlide>
      </Swiper>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
        {currentExercises.map((exercise: any, index: any) => (
          <CollapsibleCard title={exercise.title} key={index}>
            <p>{exercise.description}</p>
          </CollapsibleCard>
        ))}
    </div>
  );
}

export default App;
