## A Comparative Review of AI Applications in Brain Tumor Imaging: Advancements, Biases, and Future Directions

**Introduction**

Brain tumors pose a significant diagnostic and therapeutic challenge, necessitating innovative approaches for improved patient outcomes. Artificial intelligence (AI), particularly machine learning (ML) and deep learning (DL), has emerged as a promising tool in medical imaging, offering the potential to enhance lesion detection, segmentation, diagnosis, and prognostication. This review comparatively analyzes two recent research papers focusing on AI applications in brain tumor imaging: "Role of Artificial Intelligence in Brain Tumour Imaging" by Chukwujindu et al. (2024) and "An artificial intelligence framework and its bias for brain tumor segmentation: A narrative review" by Das et al. (2022). While both papers acknowledge the transformative potential of AI, they differ in their scope, methodology, and specific focus areas. Chukwujindu et al. (2024) provide a broad overview of AI applications across various aspects of brain tumor imaging, including non-glioma tumors and the emerging role of transformer networks. Das et al. (2022), conversely, delve into the intricacies of brain tumor segmentation (BTS), with a specific emphasis on analyzing and mitigating biases within DL-based segmentation models.

**Comparison of Findings and Methodologies**

Chukwujindu et al. (2024) employ a literature review and synthesis approach, providing a descriptive overview of AI-based models and their diverse applications in brain tumor imaging. Their findings highlight AI's ability to enhance the diagnosis of small lesions using various imaging modalities like MRI, CT, and PET scans. The study emphasizes the transformation of radiological image analysis into a quantifiable task through AI-driven feature extraction and notes the potential of transformer networks in neuro-oncology imaging. This broad perspective allows for a comprehensive understanding of the current landscape of AI in brain tumor imaging. The paper suggests the utility of AI in improving diagnostic accuracy in detecting small metastatic brain lesions which can lead to the development of CAD tools, supporting the work done by Cè (2023), which highlights the potential of AI in personalized medicine.

Das et al. (2022), on the other hand, adopt a systematic review methodology, adhering to the PRISMA guidelines. Their analysis encompasses 75 relevant studies identified through PubMed, Scopus, and Google Scholar. This paper categorizes DL studies into four architectural classes: convolutional neural network (CNN)-based, encoder-decoder (ED)-based, transfer learning (TL)-based, and hybrid DL (HDL)-based architectures. A key finding of Das et al. (2022) is the performance ranking of these architectures in BTS, with TL models demonstrating the best performance, followed by ED, CNN, and HDL models. Furthermore, their risk-of-bias (RoB) analysis, based on 32 AI attributes, reveals that ED-based models exhibit the lowest AI bias for BLS. This detailed analysis provides valuable insights into the strengths and weaknesses of different DL architectures for BTS, highlighting the critical importance of addressing AI bias to ensure reliable and accurate segmentation results. It also takes into account previous research done by Karimi, D et al. (2021) in medical image segmentation.

The methodologies employed by the two papers reflect their respective scopes. Chukwujindu et al. (2024) offer a broad overview suitable for readers seeking a general understanding of AI applications in brain tumor imaging. Das et al. (2022) provide a more focused and rigorous analysis, catering to researchers and practitioners interested in the specific challenges and opportunities associated with DL-based BTS.

**Discussion of Contradictions, Gaps, and Future Research Implications**

While both papers champion the role of AI, they do not present direct contradictions. However, their differing focuses reveal certain nuances and potential gaps. For instance, Chukwujindu et al. (2024) emphasize the general applicability of AI across various tumor types and imaging modalities, while Das et al. (2022) concentrate specifically on gliomas and DL architectures. This difference underscores the need for more research to bridge the gap between broad AI applications and specific tumor-related challenges.

One notable gap lies in the limited discussion of explainability and interpretability of AI models in both papers. While Das et al. (2022) address bias, understanding *why* a model makes a particular prediction is crucial for clinical acceptance and trust. Future research should focus on developing explainable AI (XAI) techniques to enhance the transparency and interpretability of DL models for brain tumor imaging. This could involve techniques such as attention maps or rule extraction to provide clinicians with insights into the model's decision-making process.

Furthermore, both papers acknowledge the potential for personalized medicine but do not delve deeply into the challenges of adapting AI models to individual patient characteristics. Factors such as age, genetic background, and pre-existing conditions can significantly influence tumor behavior and treatment response. Future research should explore methods for incorporating patient-specific data into AI models to improve their accuracy and predictive power. This may involve developing federated learning approaches that allow models to be trained on decentralized data sources without compromising patient privacy.

