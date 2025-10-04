# 🚀 ExoDiscover AI (https://nasa-tabnet-exoplanet.vercel.app/)

**2025 NASA Space Apps Challenge Solution**<br>
*Challenge: "A World Away: Hunting for Exoplanets with AI"*

[![Team Virsys](https://img.shields.io/badge/Team-Virsys-blue?style=for-the-badge&logo=team&logoColor=white)]()
[![Location](https://img.shields.io/badge/Dhaka-Bangladesh-green?style=for-the-badge)]()
[![NASA Space Apps](https://img.shields.io/badge/NASA-Space%20Apps%20Challenge-red?style=for-the-badge&logo=nasa&logoColor=white)]()

---

## 🌟 Project Overview

**ExoDiscover AI** is an advanced machine learning platform that revolutionizes exoplanet discovery through artificial intelligence. Our solution addresses NASA's critical challenge of identifying genuine exoplanets from observed transit survey.

### 🎯 **NASA Space Apps Challenge 2025 Solution**

#### **Challenge: "A World Away: Hunting for Exoplanets with AI"**

**The Problem:** Manual exoplanet identification from transit survey missions (Kepler, K2, TESS) is extremely labor-intensive and time-consuming for NASA scientists. Despite decades of data collection and advances in machine learning, much of this analysis still requires manual review by astrophysicists.

**Our Solution:** ExoDiscover AI directly addresses this challenge by providing an automated, AI-powered classification system that relieves scientists from the burdensome manual identification process.

#### **🤖 How We Solved the Challenge:**

**✅ Automated Classification System**
- **Trained on NASA datasets** from Kepler, K2, and TESS missions
- **TabNet deep learning architecture** optimized for tabular astronomical data
- **Binary classification** distinguishing confirmed exoplanets from false positives
- **Real-time predictions** eliminating manual review bottlenecks

**✅ Interactive Web Interface**

- **Realtime Exoplanet Classification with  AI Model using observed data**
- **Ranking 8031 Candidate Plannet Data based on probabilty being confirmed by our Model**
- **Representing which orbservation variables / features are more important to identify exoplannet**


**✅ Comprehensive Analysis Pipeline**
- **8,031 candidates processed** from NASA Exoplanet Archive
- **Feature importance analysis** by using Tabnet's feature_important matrix to **figure out which obersvation variable (planet radius, transition period etc) are more important to identify a exoplanet**
- **Confidence scoring** providing decision-making support
- **Scalable architecture** ready for future mission data

#### **🚀 Challenge Objectives Addressed:**

| **Challenge Requirement** | **Our Implementation** |
|---------------------------|------------------------|
| **AI/ML model trained on NASA datasets** | ✅ TabNet model trained on official NASA Exoplanet Archive data |
| **Web interface for user interaction** | ✅ Professional React-based platform with live AI inference |
| **Analyze data to identify new exoplanets** | ✅ Processes 8K+ candidates with high accuracy |
| **Allow manual data entry** | ✅ Interactive sliders for custom stellar parameters |
| **Consider data variables impact** | ✅ Observation vaiable  importance analysis of 11 key parameters |
| **Preprocessing and model choice** | ✅ Optimized TabNet with proper data preprocessing |

#### **🌟 Impact on Astronomical Research:**

**Before ExoDiscover AI:**
- Scientists spend weeks/months manually reviewing candidates
- Limited telescope time for follow-up observations
- Slow exoplanet discovery rate
- Bottleneck in processing large datasets

**After ExoDiscover AI:**
- **Instant AI classification** of exoplanet candidates
- **Prioritized observation targets** based on AI confidence scores
- **Accelerated discovery pipeline** for new exoplanets
- **Scientist time freed** for higher-level research and analysis

#### **🔬 Scientific Methodology:**

Our solution follows the complete machine learning pipeline used in astronomical research:
1. **Data Acquisition** from official NASA Exoplanet Archive
2. **Preprocessing** handling missing values and feature engineering
3. **Model Training** with cross-validation and performance optimization
4. **Feature Analysis** understanding which stellar parameters drive predictions
5. **Web Deployment** making AI accessible to the scientific community
6. **Interactive Tools** enabling hypothesis testing and exploration

**Result:** A production-ready AI system that transforms how astronomers approach exoplanet candidate classification, directly addressing NASA's challenge to automate the identification process and accelerate discoveries.

---

## 📋 Project Description

**ExoDiscover AI** is a NASA Space Apps Challenge solution that automates exoplanet candidate classification from transit survey data using advanced AI. We trained a TabNet model on NASA's Kepler, K2, and TESS datasets to distinguish confirmed exoplanets from false positives. The TabNet's built-in feature importance analysis reveals which astronomical variables (orbital period, planet radius, stellar temperature, etc.) are most critical for accurate detection. Our interactive web interface enables real-time AI inference, allowing astronomers to input stellar parameters and receive instant predictions. We deployed this model on 8,031 exoplanet candidates from NASA's archive, finding which candidate planet observation data has high chance of being an exoplanet and ranking them based on that probabilty.

---

## 👥 Team Virsys

**Location:** Dhaka, Bangladesh

We are **Team Virsys**, a passionate group of AI and astronomy enthusiasts from Bangladesh, united by our shared vision to contribute to space exploration through innovative technology. Our diverse backgrounds in machine learning, software engineering, and data science enable us to tackle complex astronomical challenges with cutting-edge solutions.

### Our Mission
To democratize exoplanet discovery by making advanced AI tools accessible to astronomers worldwide, accelerating humanity's understanding of our place in the cosmos.

---


### 📡 **NASA Data Sources**

Our project utilizes **official NASA Exoplanet Archive** datasets for training and analysis:

#### **🔗 Primary Data Sources:**
- **🌟 Cumulative Archive:** [Kepler Objects of Interest (KOI)](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=cumulative)
  - Comprehensive database of confirmed exoplanet discoveries from Keplar project

- **🛰️ TESS Objects of Interest (TOI):** [TOI Catalog](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=TOI)
  - TESS mission planet candidates requiring classification
  - Primary source for unconfirmed exoplanet candidates

- **🔭 K2 Campaign Data:** [K2 Planets and Candidates](https://exoplanetarchive.ipac.caltech.edu/cgi-bin/TblView/nph-tblView?app=ExoTbls&config=k2pandc)
  - Kepler K2 mission exoplanet candidates
  - Additional training data for model robustness

#### **📊 Data Utilization:**
- **Training Dataset:** Curated from confirmed exoplanets and false positives
- **Test Dataset:** 8,031 unconfirmed candidates from TOI catalog
- **Validation:** Cross-referenced across all three NASA archives
- **Real-time Access:** Live integration with NASA Exoplanet Archive APIs
 ---

## 🏆  Success Metrics

### 📊 Impressive Results
- **✅ 8,031 Exoplanet Candidates Analyzed** - We use our model to identify candidate with large probabilty of being an exoplanet and ranked them in website
- **✅ TabNet Architecture** - State-of-the-art deep learning model which provide high accurecy and alow us to reverse enginner which observation variables are more important for predicting a exoplanet
- **✅ Real-time Predictions** - Instant AI-powered classifications 
- **✅ Interactive Web Platform** - User-friendly interface for astronomers

### 🧠 Model Performance
Our TabNet classifier demonstrates exceptional accuracy in distinguishing between:
- **Confirmed Exoplanets** vs **False Positives**
- **High-confidence Predictions** with probability scores
- **Feature Importance Analysis** revealing key stellar parameters

### 🎯 Technical Excellence
- **Advanced ML Pipeline:** Complete training and inference system
- **Scalable Architecture:** Handles large astronomical datasets efficiently
- **Professional UI/UX:** NASA-scientist-friendly interface design
- **Comprehensive Documentation:** Well-structured codebase and workflows

---

## 🚀 Technical Architecture

### 🤖 AI/ML Components

#### **TabNet Classifier**
- **Architecture:** Attention-based neural network optimized for tabular data
- **Training Data:** Curated exoplanet dataset with stellar parameters
- **Performance:** High accuracy in binary classification (Confirmed vs False Positive)
- **Interpretability:** Built-in feature importance analysis

#### **Key Features Used for Classification:**
- **Orbital Period** (66.4% importance)
- **Planet Radius** (158.0% importance)
- **Equilibrium Temperature** (88.3% importance)
- **Insolation Flux** (45.2% importance)
- **Transit Depth** (111.2% importance)
- **Transit Duration** (90.4% importance)
- **Stellar Effective Temperature** (119.2% importance)
- **Stellar Surface Gravity** (81.3% importance)
- **Stellar Radius** (68.2% importance)
- **Right Ascension & Declination** (Coordinate-based analysis)

### 💻 Software Stack

#### **Frontend**
- **Framework:** React with TypeScript
- **Build Tool:** Vike (Vite-based)
- **Styling:** Tailwind CSS + DaisyUI
- **Animation:** Lottie React for professional animations
- **Icons:** Iconify (Lucide icons)

#### **AI/ML Libraries**
- **ONNX Runtime:** Browser-based model inference
- **Pytorch** : Pyhton library for training model

#### **Development Tools**
- **Package Manager:** Bun
- **Linting:** ESLint
- **Deployment:** Vercel-ready configuration

---

## 📁 Project Structure

```
exodiscover-ai/
├── 📂 components/                 # React Components
│   ├── Dashboard.tsx             # Main dashboard with NASA branding
│   ├── ExoplanetPredictor.tsx    # Interactive AI prediction tool
│   ├── ExoplanetTable.tsx        # Candidate prioritization table
│   ├── FeatureImportanceChart.tsx # Model insights visualization
│   └── ...
├── 📂 pages/                     # Vike page configurations
│   ├── +config.ts               # App configuration & metadata
│   ├── index/+Page.tsx          # Main landing page
│   └── ...
├── 📂 notebooks/                 # AI/ML Training Pipeline
│   ├── train_lab.ipynb          # Complete training code
│   ├── tabnet_exoplanet.onnx   # Trained model (ONNX format)
│   ├── tabnet_feature_importances.json # Model insights
│   └── target_encoder.pkl       # Data preprocessing tools
├── 📂 public/                    # Static Assets
│   ├── model/                   # 161 prediction files (8K+ candidates)
│   ├── assets/                  # Lottie animations & media
│   └── ort-wasm-*              # ONNX runtime for browser
└── 📂 layouts/                  # Page layouts & styling
```

### 🔬 Notebooks Directory (`/notebooks/`)

Our comprehensive AI training pipeline includes:

#### **`train_lab.ipynb`** - Complete Training Pipeline
- **Data preprocessing** and feature engineering
- **TabNet model training** with cross-validation
- **Performance evaluation** and metrics calculation
- **Model serialization** for web deployment
- **Feature importance extraction** for scientific insights

#### **`tabnet_exoplanet.onnx`** - Deployable Model
- **Optimized for inference** in web browsers
- **Compressed and efficient** for fast loading
- **ONNX format** for cross-platform compatibility

#### **`tabnet_feature_importances.json`** - Model Insights
- **Quantitative importance scores** for each stellar parameter
- **Scientific validation** of model decision-making
- **Research insights** for astronomical feature selection

#### **`target_encoder.pkl`** - Data Preprocessing
- **Trained preprocessing pipeline** for stellar parameters
- **Consistent data transformation** between training and inference
- **Handles missing values** and edge cases

---

## 🌟 Key Features

### 🎮 **Interactive Exoplanet Predictor**
- **Real-time AI predictions** based on stellar parameters
- **Interactive sliders** for parameter adjustment
- **Confidence scoring** with probability breakdowns
- **Educational tooltips** explaining each parameter

### 📊 **Feature Importance Visualization**
- **Model interpretability** showing decision drivers
- **Scientific insights** into exoplanet detection
- **Interactive charts** with hover details
- **Research value** for astronomical studies

### 🔍 **NASA Candidate Prioritization**
- **8,031 candidates analyzed** from NASA datasets
- **Smart ranking system** by confirmation probability
- **Advanced search** across all candidates
- **Sortable tables** for scientific analysis
- **Pagination system** for large dataset navigation

### 🚀 **Professional Presentation**
- **Cinematic loading animation** with Lottie rocket
- **NASA-inspired design** with space theme
- **Responsive layout** for all devices
- **Accessibility features** for scientific use

---

## 🛠️ Installation & Setup

### Prerequisites
```bash
# Node.js runtime
bun --version  # or npm/yarn

# Git for version control
git --version
```

### Quick Start
```bash
# Clone the repository
git clone <repository-url>
cd exodiscover-ai

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### 🌐 Access the Application
- **Development:** `http://localhost:3000`
- **Production:** Deployed on Vercel (https://nasa-tabnet-exoplanet.vercel.app/)

---

## 📈 Results & Impact

### 🎯 **Scientific Achievements**

#### **Dataset Scale**
- **Processed 8,031 exoplanet candidates** - Massive astronomical dataset

- **Real-time analysis** - Instant AI-powered classifications

#### **Model Performance**
- **High-accuracy predictions** for exoplanet vs false positive classification
- **Feature importance analysis** revealing key stellar parameters
- **Confidence scoring** enabling astronomer decision-making

#### **Technical Innovation**
- **Browser-based AI inference** using ONNX Runtime
- **Scalable web architecture** handling large datasets
- **Interactive visualization** for scientific exploration

### 🌍 **Broader Impact**

#### **Astronomical Research**
- **Accelerates discovery** by prioritizing promising candidates
- **Optimizes telescope time** for maximum scientific return
- **Democratizes access** to advanced AI tools for astronomers

#### **Educational Value**
- **Interactive learning** about exoplanet detection
- **Scientific methodology** demonstration
- **AI applications** in astronomy showcase

#### **Innovation Recognition**
- **NASA Space Apps Challenge 2025** official submission
- **Bangladesh representation** in global space technology
- **AI-astronomy integration** breakthrough

---

## 🙏 Acknowledgments

### 🏆 **NASA Space Apps Challenge**
Grateful to NASA for organizing this incredible challenge that brings together global innovators to solve real space exploration problems.

### 🌍 **Bangladesh Space Community**
Proud to represent Bangladesh in the international space technology arena and contribute to humanity's understanding of the cosmos.

### 🛠️ **Open Source Community**
Thanks to the developers of React, Vike, ONNX Runtime, Lottie, and all the amazing open-source tools that made this project possible.

### 👨‍🏫 **Our Mentors & Supporters**
Special thanks to our academic advisors and the tech community in Bangladesh for their continuous support and guidance.

---

## 📞 Contact & Links

**Team Virsys** - Dhaka, Bangladesh
- 📧 Email: team.virsys@gmail.com
- 🌐 Project: ExoDiscover AI
- 🚀 Challenge: [NASA Space Apps Challenge 2025](https://www.spaceappschallenge.org)
- 💻 Repository: [GitHub](https://github.com/your-repo/exodiscover-ai)

---

**⭐ Together, we're making exoplanet discovery faster, smarter, and more accessible to astronomers worldwide!**

