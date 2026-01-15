// ============================================================================
// Section Editors - Index
// ============================================================================
// Exports all section editor components for resume/profile editing.
// These components provide CRUD operations for various profile sections.
// ============================================================================

// Types
export type {
 SectionEditorProps,
 SectionListEditorProps,
 WithId,
 DateRange,
} from "./types";

// Base Components
export {
 SectionEditorContainer,
 SectionItemCard,
 BaseSectionListEditor,
 type SectionEditorContainerProps,
 type SectionItemCardProps,
 type BaseSectionListEditorProps,
} from "./BaseSectionEditor";

// Experience Editor
export {
 ExperienceEditor,
 ExperienceForm,
 type ExperienceItem,
 type ExperienceEditorProps,
} from "./ExperienceEditor";

// Education Editor
export {
 EducationEditor,
 EducationForm,
 type EducationItem,
 type EducationEditorProps,
} from "./EducationEditor";

// Skills Editor
export {
 SkillsEditor,
 SkillBadge,
 SkillForm,
 type SkillItem,
 type SkillLevel,
 type SkillsEditorProps,
} from "./SkillsEditor";

// Language Editor
export {
 LanguageEditor,
 LanguageForm,
 type LanguageItem,
 type LanguageProficiency,
 type LanguageEditorProps,
} from "./LanguageEditor";

// Certification Editor
export {
 CertificationEditor,
 CertificationForm,
 type CertificationItem,
 type CertificationEditorProps,
} from "./CertificationEditor";

// Project Editor
export {
 ProjectEditor,
 ProjectForm,
 type ProjectItem,
 type ProjectStatus,
 type ProjectEditorProps,
} from "./ProjectEditor";

// Award Editor
export {
 AwardEditor,
 AwardForm,
 type AwardItem,
 type AwardEditorProps,
} from "./AwardEditor";

// Publication Editor
export {
 PublicationEditor,
 PublicationForm,
 type PublicationItem,
 type PublicationType,
 type PublicationEditorProps,
} from "./PublicationEditor";

// Interest Editor
export {
 InterestEditor,
 InterestForm,
 categoryColors as interestCategoryColors,
 type InterestItem,
 type InterestEditorProps,
} from "./InterestEditor";

// Open Source Editor
export {
 OpenSourceEditor,
 OpenSourceForm,
 roleLabels as contributionRoleLabels,
 roleColors as contributionRoleColors,
 type OpenSourceItem,
 type ContributionRole,
 type OpenSourceEditorProps,
} from "./OpenSourceEditor";

// Talk Editor
export {
 TalkEditor,
 TalkForm,
 type TalkItem,
 type TalkType,
 type TalkEditorProps,
} from "./TalkEditor";