**Conclusion**

Both Chukwujindu et al. (2024) and Das et al. (2022) contribute valuable insights into the burgeoning field of AI in brain tumor imaging. Chukwujindu et al. (2024) offer a broad perspective on the diverse applications of AI, highlighting its potential to improve diagnosis, prognostication, and treatment planning. Das et al. (2022) provide a more focused and rigorous analysis of DL-based BTS, emphasizing the importance of addressing AI bias and selecting appropriate architectural models. The review highlights the potential of AI in brain tumour imaging which is supported by Aneja, S. et al. (2019).

By synthesizing the findings of these two papers, we gain a more comprehensive understanding of the current state and future directions of AI in brain tumor imaging. While AI holds immense promise for improving patient outcomes, it is crucial to address the challenges of bias, explainability, and personalization. Future research should focus on developing more transparent, interpretable, and patient-specific AI models to fully realize the potential of this transformative technology in the fight against brain tumors. The use of AI will continue to become more prominent as Tandel, G.S. et al. (2020) found in their research, AI is transforming the way that the healthcare system diagnoses diseases and can classify tumors more accurately.

**References**

*   Aneja, S. et al. (2019). Applications of artificial intelligence in neuro-oncology. *Curr Opin Neurol*
*   Aslam, A. et al. (2015). Improved edge detection algorithm for brain tumor segmentation. *Procedia Comput. Sci.*
*   Bacchi, S. et al. (2019). Deep learning in the detection of high-grade glioma recurrence using multiple MRI sequences: a pilot study. *J. Clin. Neurosci.*
*   Bonte, S. et al. (2018). Machine learning based brain tumour segmentation on limited data using local texture and abnormality. *Comput. Biol. Med.*
*   Cè, M. (2023). Artificial intelligence in brain tumor imaging: a step toward personalized medicine. *Current Oncology*.
*   Chang, H.-H. et al. (2008). An electrostatic deformable model for medical image segmentation. *Comput. Med. Imag. Graph.*
*   Chukwujindu, E. et al. (2024). Role of artificial intelligence in brain tumour imaging. *European Journal of Radiology*.
*   Das, S. et al. (2022). An artificial intelligence framework and its bias for brain tumor segmentation: A narrative review. *Computers in Biology and Medicine*.
*   Grech, N. et al. (2020). Rising incidence of glioblastoma multiforme in a well-defined population. *Cureus*
*   Ilhan, U. et al. (2017). Brain tumor segmentation based on a new threshold approach. *Procedia Comput. Sci.*
*   Kamnitsas, K. et al. (2017). Efficient multi-scale 3D CNN with fully connected CRF for accurate brain lesion segmentation. *Med. Image Anal.*
*   Karimi, D. et al. (2021). Transfer learning in medical image segmentation: new insights from analysis of the dynamics of model parameters and learned representations. *Artif. Intell. Med.*
*   Machado, L.F. et al. (2020). MRI radiomics for the prediction of recurrence in patients with clinically non-functioning pituitary macroadenomas. *Comput Biol Med*
*   Rowe, M. (2019). An introduction to machine learning for clinicians. *Academic Medicine*
*   Soltaninejad, M. (2018). Supervised learning based multimodal MRI brain tumour segmentation using texture features from supervoxels. *Comput. Methods Progr. Biomed.*
*   Tandel, G.S. et al. (2020). Multiclass magnetic resonance imaging brain tumor classification using artificial intelligence paradigm. *Comput Biol Med*
*   Thapaliya, K. et al. (2013). Level set method with automatic selective local statistics for brain tumor segmentation in MR images. *Comput. Med. Imag. Graph.*
*   Wadhwa, A. et al. (2019). A review on brain tumor segmentation of MRI images. *Magn. Reson. Imaging*
*   Wesseling, P. et al. (2018). WHO 2016 Classification of gliomas. *Neuropathol Appl Neurobiol*
*   Yang, Y. (2021). A comparative analysis of eleven neural networks architectures for small datasets of lung images of COVID-19 patients toward improved clinical decisions. *Comput Biol Med*
*   Zhu, M. (2022). Artificial intelligence in the radiomic analysis of glioblastomas: A review, taxonomy, and perspective. *Front Oncol*