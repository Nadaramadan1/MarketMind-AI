export interface ReportSection {
    id: string;
    title: string;
    content: string;
}

export function parseReportHtml(html: string): ReportSection[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const sections: ReportSection[] = [];

    // The n8n workflow generates HTML where sections are often started by 
    // <div class="headline">TITLE</div> or <h2>TITLE</h2>
    // We need to iterate through the body's children and group them.

    const bodyChildren = Array.from(doc.body.children);
    let currentSection: ReportSection | null = null;
    let sectionCounter = 0;

    // Helper to start a new section
    const startNewSection = (title: string, _element: Element) => {
        if (currentSection) {
            sections.push(currentSection);
        }
        sectionCounter++;
        currentSection = {
            id: `section-${sectionCounter}`,
            title: title || `Section ${sectionCounter}`,
            content: ''
        };
        // Don't add the title element to the content of the new section, 
        // as it will be displayed as the card header.
    };

    bodyChildren.forEach((child) => {
        const className = child.className || '';
        const tagName = child.tagName.toLowerCase();
        const textContent = child.textContent?.trim() || '';

        // Identify Section Headers
        // Case 1: <div class="headline">...</div>
        if (className.includes('headline')) {
            startNewSection(textContent, child);
            return;
        }

        // Case 2: <h2>...</h2> or <h3>...</h3> (if used as top level separators)
        // We'll treat h2 as primary section breaks if they aren't 'headline' classes
        if (tagName === 'h2') {
            startNewSection(textContent, child);
            return;
        }

        // Special Case: "Executive Summary" often appears at the top without a specific class
        // If we are at the start and haven't found a section yet, create a default "Introduction" or "Executive Summary"
        if (!currentSection && textContent.length > 0) {
            currentSection = {
                id: 'section-intro',
                title: 'Executive Summary',
                content: ''
            };
        }

        // Add content to current section
        if (currentSection) {
            currentSection.content += child.outerHTML;
        }
    });

    // Push the last section
    if (currentSection) {
        sections.push(currentSection);
    }

    // Fallback: If no sections were detected (e.g. flat HTML), return the whole thing as one section
    if (sections.length === 0 && html.length > 0) {
        sections.push({
            id: 'section-full',
            title: 'Full Report',
            content: html
        });
    }

    return sections;
}
