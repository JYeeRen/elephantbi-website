import React from 'react';
import styles from './index.less'

const ServiceHeadSection = () => {
  return (
    <div className={styles.container}>
      <div className={styles.title} />
      <div className={styles.firstLevelContent}>服务支持</div>
      <div className={styles.secondLevelContent}>大象BI拥有专业的商务团队和技术支持团队，将为您提供专业的服务</div>
      <div className={styles.actionButton} />
    </div>
  )
}

export default ServiceHeadSection