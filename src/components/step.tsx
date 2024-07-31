    // components/Step.tsx

    import React from 'react';

    interface StepProps {
    currentSectionIndex: number;
    totalSections: number;
    sectionTitles: string[];
    currentQuestionIndex: number;
    questionsInCurrentSection: number;
    }

    const Step: React.FC<StepProps> = ({
    currentSectionIndex,
    totalSections,
    sectionTitles,
    currentQuestionIndex,
    questionsInCurrentSection,
    }) => {
    const openModal = () => {
        const modal = document.getElementById('progress_modal') as HTMLDialogElement;
        if (modal) {
        modal.showModal();
        }
    };

    const closeModal = () => {
        const modal = document.getElementById('progress_modal') as HTMLDialogElement;
        if (modal) {
        modal.close();
        }
    };

    const handleModalClick = (event: React.MouseEvent<HTMLDialogElement, MouseEvent>) => {
        // Check if the click happened outside the modal box
        const modal = document.getElementById('progress_modal') as HTMLDialogElement;
        if (modal && event.target === modal) {
        closeModal();
        }
    };

    return (
        <div className="relative">
        {/* Desktop View */}
        <div className="hidden lg:block">
            <ul className="steps steps-horizontal">
            {sectionTitles.map((title, index) => (
                <li
                key={index}
                className={`step ${index < currentSectionIndex ? 'step-primary' : ''} ${index === currentSectionIndex ? 'step-active' : ''}`}
                >
                <p className='text-xs'>{title}</p>
                </li>
            ))}
            </ul>
        </div>

        {/* Mobile View */}
        <div className=" lg:hidden pt-4 pb-4">
            <button className="btn w-[80vw] btn-primary btn-sm" onClick={openModal}>
            查看進度
            </button>
            <dialog id="progress_modal" className="modal modal-bottom sm:modal-middle" onClick={handleModalClick}>
            <div className="modal-box">
                <h3 className="font-bold text-lg">進度</h3>
                <ul className="steps steps-vertical">
                {sectionTitles.map((title, index) => (
                    <li
                    key={index}
                    className={`step ${index < currentSectionIndex ? 'step-primary' : ''} ${index === currentSectionIndex ? 'step-active' : ''}`}
                    >
                    {title}
                    </li>
                ))}
                </ul>
                <div className="modal-action">
                <form method="dialog">
                    <button className="btn">關閉</button>
                </form>
                </div>
            </div>
            </dialog>
        </div>
        </div>
    );
    };

    export default Step;
