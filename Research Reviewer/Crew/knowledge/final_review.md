## A Comparative Review of AI Applications in Brain Tumor Imaging and Segmentation

### Introduction

Artificial intelligence (AI), particularly machine learning (ML) and deep learning (DL), is rapidly transforming medical imaging. Both review papers under consideration here explore the role of AI in brain tumor imaging. The first paper, "Role of Artificial Intelligence in Brain Tumour Imaging" (hereafter referred to as *Paper 1*), provides a broad overview of AI applications, encompassing lesion detection, differential diagnosis, anatomic segmentation, molecular marker identification, prognostication, and pseudo-progression evaluation. The second paper, "An artificial intelligence framework and its bias for brain tumor segmentation: A narrative review" (hereafter referred to as *Paper 2*), narrows its focus to brain tumor segmentation (BTS) and delves into the critical issue of bias within AI architectures. While both acknowledge the transformative potential of AI, they differ in scope and methodological approach, offering complementary perspectives on the current state and future directions of AI in neuro-oncology.

### Comparative Analysis of Findings and Methodologies

*Paper 1* adopts a broad review strategy, surveying the existing literature on AI applications across various aspects of brain tumor imaging. It highlights the utility of AI in improving the detection of small lesions using different modalities such as MRI, CT, and PET scans. The paper emphasizes how AI-driven extraction of imaging features can revolutionize radiological image analysis and notes the promising role of transformers in neuro-oncology imaging. It cites examples such as the use of CAD tools improving the detection of metastatic brain lesions. In contrast, *Paper 2* employs a systematic review methodology (PRISMA) to analyze the application of DL in BTS. This paper categorizes DL studies based on their architectural evolution into four classes: CNN-based, encoder-decoder (ED)-based, transfer learning (TL)-based, and hybrid DL (HDL)-based architectures. A key aspect of *Paper 2* is its quantitative bias analysis, using a ranking score method (RSM) to evaluate bias based on 32 AI attributes. This allows for a more granular understanding of the strengths and weaknesses of different architectural approaches.

The findings of the two papers also reflect their differing scopes. *Paper 1* concludes that AI holds immense potential for improving diagnostic accuracy, treatment planning, and personalized medicine in brain tumor management. *Paper 2* concludes that DL is indeed an efficient AI technique in BTS, but provides a more nuanced perspective by ranking the performance of the different architectural models (TL > ED > CNN > HDL) and identifying ED-based models as having the lowest AI bias.

### Contrasting Perspectives on Bias and Architectural Choices

A significant difference between the two papers lies in their treatment of bias. *Paper 2* makes bias a central focus, arguing that understanding and mitigating bias is crucial for the reliable deployment of AI in clinical practice. This paper proposes primary and secondary recommendations for lowering the risk of bias. While *Paper 1* acknowledges the importance of data quality and generalizability, it does not conduct a formal bias analysis. This highlights a critical gap in the broader literature, which *Paper 2* directly addresses.

The papers also offer different levels of detail regarding specific AI architectures. *Paper 1* mentions Convolutional Neural Networks (CNNs) and Vision Transformers (ViTs) as promising techniques. *Paper 2*, however, provides a more detailed comparative analysis of CNN, ED, TL, and HDL architectures, drawing from a selection of 75 studies. This detailed analysis allows for more specific recommendations about which architectures are best suited for BTS and how to minimize bias. For example, the study by Kamnitsas et al. (2017) likely contributed to the understanding of CNN architectures, while the work of Soltaninejad (2018) may have influenced the discussion on encoder-decoder models. Furthermore, the research from Wadhwa et al. (2019) probably played a role in understanding bias within these AI frameworks.

### Overlapping Themes and Converging Conclusions

Despite their differences, both papers converge on several key themes. Both emphasize the growing role of AI, particularly deep learning, in brain tumor imaging. They acknowledge the potential for AI to improve diagnostic accuracy, treatment planning, and personalized medicine. Segmentation is identified as a core application area, and both acknowledge the challenges of data quality, standardization, and generalizability.

### Gaps and Future Research Implications

The review of these two papers reveals several important gaps and implications for future research. The focus on bias in *Paper 2* highlights the need for more research into how to detect and mitigate bias in AI models for medical imaging. Future studies should explore the sources of bias in these models, such as biased training data or algorithmic biases, and develop strategies for addressing these issues. The need for high-quality, standardized data is also paramount. As noted in both papers, the performance of AI models depends heavily on the quality and representativeness of the data they are trained on. Future research should focus on developing methods for creating and sharing high-quality datasets for brain tumor imaging.

Furthermore, the architectural comparison in *Paper 2* suggests the need for more research into the optimal design of DL models for BTS. While TL-based models performed best in the study, more research is needed to understand why these models are so effective and how they can be further improved. Hybrid DL (HDL)-based models, on the other hand, performed the worst, indicating a need for further investigation into their limitations.

### Conclusion

In conclusion, both "Role of Artificial Intelligence in Brain Tumour Imaging" and "An artificial intelligence framework and its bias for brain tumor segmentation: A narrative review" provide valuable insights into the application of AI in brain tumor imaging. *Paper 1* offers a broad overview of the field, highlighting the potential of AI to improve various aspects of diagnosis and treatment. *Paper 2* provides a more focused and in-depth analysis of brain tumor segmentation, with a particular emphasis on the critical issue of bias. By addressing the challenges of data quality, bias, and architectural optimization, researchers can unlock the full potential of AI to improve the lives of patients with brain tumors. Both papers implicitly suggest that future research should focus on improving data quality, developing robust and generalizable models, and addressing potential biases in AI algorithms. The work of researchers such as Tandel et al. (2020) and Yang (2021), cited in *Paper 1*, alongside Wadhwa et al. (2019) and Karimi et al. (2021), cited in *Paper 2*, collectively underscore the multifaceted advancements and challenges in this rapidly evolving field. Ultimately, continued research and collaboration will be essential to translate the promise of AI into tangible benefits for patients.

### References

*   Aneja et al. (2019)
*   Aslam et al. (2015)
*   Bacchi et al. (2019)
*   Bonte et al. (2018)
*   Cè (2023)
*   Chang et al. (2008)
*   Grech et al. (2020)
*   Ilhan et al. (2017)
*   Kamnitsas et al. (2017)
*   Karimi et al. (2021)
*   Machado et al. (2020)
*   Price (2006)
*   Rowe (2019)
*   Soltaninejad (2018)
*   Tandel et al. (2020)
*   Thapaliya et al. (2013)
*   Wadhwa et al. (2019)
*   Wesseling et al. (2018)
*   Yang (2021)
*   Zhu (2022)