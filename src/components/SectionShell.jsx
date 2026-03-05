import { motion } from 'framer-motion';

function SectionShell({ id, children, className = '', withTransition = true }) {
  return (
    <motion.section
      id={id}
      className={`section-block ${className}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {withTransition ? (
        <>
          <motion.div
            className="section-divider origin-center"
            initial={{ opacity: 0, scaleX: 0.55 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          />
          <motion.div
            className="section-divider-glow"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.9 }}
            viewport={{ once: true, amount: 0.55 }}
            transition={{ duration: 1.1, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          />
        </>
      ) : null}
      {children}
    </motion.section>
  );
}

export default SectionShell;
