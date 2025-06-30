import React, { useState, useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './HealthHub';

const HealthHub = () => {
  const [activeCategory, setActiveCategory] = useState('pregnancy');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [savedArticles, setSavedArticles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [contentToShare, setContentToShare] = useState(null);
  const [isVideoContent, setIsVideoContent] = useState(false);

  // Load saved articles from localStorage on component mount
  useEffect(() => {
    const saved = localStorage.getItem('savedArticles');
    if (saved) {
      setSavedArticles(JSON.parse(saved));
    }
  }, []);

  const categories = [
    { id: 'pregnancy', name: 'Pregnancy Care', icon: 'fas fa-baby' },
    { id: 'nutrition', name: 'Nutrition', icon: 'fas fa-apple-alt' },
    { id: 'exercise', name: 'Exercise', icon: 'fas fa-running' },
    { id: 'mental-health', name: 'Mental Health', icon: 'fas fa-brain' },
    { id: 'labor', name: 'Labor & Delivery', icon: 'fas fa-hospital' },
    { id: 'postpartum', name: 'Postpartum Care', icon: 'fas fa-heart' }
  ];

  const articles = {
    pregnancy: [
      {
        id: 1,
        title: "Essential Vitamins During Pregnancy",
        excerpt: "Learn about the crucial vitamins and supplements needed for a healthy pregnancy.",
        readTime: "5 min read",
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        content: "During pregnancy, your body needs additional nutrients to support your baby's growth and development. The most important vitamins include:\n\n1. Folic Acid (400-800 mcg daily) - Prevents neural tube defects\n2. Iron (27 mg daily) - Supports increased blood volume\n3. Calcium (1,000 mg daily) - For baby's bone development\n4. Vitamin D (600 IU daily) - Helps absorb calcium\n5. DHA (200-300 mg daily) - Supports brain development\n\nAlways consult with your healthcare provider before starting any supplements."
      },
      {
        id: 2,
        title: "Understanding Pregnancy Trimesters",
        excerpt: "A complete guide to what happens in each trimester of pregnancy.",
        readTime: "8 min read",
        category: "General",
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400",
        content: "Pregnancy is divided into three trimesters, each with distinct developmental milestones:\n\nFirst Trimester (Weeks 1-12):\n- Baby's major organs begin forming\n- Morning sickness is common\n- Fatigue and breast tenderness occur\n\nSecond Trimester (Weeks 13-28):\n- Baby's movements become noticeable\n- Belly grows significantly\n- Most comfortable period for many women\n\nThird Trimester (Weeks 29-40):\n- Rapid weight gain for baby\n- Increased discomfort and back pain\n- Preparation for labor begins"
      },
      {
        id: 3,
        title: "Common Pregnancy Symptoms",
        excerpt: "Recognize normal pregnancy symptoms and when to seek medical attention.",
        readTime: "6 min read",
        category: "Symptoms",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
        content: "Common pregnancy symptoms include:\n\n- Morning sickness (nausea with or without vomiting)\n- Fatigue and sleepiness\n- Frequent urination\n- Food aversions or cravings\n- Mood swings\n- Breast tenderness\n\nSeek medical attention if you experience:\n\n- Severe abdominal pain\n- Heavy bleeding\n- Severe headaches with vision changes\n- Sudden swelling in hands/face\n- Decreased fetal movement after 28 weeks"
      },
      {
        id: 4,
        title: "Pregnancy Do's and Don'ts",
        excerpt: "Essential guidelines for what to do and avoid during pregnancy.",
        readTime: "7 min read",
        category: "Safety",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        content: "Pregnancy Do's:\n\n- Do take prenatal vitamins\n- Do stay hydrated\n- Do get regular exercise\n- Do eat a balanced diet\n- Do get plenty of rest\n\nPregnancy Don'ts:\n\n- Don't smoke or be around secondhand smoke\n- Don't drink alcohol\n- Don't eat raw or undercooked foods\n- Don't take certain medications (check with your doctor)\n- Don't engage in high-risk activities\n\nFollowing these guidelines helps ensure a healthy pregnancy for you and your baby."
      },
      {
        id: 5,
        title: "Preparing for Your First Prenatal Visit",
        excerpt: "What to expect and how to prepare for your first doctor's appointment.",
        readTime: "5 min read",
        category: "Healthcare",
        image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400",
        content: "Your first prenatal visit is typically the longest and most comprehensive. Here's how to prepare:\n\nBefore the visit:\n- Write down your medical history\n- Note the first day of your last period\n- List any medications you're taking\n- Prepare questions for your doctor\n\nDuring the visit:\n- Expect a physical exam\n- You'll likely have blood tests\n- You may have an ultrasound\n- Your doctor will discuss prenatal care\n\nAfter the visit:\n- Schedule follow-up appointments\n- Start taking prenatal vitamins\n- Begin making lifestyle adjustments"
      },
      {
        id: 6,
        title: "Bonding With Your Baby During Pregnancy",
        excerpt: "Ways to connect with your baby before birth.",
        readTime: "4 min read",
        category: "Emotional Health",
        image: "https://images.unsplash.com/photo-1530041686259-53d26ebd4f6f?w=400",
        content: "Bonding with your baby during pregnancy can be a wonderful experience. Try these techniques:\n\n1. Talk or sing to your baby - They can hear your voice by the third trimester\n2. Gently massage your belly\n3. Respond to your baby's kicks\n4. Play music for your baby\n5. Practice visualization techniques\n6. Keep a pregnancy journal\n\nThese activities not only help you bond but may also have developmental benefits for your baby."
      }
    ],
    nutrition: [
      {
        id: 7,
        title: "Healthy Eating During Pregnancy",
        excerpt: "Essential nutrition guidelines for expectant mothers.",
        readTime: "7 min read",
        category: "Diet",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        content: "A balanced pregnancy diet should include:\n\n1. Protein: Lean meats, poultry, fish, eggs, beans (75-100g daily)\n2. Whole Grains: Brown rice, whole wheat bread, oatmeal\n3. Dairy: Milk, yogurt, cheese (calcium-rich)\n4. Fruits & Vegetables: Variety of colors for different nutrients\n5. Healthy Fats: Avocados, nuts, olive oil\n\nKey recommendations:\n- Eat small, frequent meals to manage nausea\n- Stay hydrated with water and limit caffeine\n- Increase calorie intake by about 300 calories/day in 2nd/3rd trimesters"
      },
      {
        id: 8,
        title: "Foods to Avoid During Pregnancy",
        excerpt: "Important dietary restrictions for pregnant women.",
        readTime: "4 min read",
        category: "Safety",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
        content: "Foods to avoid during pregnancy:\n\n1. Raw or undercooked meat/fish/eggs\n2. Unpasteurized dairy products\n3. High-mercury fish (shark, swordfish, king mackerel)\n4. Raw sprouts\n5. Unwashed fruits and vegetables\n6. Excess caffeine (limit to 200mg/day)\n7. Alcohol (complete avoidance recommended)\n8. Processed junk food with empty calories\n\nThese restrictions help prevent foodborne illnesses and protect your baby's development."
      },
      {
        id: 9,
        title: "Meal Planning for Pregnancy",
        excerpt: "Sample meal plans for each trimester.",
        readTime: "6 min read",
        category: "Diet",
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=400",
        content: "First Trimester Meal Plan:\n- Focus on foods that combat nausea\n- Small, frequent meals\n- Ginger tea, crackers, bland foods\n\nSecond Trimester Meal Plan:\n- Increased protein and calcium\n- More calories (about 300 extra/day)\n- Iron-rich foods to prevent anemia\n\nThird Trimester Meal Plan:\n- Smaller portions (less room in stomach)\n- High-fiber foods to prevent constipation\n- Continue with balanced nutrition\n\nSample daily meal plan includes breakfast, snacks, lunch, and dinner suggestions."
      },
      {
        id: 10,
        title: "Vegetarian Pregnancy Nutrition",
        excerpt: "Meeting nutritional needs on a vegetarian diet.",
        readTime: "8 min read",
        category: "Special Diets",
        image: "https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=400",
        content: "Key nutrients for vegetarian pregnancies:\n\n1. Protein: Beans, lentils, tofu, quinoa, nuts\n2. Iron: Dark leafy greens, fortified cereals (pair with vitamin C for absorption)\n3. Calcium: Fortified plant milks, almonds, tahini\n4. Vitamin B12: Nutritional yeast, fortified foods (supplement may be needed)\n5. Omega-3s: Flaxseeds, chia seeds, walnuts\n\nMeal planning tips:\n- Combine complementary proteins\n- Include a variety of colorful vegetables\n- Consider a prenatal vitamin designed for vegetarians"
      },
      {
        id: 11,
        title: "Managing Pregnancy Cravings",
        excerpt: "How to handle cravings healthily.",
        readTime: "5 min read",
        category: "Diet",
        image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=400",
        content: "Understanding pregnancy cravings:\n\n- Common cravings: Sweet, salty, sour, or unusual combinations\n- Possible causes: Hormonal changes, nutritional needs\n\nHealthy ways to manage cravings:\n1. Don't skip meals (can lead to intense cravings)\n2. Find healthier alternatives (frozen yogurt instead of ice cream)\n3. Practice portion control\n4. Stay hydrated (thirst can mimic hunger)\n5. Distract yourself with other activities\n\nWhen to be concerned:\n- Cravings for non-food items (pica)\n- Cravings that lead to excessive weight gain\n- Cravings that replace balanced nutrition"
      },
      {
        id: 12,
        title: "Hydration During Pregnancy",
        excerpt: "The importance of proper fluid intake.",
        readTime: "4 min read",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400",
        content: "Hydration needs during pregnancy:\n\n- Recommended: 8-12 cups of fluids daily\n- Increased needs due to higher blood volume\n- Helps prevent urinary tract infections and constipation\n\nBest fluids:\n- Water (best choice)\n- Milk (provides calcium)\n- Herbal teas (check for pregnancy safety)\n- Coconut water (natural electrolytes)\n\nFluids to limit:\n- Caffeinated beverages\n- Sugary drinks\n- Artificial sweeteners\n\nSigns of dehydration:\n- Dark yellow urine\n- Dizziness\n- Headaches\n- Fatigue"
      }
    ],
    exercise: [
      {
        id: 13,
        title: "Safe Exercises During Pregnancy",
        excerpt: "Stay active safely with these pregnancy-friendly exercises.",
        readTime: "10 min read",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        content: "Recommended exercises during pregnancy:\n\n1. Walking: Low-impact cardiovascular exercise\n2. Swimming: Supports your weight while working muscles\n3. Prenatal Yoga: Improves flexibility and relaxation\n4. Stationary Cycling: Safe alternative to outdoor biking\n5. Modified Strength Training: With lighter weights\n\nSafety tips:\n- Avoid exercises lying flat on your back after 1st trimester\n- Stay hydrated and don't overheat\n- Listen to your body and modify as needed\n- Avoid contact sports or activities with fall risk\n\nAim for 30 minutes of moderate exercise most days, with your doctor's approval."
      },
      {
        id: 14,
        title: "Pelvic Floor Exercises",
        excerpt: "Strengthening your pelvic floor for pregnancy and birth.",
        readTime: "6 min read",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1571019614243-c4cd3a909c62?w=400",
        content: "Pelvic floor exercises (Kegels) are essential during pregnancy:\n\nBenefits:\n- Helps support growing baby\n- May ease delivery\n- Reduces risk of incontinence\n- Aids postpartum recovery\n\nHow to do Kegels:\n1. Identify the right muscles (try stopping urine flow midstream)\n2. Contract these muscles for 5-10 seconds\n3. Relax completely between contractions\n4. Repeat 10-15 times, several times a day\n\nAdvanced variations:\n- Quick pulses (1-second contractions)\n- Elevator exercises (gradually increasing contraction strength)\n- Combined with squats or bridges"
      },
      {
        id: 15,
        title: "Exercises to Avoid During Pregnancy",
        excerpt: "Activities that may pose risks to you or your baby.",
        readTime: "5 min read",
        category: "Safety",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        content: "Exercises to avoid during pregnancy:\n\n1. Contact sports (basketball, soccer, hockey)\n2. Activities with fall risk (horseback riding, skiing, gymnastics)\n3. Hot yoga or exercising in extreme heat\n4. Scuba diving (risk of decompression sickness)\n5. Heavy weight lifting\n6. Exercises that involve lying flat on your back after first trimester\n7. High-impact activities that cause pain or discomfort\n\nWarning signs to stop exercising:\n- Vaginal bleeding\n- Dizziness or faintness\n- Shortness of breath before exertion\n- Chest pain\n- Muscle weakness\n- Contractions"
      },
      {
        id: 16,
        title: "Prenatal Yoga Benefits",
        excerpt: "How yoga can support your pregnancy journey.",
        readTime: "7 min read",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400",
        content: "Benefits of prenatal yoga:\n\n1. Improves flexibility and strength\n2. Reduces stress and anxiety\n3. Helps with sleep\n4. Teaches breathing techniques for labor\n5. May reduce pregnancy discomforts\n6. Prepares body for childbirth\n7. Connects you with your baby\n\nSafe poses include:\n- Cat-Cow (gentle spine movement)\n- Supported Bridge (with yoga block)\n- Modified Side Plank (against wall)\n- Seated Forward Bend (with strap)\n\nAvoid:\n- Deep twists\n- Inversions\n- Backbends\n- Lying on belly\nAlways inform your instructor you're pregnant."
      },
      {
        id: 17,
        title: "Posture and Body Mechanics",
        excerpt: "Protecting your body as your belly grows.",
        readTime: "6 min read",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400",
        content: "Proper posture during pregnancy:\n\nStanding:\n- Keep shoulders back and relaxed\n- Distribute weight evenly on both feet\n- Avoid locking knees\n- Engage core muscles gently\n\nSitting:\n- Use lumbar support\n- Keep feet flat or elevated\n- Avoid crossing legs\n- Take frequent breaks from sitting\n\nLifting:\n- Bend at knees, not waist\n- Keep object close to body\n- Avoid twisting while lifting\n- Get help for heavy items\n\nSleeping:\n- Side sleeping is best (left side ideal)\n- Use pillows for support\n- Avoid flat on back in later pregnancy"
      },
      {
        id: 18,
        title: "Exercise for Common Pregnancy Discomforts",
        excerpt: "Movements to relieve typical pregnancy aches.",
        readTime: "8 min read",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400",
        content: "Exercises to relieve pregnancy discomforts:\n\nBack Pain:\n- Pelvic tilts\n- Cat-Cow stretches\n- Prenatal yoga\n\nSciatica:\n- Piriformis stretches\n- Swimming\n- Warm water therapy\n\nSwollen Ankles:\n- Ankle circles\n- Elevating legs\n- Walking in water\n\nRound Ligament Pain:\n- Gentle side stretches\n- Slow position changes\n- Support belts\n\nConstipation:\n- Walking\n- Pelvic floor exercises\n- Gentle twists\n\nAlways consult your healthcare provider before starting new exercises to address discomforts."
      }
    ],
    'mental-health': [
      {
        id: 19,
        title: "Managing Pregnancy Anxiety",
        excerpt: "Coping strategies for pregnancy-related worries.",
        readTime: "7 min read",
        category: "Emotional Health",
        image: "https://images.unsplash.com/photo-1491349174775-aaafddd81942?w=400",
        content: "Common pregnancy anxieties include:\n- Worries about baby's health\n- Fear of childbirth\n- Concerns about parenting abilities\n\nCoping strategies:\n1. Educate yourself (but avoid excessive googling)\n2. Practice relaxation techniques\n3. Maintain open communication with your partner\n4. Join a support group\n5. Limit exposure to negative stories\n6. Establish a worry time (limit worrying to a specific time each day)\n\nWhen to seek help:\n- Anxiety interferes with daily life\n- Persistent negative thoughts\n- Physical symptoms like panic attacks\n- Difficulty sleeping due to worries"
      },
      {
        id: 20,
        title: "Prenatal Depression",
        excerpt: "Recognizing and addressing depression during pregnancy.",
        readTime: "6 min read",
        category: "Emotional Health",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
        content: "Prenatal depression affects about 10-15% of pregnant women. Symptoms include:\n\n- Persistent sadness\n- Loss of interest in activities\n- Changes in sleep/appetite\n- Feelings of worthlessness\n- Difficulty concentrating\n\nRisk factors:\n- History of depression\n- Lack of support\n- Pregnancy complications\n- Stressful life events\n\nTreatment options:\n- Therapy (especially CBT)\n- Support groups\n- Medication (when benefits outweigh risks)\n- Lifestyle changes\n\nUntreated depression can affect both mother and baby, so seeking help is important."
      },
      {
        id: 21,
        title: "Mindfulness for Pregnancy",
        excerpt: "Using mindfulness to stay present during your pregnancy journey.",
        readTime: "5 min read",
        category: "Wellness",
        image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400",
        content: "Mindfulness practices for pregnancy:\n\n1. Body Scan Meditation:\n- Focus attention from toes to head\n- Notice sensations without judgment\n\n2. Breathing Exercises:\n- Deep belly breathing\n- Counting breaths\n\n3. Mindful Movement:\n- Yoga with awareness of body\n- Walking meditation\n\n4. Bonding with Baby:\n- Focus on baby's movements\n- Visualize your baby\n\nBenefits:\n- Reduces stress\n- Improves sleep\n- Enhances connection with baby\n- Prepares for labor\n\nStart with just 5-10 minutes daily and gradually increase."
      },
      {
        id: 22,
        title: "Relationship Changes During Pregnancy",
        excerpt: "Navigating the emotional shifts in your partnership.",
        readTime: "8 min read",
        category: "Relationships",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400",
        content: "How pregnancy affects relationships:\n\nCommon changes:\n- Shifting roles and identities\n- Changing intimacy patterns\n- Financial stress\n- Different parenting expectations\n\nStrengthening your relationship:\n1. Communicate openly about fears and hopes\n2. Schedule quality time together\n3. Attend prenatal appointments together\n4. Discuss parenting philosophies\n5. Seek couples counseling if needed\n\nIntimacy during pregnancy:\n- Physical changes may affect desire\n- Need for emotional connection increases\n- Experiment with new ways to be intimate\n- Communicate about comfort levels"
      },
      {
        id: 23,
        title: "Preparing for the Emotional Changes of Motherhood",
        excerpt: "What to expect emotionally after birth.",
        readTime: "6 min read",
        category: "Emotional Health",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
        content: "Emotional changes to anticipate:\n\nThe Baby Blues (first 2 weeks):\n- Mood swings\n- Tearfulness\n- Anxiety\n\nPostpartum Period:\n- Adjustment to new identity\n- Sleep deprivation effects\n- Changing relationship dynamics\n\nPreparing emotionally:\n1. Educate yourself about normal emotional changes\n2. Build your support network\n3. Discuss expectations with your partner\n4. Plan for self-care\n5. Identify resources for help\n\nWhen to seek help:\n- Symptoms persist beyond 2 weeks\n- Thoughts of harming yourself or baby\n- Inability to care for yourself or baby"
      },
      {
        id: 24,
        title: "Creating a Birth Plan",
        excerpt: "How planning can reduce anxiety about labor.",
        readTime: "7 min read",
        category: "Preparation",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
        content: "A birth plan helps communicate your preferences. Include:\n\nLabor Preferences:\n- Pain management options\n- Mobility preferences\n- Environment (lighting, music)\n\nDelivery Preferences:\n- Who will be present\n- Pushing positions\n- Episiotomy preferences\n\nAfter Birth:\n- Immediate skin-to-skin\n- Cord clamping timing\n- Feeding preferences\n\nRemember:\n- Keep it flexible (birth can be unpredictable)\n- Discuss with your healthcare provider\n- Pack multiple copies for hospital\n- Focus on healthy mom and baby as primary goal"
      }
    ],
    labor: [
      {
        id: 25,
        title: "Signs of Labor",
        excerpt: "How to recognize when labor is starting.",
        readTime: "5 min read",
        category: "Symptoms",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
        content: "Signs that labor may be starting:\n\nEarly Signs:\n- Lightening (baby drops lower)\n- Increased backache\n- Loose joints\n- Diarrhea\n- Nesting instinct\n\nMore Definite Signs:\n1. Regular contractions that intensify\n2. Water breaking (can be a trickle or gush)\n3. Bloody show (mucus plug discharge)\n\nWhen to go to the hospital:\n- Contractions 5 minutes apart for an hour\n- Water breaks (especially if fluid isn't clear)\n- Decreased fetal movement\n- Any bleeding like a period\n\nFalse labor vs. true labor:\n- False labor contractions are irregular\n- True labor contractions get stronger and closer together"
      },
      {
        id: 26,
        title: "Stages of Labor",
        excerpt: "Understanding the phases of childbirth.",
        readTime: "8 min read",
        category: "Education",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
        content: "The three stages of labor:\n\nFirst Stage (Early, Active, Transition):\n- Early: 0-6 cm dilation, contractions 5-30 min apart\n- Active: 6-8 cm, contractions 3-5 min apart\n- Transition: 8-10 cm, intense contractions\n\nSecond Stage (Pushing and Birth):\n- Complete dilation to baby's birth\n- May last minutes to hours\n- Crowning occurs as baby's head appears\n\nThird Stage (Delivery of Placenta):\n- 5-30 minutes after birth\n- Mild contractions help expel placenta\n- Medical staff examines placenta\n\nFourth Stage (Recovery):\n- First 1-2 hours postpartum\n- Uterus contracts to control bleeding\n- Bonding with baby begins"
      },
      {
        id: 27,
        title: "Pain Management Options",
        excerpt: "Medical and natural approaches to labor pain.",
        readTime: "7 min read",
        category: "Options",
        image: "https://images.unsplash.com/photo-1581595219315-a187dd40c322?w=400",
        content: "Labor pain relief options:\n\nNon-Medical Methods:\n- Breathing techniques\n- Movement and position changes\n- Hydrotherapy (shower or tub)\n- Massage and counterpressure\n- Visualization and hypnosis\n\nMedical Options:\n1. Nitrous oxide (laughing gas)\n2. Opioid analgesics\n3. Epidural anesthesia (most effective)\n4. Spinal block (for c-sections)\n\nFactors to consider:\n- Your pain tolerance\n- Labor progression\n- Baby's position\n- Hospital policies\n\nDiscuss options with your provider beforehand and remain flexible."
      },
      {
        id: 28,
        title: "When Labor Doesn't Go as Planned",
        excerpt: "Coping with unexpected changes to your birth plan.",
        readTime: "6 min read",
        category: "Emotional Health",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
        content: "Common unexpected situations:\n\n- Need for induction\n- Prolonged labor\n- Fetal distress\n- C-section requirement\n\nCoping strategies:\n1. Remember the goal is healthy mom and baby\n2. Ask questions to understand medical needs\n3. Allow yourself to grieve the ideal birth\n4. Focus on what you can control\n5. Seek postpartum debriefing if needed\n\nProcessing emotions:\n- Talk about your experience\n- Write in a journal\n- Consider professional support\n- Connect with others who had similar experiences\n\nEvery birth story is unique and valid."
      },
      {
        id: 29,
        title: "Preparing Your Birth Partner",
        excerpt: "How your support person can help during labor.",
        readTime: "5 min read",
        category: "Preparation",
        image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=400",
        content: "Ways your birth partner can help:\n\nBefore Labor:\n- Attend prenatal classes with you\n- Learn about labor stages\n- Pack the hospital bag together\n\nDuring Labor:\n1. Provide physical comfort (massage, cool cloths)\n2. Help with position changes\n3. Advocate for your preferences\n4. Keep you hydrated\n5. Offer encouragement\n\nSpecific Support Techniques:\n- Counterpressure for back labor\n- Helping with breathing patterns\n- Managing the environment (lighting, music)\n- Communicating with medical staff\n\nEncourage your partner to take breaks when needed."
      },
      {
        id: 30,
        title: "Packing Your Hospital Bag",
        excerpt: "Essential items to bring for labor and delivery.",
        readTime: "4 min read",
        category: "Preparation",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400",
        content: "What to pack for the hospital:\n\nFor Mom:\n- Insurance info and hospital forms\n- Comfortable robe and slippers\n- Lip balm and lotion\n- Nursing bras and pads\n- Going-home outfit\n\nFor Baby:\n- Car seat (installed)\n- Going-home outfit\n- Swaddle blanket\n- Hat\n\nFor Partner:\n- Change of clothes\n- Snacks\n- Phone charger\n- Pillow\n\nExtras:\n- Camera/phone\n- Birth plan copies\n- Entertainment (books, music)\n- Toiletries\n\nPack by 36 weeks so you're ready."
      }
    ],
    postpartum: [
      {
        id: 31,
        title: "Postpartum Recovery Timeline",
        excerpt: "What to expect in the days and weeks after birth.",
        readTime: "7 min read",
        category: "Recovery",
        image: "https://images.unsplash.com/photo-1527613426441-4da17471b66d?w=400",
        content: "Typical postpartum recovery:\n\nFirst 24 Hours:\n- Vaginal bleeding begins\n- Uterus contracts\n- Possible perineal soreness\n\nFirst Week:\n- Bleeding continues (like heavy period)\n- Breast engorgement may begin\n- Fatigue is intense\n\n2-6 Weeks:\n- Bleeding tapers off\n- Stitches dissolve\n- Body slowly returns to pre-pregnancy state\n\n6 Weeks+:\n- May get medical clearance for activity\n- Hormones continue adjusting\n- Hair loss may occur\n\nWarning signs:\n- Heavy bleeding (soaking pad hourly)\n- Fever\n- Severe pain\n- Redness/swelling in legs"
      },
      {
        id: 32,
        title: "Postpartum Depression Signs",
        excerpt: "Recognizing when baby blues may be something more.",
        readTime: "6 min read",
        category: "Mental Health",
        image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400",
        content: "Postpartum depression (PPD) affects about 1 in 7 women. Symptoms include:\n\n- Persistent sadness\n- Loss of interest in activities\n- Difficulty bonding with baby\n- Changes in appetite/sleep\n- Feelings of worthlessness\n- Thoughts of harming self or baby\n\nRisk factors:\n- History of depression\n- Lack of support\n- Birth complications\n- Baby with health issues\n\nTreatment options:\n- Therapy (especially CBT)\n- Medication (many are breastfeeding-safe)\n- Support groups\n- Self-care strategies\n\nEarly intervention leads to better outcomes."
      },
      {
        id: 33,
        title: "Breastfeeding Basics",
        excerpt: "Getting started with nursing your newborn.",
        readTime: "8 min read",
        category: "Feeding",
        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400",
        content: "Breastfeeding fundamentals:\n\nGetting Started:\n- Begin within first hour if possible\n- Look for hunger cues (rooting, hand-to-mouth)\n- Ensure proper latch (wide open mouth)\n\nPositioning:\n1. Cradle hold\n2. Football hold\n3. Side-lying position\n\nFrequency:\n- 8-12 times per day initially\n- On demand (not scheduled)\n- 10-45 minutes per side\n\nCommon Challenges:\n- Sore nipples (check latch)\n- Engorgement (frequent feeding helps)\n- Cluster feeding (normal)\n\nSeek help from lactation consultants if needed."
      },
      {
        id: 34,
        title: "Postpartum Exercise Guidelines",
        excerpt: "Safe ways to regain strength after birth.",
        readTime: "6 min read",
        category: "Fitness",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
        content: "Returning to exercise postpartum:\n\nFirst 6 Weeks:\n- Walking is best\n- Pelvic floor exercises\n- Gentle stretching\n\nAfter Doctor's Clearance (typically 6 weeks):\n1. Start slowly (10-15 minute sessions)\n2. Focus on core and pelvic floor\n3. Low-impact activities first\n\nRecommended Exercises:\n- Kegels\n- Pelvic tilts\n- Modified bridges\n- Walking\n- Swimming\n\nAvoid:\n- High-impact too soon\n- Heavy lifting\n- Exercises that cause pain\n\nListen to your body and progress gradually."
      },
      {
        id: 35,
        title: "Postpartum Nutrition",
        excerpt: "Eating for recovery and breastfeeding.",
        readTime: "5 min read",
        category: "Nutrition",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        content: "Nutritional needs postpartum:\n\nFor Recovery:\n- Iron-rich foods (if blood loss was significant)\n- Vitamin C (helps with healing)\n- Protein (tissue repair)\n- Fiber (prevents constipation)\n\nFor Breastfeeding:\n- Extra 300-500 calories/day\n- Stay hydrated\n- Continue prenatal vitamins\n- Omega-3s for baby's brain\n\nEasy Meal Ideas:\n- Oatmeal with nuts and fruit\n- Yogurt with granola\n- Hard-boiled eggs and veggies\n- Lentil soup\n- Whole grain toast with avocado\n\nAvoid restrictive dieting while establishing milk supply."
      },
      {
        id: 36,
        title: "Returning to Work After Baby",
        excerpt: "Making the transition back to your job.",
        readTime: "7 min read",
        category: "Work-Life",
        image: "https://images.unsplash.com/photo-1521791055366-0d553872125f?w=400",
        content: "Tips for returning to work:\n\nBefore Leave:\n- Understand your rights (FMLA, pumping breaks)\n- Discuss flexible options with employer\n- Practice pumping if breastfeeding\n\nTransition Plan:\n1. Consider phased return if possible\n2. Arrange reliable childcare\n3. Prepare pumping schedule if needed\n4. Organize work wardrobe\n\nEmotional Aspects:\n- Allow time to adjust\n- Communicate needs with employer\n- Stay connected to baby (photos, videos)\n- Don't expect perfection\n\nRemember: You're modeling work-life balance for your child."
      }
    ]
  };

  const videos = [
    // Pregnancy Videos
    {
      id: 1,
      title: "Breathing Techniques for Labor",
      duration: "12:34",
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      description: "Learn effective breathing techniques to manage labor pain.",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      category: "pregnancy"
    },
    {
      id: 2,
      title: "Prenatal Yoga Routine",
      duration: "25:15",
      thumbnail: "https://img.youtube.com/vi/7C2z4GqqS5E/maxresdefault.jpg",
      description: "Gentle yoga exercises safe for pregnancy.",
      videoUrl: "https://www.youtube.com/embed/7C2z4GqqS5E",
      category: "pregnancy"
    },
    {
      id: 3,
      title: "Preparing for Breastfeeding",
      duration: "18:42",
      thumbnail: "https://img.youtube.com/vi/3CvfQ5b9KUI/maxresdefault.jpg",
      description: "Everything you need to know about breastfeeding preparation.",
      videoUrl: "https://www.youtube.com/embed/3CvfQ5b9KUI",
      category: "pregnancy"
    },
    
    // Nutrition Videos
    {
      id: 4,
      title: "Pregnancy Meal Prep Ideas",
      duration: "15:20",
      thumbnail: "https://img.youtube.com/vi/9ZfN87gSjvI/maxresdefault.jpg",
      description: "Quick and nutritious meal ideas for busy moms-to-be.",
      videoUrl: "https://www.youtube.com/embed/9ZfN87gSjvI",
      category: "nutrition"
    },
    {
      id: 5,
      title: "Healthy Pregnancy Snacks",
      duration: "10:45",
      thumbnail: "https://img.youtube.com/vi/5qap5aO4i9A/maxresdefault.jpg",
      description: "Nutritious snack ideas to keep you energized.",
      videoUrl: "https://www.youtube.com/embed/5qap5aO4i9A",
      category: "nutrition"
    },
    {
      id: 6,
      title: "Vegetarian Pregnancy Nutrition",
      duration: "22:10",
      thumbnail: "https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg",
      description: "Meeting all nutritional needs on a plant-based diet.",
      videoUrl: "https://www.youtube.com/embed/J---aiyznGQ",
      category: "nutrition"
    },
    
    // Exercise Videos
    {
      id: 7,
      title: "Pregnancy Cardio Workout",
      duration: "20:30",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
      description: "Safe cardiovascular exercises for each trimester.",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      category: "exercise"
    },
    {
      id: 8,
      title: "Prenatal Strength Training",
      duration: "18:15",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      description: "Building strength safely during pregnancy.",
      videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
      category: "exercise"
    },
    {
      id: 9,
      title: "Pregnancy Stretches for Back Pain",
      duration: "12:50",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
      description: "Relieve common pregnancy back discomfort.",
      videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8",
      category: "exercise"
    },
    
    // Mental Health Videos
    {
      id: 10,
      title: "Pregnancy Meditation Guide",
      duration: "15:00",
      thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/maxresdefault.jpg",
      description: "Mindfulness meditation for expectant mothers.",
      videoUrl: "https://www.youtube.com/embed/inpok4MKVLM",
      category: "mental-health"
    },
    {
      id: 11,
      title: "Coping with Pregnancy Anxiety",
      duration: "18:25",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      description: "Strategies to manage worries during pregnancy.",
      videoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      category: "mental-health"
    },
    {
      id: 12,
      title: "Partner's Guide to Pregnancy Emotions",
      duration: "14:10",
      thumbnail: "https://img.youtube.com/vi/OPf0YbXqDm0/maxresdefault.jpg",
      description: "How to support your partner emotionally.",
      videoUrl: "https://www.youtube.com/embed/OPf0YbXqDm0",
      category: "mental-health"
    },
    
    // Labor Videos
    {
      id: 13,
      title: "Labor Positions Explained",
      duration: "16:45",
      thumbnail: "https://img.youtube.com/vi/1G4isv_Fylg/maxresdefault.jpg",
      description: "Optimal positions for each stage of labor.",
      videoUrl: "https://www.youtube.com/embed/1G4isv_Fylg",
      category: "labor"
    },
    {
      id: 14,
      title: "What to Pack for Hospital",
      duration: "10:30",
      thumbnail: "https://img.youtube.com/vi/JGwWNGJdvx8/maxresdefault.jpg",
      description: "Essential items for your labor bag.",
      videoUrl: "https://www.youtube.com/embed/JGwWNGJdvx8",
      category: "labor"
    },
    {
      id: 15,
      title: "Birth Partner's Role During Labor",
      duration: "14:20",
      thumbnail: "https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg",
      description: "How support people can help during childbirth.",
      videoUrl: "https://www.youtube.com/embed/9bZkp7q19f0",
      category: "labor"
    },
    
    // Postpartum Videos
    {
      id: 16,
      title: "Postpartum Recovery Exercises",
      duration: "20:15",
      thumbnail: "https://img.youtube.com/vi/3JZ_D3ELwOQ/maxresdefault.jpg",
      description: "Safe movements to heal after birth.",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
      category: "postpartum"
    },
    {
      id: 17,
      title: "Newborn Care Basics",
      duration: "25:40",
      thumbnail: "https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg",
      description: "Essential skills for caring for your newborn.",
      videoUrl: "https://www.youtube.com/embed/J---aiyznGQ",
      category: "postpartum"
    },
    {
      id: 18,
      title: "Postpartum Mental Health",
      duration: "18:55",
      thumbnail: "https://img.youtube.com/vi/kJQP7kiw5Fk/maxresdefault.jpg",
      description: "Recognizing and addressing emotional changes.",
      videoUrl: "https://www.youtube.com/embed/kJQP7kiw5Fk",
      category: "postpartum"
    }
  ];

  const currentArticles = articles[activeCategory] || [];
  const currentVideos = videos.filter(video => video.category === activeCategory);

  const playVideo = (video) => {
    setSelectedVideo(video);
    setIsPlaying(true);
  };

  const closeVideo = () => {
    setSelectedVideo(null);
    setIsPlaying(false);
  };

  const toggleSaveArticle = (article) => {
    const isSaved = savedArticles.some(a => a.id === article.id);
    let updatedSavedArticles;
    
    if (isSaved) {
      updatedSavedArticles = savedArticles.filter(a => a.id !== article.id);
    } else {
      updatedSavedArticles = [...savedArticles, article];
    }
    
    setSavedArticles(updatedSavedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedSavedArticles));
  };

  const openShareDialog = (content, isVideo = false) => {
    setContentToShare(content);
    setIsVideoContent(isVideo);
    setShowShareOptions(true);
  };

  const closeShareDialog = () => {
    setShowShareOptions(false);
    setContentToShare(null);
  };

  const shareVia = (method) => {
    const shareUrl = window.location.href;
    const title = contentToShare.title;
    const text = isVideoContent ? contentToShare.description : contentToShare.excerpt;
    
    switch(method) {
      case 'native':
        if (navigator.share) {
          navigator.share({
            title: title,
            text: text,
            url: shareUrl,
          }).catch(err => {
            console.log('Error sharing:', err);
          });
        } else {
          fallbackShare();
        }
        break;
      
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(`${title}: ${text}`)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(`${title}\n${text}\n${shareUrl}`)}`, '_blank');
        break;
      
      case 'email':
        window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${text}\n\nRead more: ${shareUrl}`)}`);
        break;
      
      case 'copy':
        navigator.clipboard.writeText(`${title}\n${text}\n${shareUrl}`);
        alert('Link copied to clipboard!');
        break;
      
      default:
        fallbackShare();
    }
    
    closeShareDialog();
  };

  const fallbackShare = () => {
    const shareUrl = window.location.href;
    alert(`Share this content:\n\n${contentToShare.title}\n\n${isVideoContent ? contentToShare.description : contentToShare.excerpt}\n\n${shareUrl}`);
  };

  const isArticleSaved = (articleId) => {
    return savedArticles.some(a => a.id === articleId);
  };

  return (
    <div className="health-hub-page">
      <div className="health-hub-container">
        <div className="health-hub-header">
          <h1 className="health-hub-title">Health Information Hub</h1>
          <p className="health-hub-description">
            Expert-curated content to guide you through your pregvita health journey
          </p>
        </div>

        {/* Categories */}
        <div className="categories-section">
          <h2 className="section-title">Browse by Category</h2>
          <div className="categories-grid">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`category-card ${activeCategory === category.id ? 'active' : ''}`}
              >
                <div className="category-icon">
                  <i className={category.icon}></i>
                </div>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div className="articles-section">
          <h2 className="section-title">
            {categories.find(cat => cat.id === activeCategory)?.name} Articles
            {savedArticles.length > 0 && (
              <button 
                onClick={() => setActiveCategory('saved')}
                className="view-saved-btn"
              >
                <i className="fas fa-bookmark"></i> View Saved ({savedArticles.length})
              </button>
            )}
          </h2>
          
          <div className="articles-grid">
            {(activeCategory === 'saved' ? savedArticles : currentArticles).map(article => (
              <div key={article.id} className="article-card">
                <div className="article-image">
                  <img src={article.image} alt={article.title} />
                  <div className="article-category-badge">{article.category}</div>
                </div>
                
                <div className="article-content">
                  <h3 className="article-title">{article.title}</h3>
                  <p className="article-excerpt">{article.excerpt}</p>
                  
                  <div className="article-meta">
                    <span className="read-time">
                      <i className="fas fa-clock mr-2"></i>
                      {article.readTime}
                    </span>
                    <button 
                      onClick={() => setSelectedArticle(article)}
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Library */}
        <div className="videos-section">
          <h2 className="section-title">{categories.find(cat => cat.id === activeCategory)?.name} Videos</h2>
          <div className="videos-grid">
            {currentVideos.map(video => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail" onClick={() => playVideo(video)}>
                  <img src={video.thumbnail} alt={video.title} />
                  <div className="video-play-button">
                    <i className="fas fa-play"></i>
                  </div>
                  <div className="video-duration">{video.duration}</div>
                </div>
                
                <div className="video-content">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => playVideo(video)}
                  >
                    <i className="fas fa-play mr-2"></i>
                    Watch Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Health Tools */}
        <div className="health-tools-section">
          <h2 className="section-title">Health Tools</h2>
          <div className="tools-grid">
            <div className="tool-card">
              <div className="tool-icon">
                <i className="fas fa-calculator"></i>
              </div>
              <h3>Due Date Calculator</h3>
              <p>Calculate your expected due date and track pregnancy progress</p>
              <a href="/Dashboard">
                <button className="btn btn-primary w-full">Use Calculator</button>
              </a>
            </div>
            
            <div className="tool-card">
              <div className="tool-icon">
                <i className="fas fa-weight"></i>
              </div>
              <h3>Weight Tracker</h3>
              <p>Monitor healthy weight gain throughout pregnancy</p>
              <a href="/Weight">
                <button className="btn btn-primary w-full">Track Weight</button>
              </a>
            </div>
            
            <div className="tool-card">
              <div className="tool-icon">
                <i className="fas fa-microphone"></i>
              </div>
              <h3>Symptom Checker</h3>
              <p>Voice-enabled symptom reporting and guidance</p>
              <a href="/Voice">
                <button className="btn btn-primary w-full">Check Symptoms</button>
              </a>
            </div>


            <div className="tool-card">
  <div className="tool-icon">
    <i className="fas fa-sms"></i>
  </div>
  <h3>SMS Reminders</h3>
  <p>Get appointment and medication reminders via text</p>
  <a href="/sms">
    <button className="btn btn-primary w-full">Set Up Reminders</button>
  </a>
</div>
          </div>


          
        </div>
        
          

        {/* Article Modal */}
        {selectedArticle && (
          <div className="modal-overlay">
            <div className="article-modal animate-scale-in">
              <div className="modal-header">
                <h2>{selectedArticle.title}</h2>
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="modal-close-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="modal-content">
                <div className="article-modal-image">
                  <img src={selectedArticle.image} alt={selectedArticle.title} />
                </div>
                
                <div className="article-modal-meta">
                  <span className="article-category">{selectedArticle.category}</span>
                  <span className="article-read-time">
                    <i className="fas fa-clock mr-2"></i>
                    {selectedArticle.readTime}
                  </span>
                </div>
                
                <div className="article-modal-content">
                  <p>{selectedArticle.excerpt}</p>
                  <p style={{ whiteSpace: 'pre-line' }}>{selectedArticle.content}</p>
                  
                  <div className="article-actions">
                    <button 
                      className={`btn ${isArticleSaved(selectedArticle.id) ? 'btn-saved' : 'btn-outline'}`}
                      onClick={() => toggleSaveArticle(selectedArticle)}
                    >
                      <i className={`fas ${isArticleSaved(selectedArticle.id) ? 'fa-check' : 'fa-bookmark'} mr-2`}></i>
                      {isArticleSaved(selectedArticle.id) ? 'Saved' : 'Save Article'}
                    </button>
                    <button 
                      className="btn btn-secondary"
                      onClick={() => openShareDialog(selectedArticle)}
                    >
                      <i className="fas fa-share mr-2"></i>
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Video Modal */}
        {selectedVideo && (
          <div className="video-modal-overlay" onClick={closeVideo}>
            <div className="video-modal" onClick={(e) => e.stopPropagation()}>
              <div className="video-modal-header">
                <h3>{selectedVideo.title}</h3>
                <button 
                  onClick={closeVideo}
                  className="video-modal-close-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="video-player-container">
                <iframe
                  width="100%"
                  height="400"
                  src={`${selectedVideo.videoUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="video-modal-footer">
                <p>{selectedVideo.description}</p>
                <button 
                  className="btn btn-secondary"
                  onClick={() => openShareDialog(selectedVideo, true)}
                >
                  <i className="fas fa-share mr-2"></i>
                  Share Video
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Share Options Modal */}
        {showShareOptions && (
          <div className="modal-overlay">
            <div className="share-modal animate-scale-in">
              <div className="modal-header">
                <h3>Share This Content</h3>
                <button 
                  onClick={closeShareDialog}
                  className="modal-close-btn"
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>
              
              <div className="share-options-grid">
                <button onClick={() => shareVia('native')} className="share-option">
                  <i className="fas fa-share-alt"></i>
                  <span>Native Share</span>
                </button>
                
                <button onClick={() => shareVia('facebook')} className="share-option">
                  <i className="fab fa-facebook"></i>
                  <span>Facebook</span>
                </button>
                
                <button onClick={() => shareVia('twitter')} className="share-option">
                  <i className="fab fa-twitter"></i>
                  <span>Twitter</span>
                </button>
                
                <button onClick={() => shareVia('whatsapp')} className="share-option">
                  <i className="fab fa-whatsapp"></i>
                  <span>WhatsApp</span>
                </button>
                
                <button onClick={() => shareVia('email')} className="share-option">
                  <i className="fas fa-envelope"></i>
                  <span>Email</span>
                </button>
                
                <button onClick={() => shareVia('copy')} className="share-option">
                  <i className="fas fa-copy"></i>
                  <span>Copy Link</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Emergency Notice */}
        <div className="emergency-notice">
          <div className="emergency-notice-content">
            <i className="fas fa-exclamation-triangle"></i>
            <div>
              <h4>Important Notice</h4>
              <p>This information is for educational purposes only. Always consult with your healthcare provider for personalized medical advice.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthHub;