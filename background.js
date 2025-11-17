chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: addPrintCSS
  });
});

async function addPrintCSS() {
    const customStyles = `
    @media print {
        body {
            color: #000 !important;
            background-color: #fff !important;
        }
        div.w-full {
            background-color: #fff !important;
            overflow: visible;
        }
        div.flex-row:has([data-testid=user-message]) {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color: #000 !important;
            background-color: #eee !important;
            border-radius: 10px;
            padding-right: 10px;
        }
        div:has([data-test-render-count]) {
            display: inline-block;
            width: 100%;
            margin-left: 20px;
        }
        div[data-test-render-count] {
            display: inline-block;
            width: 100%;
            z-index: 1000 !important;
        }
        div[data-test-render-count] * {
            z-index: 1000 !important;
            break-inside: avoid !important;
            opacity: 1.0 !important;
            font-size: 1rem;
            line-height: 1.75rem;
        }
        div:has([data-test-render-count]) * .katex-display {
            font-size: 1rem;
        }
        div:has([data-test-render-count]) * .katex-display * {
            font-size: inherited;
        }
        :not(.katex) code:not(.katex *), :not(.katex) span:not(.katex *) {
            white-space: pre-wrap !important;
            overflow-wrap: break-word !important;
        }
        :not(.katex) .overflow-auto:not(.katex *), :not(.katex *) .overflow-auto {
            overflow: visible !important;
        }
        :not(.katex) .h-full:not(.katex *), :not(.katex *) .h-full {
            height: auto !important;
        }
        :not(.katex) #text:not(.katex *), :not(.katex *) #text {
            white-space: pre-wrap !important;
        }
        a[data-skip-to-content], #thread-bottom-container, #stage-slideover-sidebar {
            display: none;
        }
        * {
            scrollbar-width: none;
        }
        div.shrink-0:has(.z-sidebar) {
            display: none;
        }
        /*
        div.pt-3.pb-3,
        div.pt-2.pb-3 {
            display: none;
        }
        */
        a span.bg-gradient-to-r {
            display: none;
        }
        a span.font-small span.font-normal {
            font: mono !important;
            font-size: .5em !important;
            background-color: #f6f6f6 !important;
        }
        header.sticky.top-0 div.font-base-bold {
            font-size: 1.25rem !important;
            line-height: 1.5rem;
            font-weight: 700;
        }
        header.sticky.top-0 svg {
            display: none;
        }
        header.sticky.top-0 div.pl-1 {
            display: none;
        }
        header.sticky.top-0 div.right-3:has(button) {
            display: none;
        }
        div.sticky.opacity-0 {
            display:none;
        }
        div.sticky.bottom-0 {
            display:none;
        }
        div:has('div.m1-1') {
            display:none;
        }
        div.sticky.pointer-events-none {
            display:none;
        }
            display:none;
        }
        div.text-accent-brand {
            display: none;
        }
        div.tracking-tighter {
            display: none;
        }
        div.leading-normal {
            display: none;
        }
        div.mt-6 {
            display: none;
        }
        button.cursor-pointer {
            display: none;
        }
        div.pointer-events-none {
            display: none;
        }
        div.draggable:has(~ main#main) {
            display: none;
        }
        /* !box-content  flex  flex-col  bg-bg-000  mx-2  md:mx-0  items-stretch  transition-all  duration-200  relative  cursor-text  z-10  rounded-2xl border border-transparent shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%),0_0_0_0.5px_hsla(var(--border-300)/0.15)] hover:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/3.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)] focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)] hover:focus-within:shadow-[0_0.25rem_1.25rem_hsl(var(--always-black)/7.5%),0_0_0_0.5px_hsla(var(--border-200)/0.3)] */
        div {
            --thread-content-max-width: 100% important;
            --thread-content-margin: 0 important;
        }
        pre, pre code {
            color: #000 !important;
            font: mono;
            transform: scale(1);
        }
    }
    `;
    // Claude messes up title for chats in projects
    document.title = document.querySelector('header div.min-w-0').innerText.replaceAll('/','-');
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = customStyles;
    document.head.appendChild(styleSheet);
    window.print();
}

