# 🚗 Extended Drowsiness Detection: Speed Limiter

---

## 📌 Problem Statement
Drivers often feel **fatigued or drowsy** during long journeys, late-night drives, or monotonous road conditions.  
Traditional systems only **alert drivers with warnings**, which are sometimes ignored.  
This increases the risk of **accidents caused by reduced alertness, lane drifting, and overspeeding**.  

There is a need for a **proactive safety mechanism** that not only detects drowsiness but also **actively enforces speed control** until the driver is alert again.  

---

## ✅ Solution
- An **intelligent safety feature** that goes beyond alerts.  
- When drowsiness is detected → the system **enforces a virtual speed limiter (40 km/h)**.  
- **Dashboard UI** shows capped speed, warning banner, and ETA adjustments.  
- **Route Planner** highlights safe rest stops and adjusts travel time.  
- **Gamified Demo Mode**: Simulate drowsiness with one click.  
- Future-ready for **integration with ADAS & ECU** in real vehicles.  

---

## 🏗️ Architecture
1. **Sensing Layer** → Driver monitoring (camera + ML), vehicle telemetry (speed, GPS).  
2. **Decision Layer** → AI model detects drowsiness, triggers limiter.  
3. **Action Layer** → Speed cap applied, ETA recalculated, rest stops suggested.  
4. **Feedback Layer** → Continuous monitoring until driver is alert.  

---

## 🛠️ Technology Used
- **Frontend**: React.js, Recharts/D3.js, Map APIs (Google Maps / Mapbox)  
- **Backend**: Node.js / Python (Flask/Django)  
- **AI/ML**: OpenCV, TensorFlow/PyTorch for real-time drowsiness detection  
- **Database & Cloud**: MongoDB, AWS/Azure for trip history & fleet analytics  
- **Future Integration**: ADAS, ECU, Adaptive Cruise Control  

---

## 🌟 Features / USP
- Proactive **speed limiter enforcement** (not just alerts)  
- Real-time **ETA adjustment** & rest stop recommendations  
- **Gamified demo mode** for interactive simulation  
- Scalable design for **connected car ecosystems**  

---

## 🚀 Future Scope
- Full **ADAS integration** (lane-keeping, cruise control)  
- **V2X communication** for sharing driver state with nearby cars  
- Edge deployment on **in-car AI hardware** (NVIDIA Jetson, Qualcomm Auto)  

---
