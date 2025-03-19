export type WcagPrinciple = {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
  guidelines: WcagGuideline[];
};

export type WcagGuideline = {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
  number?: string;
  criteria: SuccessCriterion[];
};

export type SuccessCriterion = {
  id?: number;
  key?: string;
  name?: string;
  number?: string;
  numberInt?: number | string;
  description?: string;
  level?: string;
  principle?: string;
};

export const wcagPrinciples: WcagPrinciple[] = [
  {
    id: 1,
    key: 'perceivable',
    name: 'Perceivable',
    description:
      'Information and user interface components must be presentable to users in ways they can perceive.',
    guidelines: [
      {
        number: '1.1',
        key: 'text_alternatives',
        name: 'Text Alternatives',
        description:
          'Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.',
        criteria: [
          {
            number: '1.1.1',
            numberInt: '1101',
            key: 'non-text-content',
            name: 'Non-text Content',
            description: 'Provide text alternatives for non-text content.',
            level: 'A',
          },
        ],
      },
      {
        number: '1.2',
        key: 'time_based_media',
        name: 'Time-based Media',
        description: 'Provide alternatives for time-based media.',
        criteria: [
          {
            number: '1.2.1',
            numberInt: '1201',
            key: 'audio-only-and-video-only-prerecorded',
            name: 'Audio-only and Video-only (Prerecorded)',
            description: 'Provide alternatives for time-based media.',
            level: 'A',
          },
          {
            number: '1.2.2',
            numberInt: '1202',
            key: 'captions-prerecorded',
            name: 'Captions (Prerecorded)',
            description:
              'Provide captions for all prerecorded audio content in synchronized media.',
            level: 'A',
          },
          {
            number: '1.2.3',
            numberInt: '1203',
            key: 'audio-description-or-media-alternative-prerecorded',
            name: 'Audio Description or Media Alternative (Prerecorded)',
            description:
              'Provide audio description for all prerecorded video content in synchronized media.',
            level: 'AA',
          },
          {
            number: '1.2.4',
            numberInt: '1204',
            key: 'captions-live',
            name: 'Captions (Live)',
            description:
              'Provide captions for all live audio content in synchronized media.',
            level: 'AA',
          },
          {
            number: '1.2.5',
            numberInt: '1205',
            key: 'audio-description-prerecorded',
            name: 'Audio Description (Prerecorded)',
            description:
              'Provide audio description for all prerecorded video content.',
            level: 'AA',
          },
          {
            number: '1.2.6',
            numberInt: '1206',
            key: 'sign-language-prerecorded',
            name: 'Sign Language (Prerecorded)',
            description:
              'Sign language interpretation is provided for all prerecorded audio content in synchronized media.',
            level: 'AAA',
          },
          {
            number: '1.2.7',
            numberInt: '1207',
            key: 'extended-audio-description-prerecorded',
            name: 'Extended Audio Description (Prerecorded)',
            description:
              'Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.',
            level: 'AAA',
          },
          {
            number: '1.2.8',
            numberInt: '1208',
            key: 'media-alternative-prerecorded',
            name: 'Media Alternative (Prerecorded)',
            description:
              'An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.',
            level: 'AAA',
          },
          {
            number: '1.2.9',
            numberInt: '1209',
            key: 'audio-only-live',
            name: 'Audio-only (Live)',
            description:
              'An alternative for time-based media that presents equivalent information for live audio-only content is provided.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '1.3',
        key: 'adaptable',
        name: 'Adaptable',
        description:
          'Create content that can be presented in different ways (for example simpler layout) without losing information or structure.',
        criteria: [
          {
            number: '1.3.1',
            numberInt: '1301',
            key: 'info-and-relationships',
            name: 'Info and Relationships',
            description:
              'Information and relationships conveyed through presentation can be programmatically determined.',
            level: 'A',
          },
          {
            number: '1.3.2',
            numberInt: '1302',
            key: 'meaningful-sequence',
            name: 'Meaningful Sequence',
            description: 'Content is presented in a meaningful order.',
            level: 'A',
          },
          {
            number: '1.3.3',
            numberInt: '1303',
            key: 'sensory-characteristics',
            name: 'Sensory Characteristics',
            description:
              'Instructions provided for understanding and operating content do not rely solely on sensory characteristics.',
            level: 'A',
          },
          {
            number: '1.3.4',
            numberInt: '1304',
            key: 'orientation',
            name: 'Orientation',
            description:
              'You should be able to rotate your screen without losing any content.',
            level: 'AA',
          },
          {
            number: '1.3.5',
            numberInt: '1305',
            key: 'identify-input-purpose',
            name: 'Identify Input Purpose',
            description:
              'The purpose of each input field collecting user data can be programmatically determined.',
            level: 'AA',
          },
          {
            number: '1.3.6',
            numberInt: '1306',
            key: 'identify-purpose',
            name: 'Identify Purpose',
            description:
              'In content implemented using markup languages, the purpose of User Interface Components, icons, and regions can be programmatically determined.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '1.4',
        key: 'distinguishable',
        name: 'Distinguishable',
        description:
          'Make it easier for users to see and hear content including separating foreground from background.',
        criteria: [
          {
            number: '1.4.1',
            numberInt: '1401',
            key: 'use-of-color',
            name: 'Use of Color',
            description:
              'Color is not used as the only visual means of conveying information.',
            level: 'A',
          },
          {
            number: '1.4.2',
            numberInt: '1402',
            key: 'audio-control',
            name: 'Audio Control',
            description:
              'If any audio on a Web page plays automatically for more than 3 seconds, a mechanism is available to pause or stop it.',
            level: 'A',
          },
          {
            number: '1.4.3',
            numberInt: '1403',
            key: 'contrast-minimum',
            name: 'Contrast (Minimum)',
            description:
              'All texts must have sufficient colour contrast. Tip: use the Colour Contrast Analyzer to determine the colour contrast.',
            level: 'AA',
          },
          {
            number: '1.4.4',
            numberInt: '1404',
            key: 'resize-text',
            name: 'Resize Text',
            description:
              'Text can be resized without assistive technology up to 200 percent without loss of content or functionality.',
            level: 'AA',
          },
          {
            number: '1.4.5',
            numberInt: '1405',
            key: 'images-of-text',
            name: 'Images of Text',
            description:
              'Images of text are only used for decoration or where a particular presentation of text is essential.',
            level: 'AA',
          },
          {
            number: '1.4.6',
            numberInt: '1406',
            key: 'contrast-enhanced',
            name: 'Contrast (Enhanced)',
            description: 'Use high contrast (minimum 7.0:1) for all text.',
            level: 'AAA',
          },
          {
            number: '1.4.7',
            numberInt: '1407',
            key: 'low-or-no-background-audio',
            name: 'Low or No Background Audio',
            description:
              'For spoken audio, for example in podcasts, it is important that there is no background noise or that it can be turned off.',
            level: 'AAA',
          },
          {
            number: '1.4.8',
            numberInt: '1408',
            key: 'visual-presentation',
            name: 'Visual Presentation',
            description:
              'Allows users to customize the visual settings of text blocks for readability. Users can choose the colors, limit text width to 80 characters, leave text unjustified, set sufficient line and paragraph spacing, and scale text to at least 200% without horizontal scrolling.',
            level: 'AAA',
          },
          {
            number: '1.4.9',
            numberInt: '1409',
            key: 'images-of-text-no-exception',
            name: 'Images of Text (No Exception)',
            description:
              'Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.',
            level: 'AAA',
          },
          {
            number: '1.4.10',
            numberInt: '1410',
            key: 'reflow',
            name: 'Reflow',
            description: 'Content can reflow to fit the screen of the device.',
            level: 'AA',
          },
          {
            number: '1.4.11',
            numberInt: '1411',
            key: 'non-text-contrast',
            name: 'Non-text Contrast',
            description:
              'Graphics and user interface components have distinguishable contrast.',
            level: 'AA',
          },
          {
            number: '1.4.12',
            numberInt: '1412',
            key: 'text-spacing',
            name: 'Text Spacing',
            description: 'Text spacing is adaptable.',
            level: 'AA',
          },
          {
            number: '1.4.13',
            numberInt: '1413',
            key: 'content-on-hover-or-focus',
            name: 'Content on Hover or Focus',
            description:
              'Additional content that appears on hover or focus can be dismissed.',
            level: 'AA',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    key: 'operable',
    name: 'Operable',
    description: 'User interface components and navigation must be operable.',
    guidelines: [
      {
        number: '2.1',
        key: 'keyboard_accessible',
        name: 'Keyboard Accessible',
        description: 'Make all functionality available from a keyboard.',
        criteria: [
          {
            number: '2.1.1',
            numberInt: '2101',
            key: 'keyboard',
            name: 'Keyboard',
            description:
              'All functionality of the content is operable through a keyboard interface.',
            level: 'A',
          },
          {
            number: '2.1.2',
            numberInt: '2102',
            key: 'no-keyboard-trap',
            name: 'No Keyboard Trap',
            description:
              'If keyboard focus can be moved to a component, focus cannot be trapped there.',
            level: 'A',
          },
          {
            number: '2.1.3',
            numberInt: '2103',
            key: 'keyboard-no-exception',
            name: 'Keyboard (No Exception)',
            description:
              'All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.',
            level: 'AAA',
          },
          {
            number: '2.1.4',
            numberInt: '2104',
            key: 'character-key-shortcuts',
            name: 'Character Key Shortcuts',
            description:
              'If a keyboard shortcut is implemented in content, it can be turned off or remapped by the user.',
            level: 'A',
          },
        ],
      },
      {
        number: '2.2',
        key: 'enough_time',
        name: 'Enough Time',
        description: 'Provide users enough time to read and use content.',
        criteria: [
          {
            number: '2.2.1',
            numberInt: '2201',
            key: 'timing-adjustable',
            name: 'Timing Adjustable',
            description:
              'Users can adjust time limits unless not possible or if essential.',
            level: 'A',
          },
          {
            number: '2.2.2',
            numberInt: '2202',
            key: 'pause-stop-hide',
            name: 'Pause, Stop, Hide',
            description:
              'Users have the ability to pause, stop, or hide any moving, blinking, or scrolling information.',
            level: 'A',
          },
          {
            number: '2.2.3',
            numberInt: '2203',
            key: 'no-timing',
            name: 'No Timing',
            description:
              'Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.',
            level: 'AAA',
          },
          {
            number: '2.2.4',
            numberInt: '2204',
            key: 'interruptions',
            name: 'Interruptions',
            description:
              'Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.',
            level: 'AAA',
          },
          {
            number: '2.2.5',
            numberInt: '2205',
            key: 're-authenticating',
            name: 'Re-authenticating',
            description:
              'When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.',
            level: 'AAA',
          },
          {
            number: '2.2.6',
            numberInt: '2206',
            key: 'timeouts',
            name: 'Timeouts',
            description:
              'Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours when the user does not take any actions.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '2.3',
        key: 'seizures_and_physical_reactions',
        name: 'Seizures and Physical Reactions',
        description:
          'Do not design content in a way that is known to cause seizures or physical reactions.',
        criteria: [
          {
            number: '2.3.1',
            numberInt: '2301',
            key: 'three-flashes-or-below-threshold',
            name: 'Three Flashes or Below Threshold',
            description:
              'Content does not contain anything that flashes more than three times in one second.',
            level: 'A',
          },
          {
            number: '2.3.2',
            numberInt: '2302',
            key: 'three-flashes',
            name: 'Three Flashes',
            description:
              'Web pages do not contain anything that flashes more than three times in any one second period.',
            level: 'AAA',
          },
          {
            number: '2.3.3',
            numberInt: '2303',
            key: 'animation-from-interactions',
            name: 'Animation from Interactions',
            description:
              'Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '2.4',
        key: 'navigable',
        name: 'Navigable',
        description:
          'Provide ways to help users navigate, find content, and determine where they are.',
        criteria: [
          {
            number: '2.4.1',
            numberInt: '2401',
            key: 'bypass-blocks',
            name: 'Bypass Blocks',
            description:
              'Mechanisms are available to bypass blocks of content that are repeated on multiple Web pages.',
            level: 'A',
          },
          {
            number: '2.4.2',
            numberInt: '2402',
            key: 'page-titled',
            name: 'Page Titled',
            description:
              'Web pages have titles that describe topic or purpose.',
            level: 'A',
          },
          {
            number: '2.4.3',
            numberInt: '2403',
            key: 'focus-order',
            name: 'Focus Order',
            description:
              'If a Web page can be navigated sequentially, the navigation order can be programmatically determined.',
            level: 'A',
          },
          {
            number: '2.4.4',
            numberInt: '2404',
            key: 'link-purpose-in-context',
            name: 'Link Purpose (In Context)',
            description:
              'The purpose of each link can be determined from the link text alone or its context.',
            level: 'A',
          },
          {
            number: '2.4.5',
            numberInt: '2405',
            key: 'multiple-ways',
            name: 'Multiple Ways',
            description:
              'More than one way is available to locate a Web page within a set of Web pages.',
            level: 'AA',
          },
          {
            number: '2.4.6',
            numberInt: '2406',
            key: 'headings-and-labels',
            name: 'Headings and Labels',
            description: 'Headings and labels describe topic or purpose.',
            level: 'AA',
          },
          {
            number: '2.4.7',
            numberInt: '2407',
            key: 'focus-visible',
            name: 'Focus Visible',
            description:
              'Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.',
            level: 'AA',
          },
          {
            number: '2.4.8',
            numberInt: '2408',
            key: 'location',
            name: 'Location',
            description:
              "Information about the user's location within a set of Web pages is available.",
            level: 'AAA',
          },
          {
            number: '2.4.9',
            numberInt: '2409',
            key: 'link-purpose-link-only',
            name: 'Link Purpose (Link Only)',
            description:
              'The purpose of each link can be determined from the link text alone.',
            level: 'AAA',
          },
          {
            number: '2.4.10',
            numberInt: '2410',
            key: 'section-headings',
            name: 'Section Headings',
            description: 'Section headings are used to organize the content.',
            level: 'AAA',
          },
          {
            number: '2.4.11',
            numberInt: '2411',
            key: 'focus-not-obscured-minimum',
            name: 'Focus not obscured (minimum)',
            description:
              'When the focus is on an interactive component, it should not be covered by other content.',
            level: 'AA',
          },
          {
            number: '2.4.12',
            numberInt: '2412',
            key: 'focus-not-obscured-enhanced',
            name: 'Focus Not Obscured (Enhanced)',
            description:
              'When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.',
            level: 'AAA',
          },
          {
            number: '2.4.13',
            numberInt: '2413',
            key: 'focus-appearance',
            name: 'Focus Appearance',
            description:
              'The focus indicator must be clearly visible, with an area of at least 2 CSS pixels and a 3,0:1 contrast ratio between focused and unfocused states.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '2.5',
        key: 'input_modalities',
        name: 'Input Modalities',
        description:
          'Make it easier for users to operate functionality through various inputs beyond keyboard.',
        criteria: [
          {
            number: '2.5.1',
            numberInt: '2501',
            key: 'pointer-gestures',
            name: 'Pointer Gestures',
            description:
              'Users can operate touch functions with a mouse, assistive technology or with one finger.',
            level: 'A',
          },
          {
            number: '2.5.2',
            numberInt: '2502',
            key: 'pointer-cancellation',
            name: 'Pointer Cancellation',
            description:
              'If you click on something you should be able to cancel it by moving the mouse pointer.',
            level: 'A',
          },
          {
            number: '2.5.3',
            numberInt: '2503',
            key: 'label-in-name',
            name: 'Label in name',
            description:
              'For all interactive elements with visible text, this text is also available in the accessibility name.',
            level: 'A',
          },
          {
            number: '2.5.4',
            numberInt: '2504',
            key: 'motion-actuation',
            name: 'Motion Actuation',
            description:
              'Functionality that is activated by moving the device (e.g. shaking) can be disabled and also controlled in a different way.',
            level: 'A',
          },
          {
            number: '2.5.5',
            numberInt: '2505',
            key: 'target-size',
            name: 'Target Size',
            description:
              'The size of the target for pointer inputs is at least 44 by 44 CSS pixels.',
            level: 'AAA',
          },
          {
            number: '2.5.6',
            numberInt: '2506',
            key: 'concurrent-input-mechanisms',
            name: 'Concurrent Input Mechanisms',
            description:
              'Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.',
            level: 'AAA',
          },
          {
            number: '2.5.7',
            numberInt: '2507',
            key: 'dragging-movements',
            name: 'Dragging Movements',
            description:
              'If you can drag something then there should also be another way to do it with a mouse or finger without dragging.',
            level: 'AA',
          },
          {
            number: '2.5.8',
            numberInt: '2508',
            key: 'target-size-minimum',
            name: 'Target Size (Minimum)',
            description:
              'Prevent problems by making clickable areas, such as links and buttons, large enough.',
            level: 'AA',
          },
        ],
      },
    ],
  },
  {
    id: 3,
    key: 'understandable',
    name: 'Understandable',
    description:
      'Information and the operation of the user interface must be understandable.',
    guidelines: [
      {
        number: '3.1',
        key: 'readable',
        name: 'Readable',
        description: 'Make text content readable and understandable.',
        criteria: [
          {
            number: '3.1.1',
            numberInt: '3101',
            key: 'language-of-page',
            name: 'Language of Page',
            description:
              'Assistive software should be able to determine the language of the page so that, for example, the correct voice and intonation can be used.',
            level: 'A',
          },
          {
            number: '3.1.2',
            numberInt: '3102',
            key: 'language-of-parts',
            name: 'Language of Parts',
            description:
              'The human language of each passage or phrase in the content can be programmatically determined.',
            level: 'AA',
          },
          {
            number: '3.1.3',
            numberInt: '3103',
            key: 'unusual-words',
            name: 'Unusual Words',
            description:
              'A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.',
            level: 'AAA',
          },
          {
            number: '3.1.4',
            numberInt: '3104',
            key: 'abbreviations',
            name: 'Abbreviations',
            description:
              'A mechanism is available for identifying the expanded form or meaning of abbreviations.',
            level: 'AAA',
          },
          {
            number: '3.1.5',
            numberInt: '3105',
            key: 'reading-level',
            name: 'Reading Level',
            description:
              'If text is harder to read than a lower secondary education level, additional or simplified content must be available.',
            level: 'AAA',
          },
          {
            number: '3.1.6',
            numberInt: '3106',
            key: 'pronunciation',
            name: 'Pronunciation',
            description:
              'A mechanism is available to indicate the specific pronunciation of words when meaning is unclear in context without knowing the pronunciation.',
            level: 'AAA',
          },
        ],
      },
      {
        number: '3.2',
        key: 'predictable',
        name: 'Predictable',
        description: 'Make Web pages appear and operate in predictable ways.',
        criteria: [
          {
            number: '3.2.1',
            numberInt: '3201',
            key: 'on-focus',
            name: 'On Focus',
            description:
              'When any component receives focus, it does not initiate a change of context.',
            level: 'A',
          },
          {
            number: '3.2.2',
            numberInt: '3202',
            key: 'on-input',
            name: 'On Input',
            description:
              'Changing the setting of any user interface component does not automatically cause a change of context.',
            level: 'A',
          },
          {
            number: '3.2.3',
            numberInt: '3203',
            key: 'consistent-navigation',
            name: 'Consistent Navigation',
            description:
              'Navigational mechanisms that are repeated are presented in the same relative order each time they are repeated.',
            level: 'AA',
          },
          {
            number: '3.2.4',
            numberInt: '3204',
            key: 'consistent-identification',
            name: 'Consistent Identification',
            description:
              'Components that have the same functionality within a set of Web pages are identified consistently.',
            level: 'AA',
          },
          {
            number: '3.2.5',
            numberInt: '3205',
            key: 'change-on-request',
            name: 'Change on Request',
            description:
              'Changes of context are initiated only by user request or a mechanism is available to turn off such changes.',
            level: 'AAA',
          },
          {
            number: '3.2.6',
            numberInt: '3206',
            key: 'consistent-help',
            name: 'Consistent help',
            description:
              'If help is available on the website it will always be in the same place.',
            level: 'A',
          },
        ],
      },
      {
        number: '3.3',
        key: 'input_assistance',
        name: 'Input Assistance',
        description: 'Help users avoid and correct mistakes.',
        criteria: [
          {
            number: '3.3.1',
            numberInt: '3301',
            key: 'error-identification',
            name: 'Error Identification',
            description:
              'If an input error is detected, it is identified, and the error is described to the user in text.',
            level: 'A',
          },
          {
            number: '3.3.2',
            numberInt: '3302',
            key: 'labels-or-instructions',
            name: 'Labels or Instructions',
            description:
              'Labels or instructions are provided when content requires user input.',
            level: 'A',
          },
          {
            number: '3.3.3',
            numberInt: '3303',
            key: 'error-suggestion',
            name: 'Error Suggestion',
            description:
              'If an input error is detected and suggestions for correction are known, then the suggestions are provided to the user.',
            level: 'AA',
          },
          {
            number: '3.3.4',
            numberInt: '3304',
            key: 'error-prevention-legal-financial-data',
            name: 'Error Prevention (Legal, Financial, Data)',
            description:
              'For Web pages that require user input, elements need to be reviewed.',
            level: 'AA',
          },
          {
            number: '3.3.5',
            numberInt: '3305',
            key: 'help',
            name: 'Help',
            description: 'Context-sensitive help is available.',
            level: 'AAA',
          },
          {
            number: '3.3.6',
            numberInt: '3306',
            key: 'error-prevention-all',
            name: 'Error Prevention (All)',
            description:
              'Users must have the option to undo a form submission, correct errors, or confirm information before final submission.',
            level: 'AAA',
          },
          {
            number: '3.3.7',
            numberInt: '3307',
            key: 'redundant-entry',
            name: 'Redundant Entry',
            description:
              'Avoid having to enter information multiple times in the same process.',
            level: 'A',
          },
          {
            number: '3.3.8',
            numberInt: '3308',
            key: 'accessible-authentication-minimum',
            name: 'Accessible authentication (minimum)',
            description:
              'Do not use a cognitive function test to log in to a web page.',
            level: 'AA',
          },
          {
            number: '3.3.9',
            numberInt: '3309',
            key: 'accessible-authentication-enhanced',
            name: 'Accessible Authentication (Enhanced)',
            description:
              'A cognitive test is only required for authentication if an alternative or assistance to complete the test is available.',
            level: 'AAA',
          },
        ],
      },
    ],
  },
  {
    id: 4,
    key: 'robust',
    name: 'Robust',
    description:
      'Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.',
    guidelines: [
      {
        number: '4.1',
        key: 'compatible',
        name: 'Compatible',
        description:
          'Maximize compatibility with current and future user agents, including assistive technologies.',
        criteria: [
          {
            number: '4.1.1',
            numberInt: '4101',
            key: 'parsing',
            name: 'Parsing',
            description:
              'Content is parsed to ensure proper function without user errors.',
            level: 'A',
          },
          {
            number: '4.1.2',
            numberInt: '4102',
            key: 'name-role-value',
            name: 'Name, Role, Value',
            description:
              'For all user interface components, the name and role can be programmatically determined.',
            level: 'A',
          },
          {
            number: '4.1.3',
            numberInt: '4103',
            key: 'status-messages',
            name: 'Status Messages',
            description:
              'Status messages can be programmatically determined through role or properties.',
            level: 'AA',
          },
        ],
      },
    ],
  },
];
