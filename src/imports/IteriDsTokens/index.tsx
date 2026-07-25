function Badge() {
  return (
    <div className="bg-[#f0fdfa] content-stretch flex items-start px-[12px] py-[4px] relative rounded-[100px] shrink-0" data-name="badge">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[11px] uppercase whitespace-nowrap">Guia de Referência de Design</p>
    </div>
  );
}

function HeaderMeta() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0" data-name="header-meta">
      <Badge />
      <p className="[word-break:break-word] font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[14px] whitespace-nowrap">Versão Oficial 1.0 (2026)</p>
    </div>
  );
}

function LogoRow() {
  return (
    <div className="content-stretch flex gap-[12px] items-baseline relative shrink-0" data-name="logo-row">
      <p className="[word-break:break-word] font-['Outfit:Black',sans-serif] font-black leading-[0] relative shrink-0 text-[#111827] text-[48px] whitespace-nowrap">
        <span className="leading-[normal]">it</span>
        <span className="leading-[normal] text-[#f97316]">e</span>
        <span className="leading-[normal]">ri</span>
      </p>
      <div className="flex items-center justify-center relative shrink-0 size-[14.142px]">
        <div className="flex-none rotate-45">
          <div className="bg-[#0d9488] relative size-[10px]" data-name="logo-accent" />
        </div>
      </div>
      <p className="[word-break:break-word] font-['Outfit:Light',sans-serif] font-light leading-[normal] relative shrink-0 text-[#9ca3af] text-[48px] whitespace-nowrap">Design System</p>
    </div>
  );
}

function BrandHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="brand-header">
      <HeaderMeta />
      <LogoRow />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[1.6] not-italic relative shrink-0 text-[#4b5563] text-[16px] w-[960px]">Documentação de referência técnica e visual para o ecossistema ITERI. Conectando estudantes universitários a oportunidades de renda e crescimento no campus. Esta documentação estabelece as bases de cores, tipografia, espaçamento, arredondamentos e elevação sob o princípio de fundo claro para garantir máxima legibilidade e conformidade de software.</p>
    </div>
  );
}

function Eyebrow() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">01</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1253 1" width="1253">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1253" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">Cores</p>
    </div>
  );
}

function MainSwatchInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[6px] items-start relative shrink-0 w-full" data-name="main-swatch-info">
      <p className="font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[24px] w-full">Teal Elétrico</p>
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#0d9488] text-[16px] w-full">#0D9488</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-full">Identidade principal da marca ITERI. Representa dinamismo, inovação e a conexão acadêmica direta.</p>
    </div>
  );
}

function MainSwatch() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[20px] items-start p-[24px] relative rounded-[16px] shrink-0 w-[400px]" data-name="main-swatch">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="bg-[#0d9488] h-[160px] relative rounded-[8px] shrink-0 w-full" data-name="big-color" />
      <MainSwatchInfo />
    </div>
  );
}

function ScaleInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Teal 50 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#F0FDFA</p>
    </div>
  );
}

function ScaleStepTeal() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-0 p-[12px] right-[576px] rounded-[8px] top-0" data-name="scale-step-Teal 50">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#f0fdfa] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo />
    </div>
  );
}

function ScaleInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Teal 100 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#CCFBF1</p>
    </div>
  );
}

function ScaleStepTeal1() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-[288px] p-[12px] right-[288px] rounded-[8px] top-0" data-name="scale-step-Teal 100">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#ccfbf1] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo1 />
    </div>
  );
}

function ScaleInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Teal 300 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#5EEAD4</p>
    </div>
  );
}

function ScaleStepTeal2() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-[576px] p-[12px] right-0 rounded-[8px] top-0" data-name="scale-step-Teal 300">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#5eead4] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo2 />
    </div>
  );
}

function ScaleInfo3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">{`Teal 500  (Primária)`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#0D9488</p>
    </div>
  );
}

function ScaleStepTeal3() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-0 p-[12px] right-[576px] rounded-[8px] top-[80px]" data-name="scale-step-Teal 500">
      <div aria-hidden className="absolute border border-[#0d9488] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#0d9488] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo3 />
    </div>
  );
}

function ScaleInfo4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Teal 700 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#0F766E</p>
    </div>
  );
}

function ScaleStepTeal4() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-[288px] p-[12px] right-[288px] rounded-[8px] top-[80px]" data-name="scale-step-Teal 700">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#0f766e] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo4 />
    </div>
  );
}

function ScaleInfo5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Teal 900 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#134E4A</p>
    </div>
  );
}

function ScaleStepTeal5() {
  return (
    <div className="absolute bg-white content-stretch flex gap-[16px] items-center left-[576px] p-[12px] right-0 rounded-[8px] top-[80px]" data-name="scale-step-Teal 900">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="bg-[#134e4a] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
      </div>
      <ScaleInfo5 />
    </div>
  );
}

function ScaleGrid() {
  return (
    <div className="flex-[1_0_0] h-[144px] min-w-px relative" data-name="scale-grid">
      <ScaleStepTeal />
      <ScaleStepTeal1 />
      <ScaleStepTeal2 />
      <ScaleStepTeal3 />
      <ScaleStepTeal4 />
      <ScaleStepTeal5 />
    </div>
  );
}

function PrimaryLayout() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="primary-layout">
      <MainSwatch />
      <ScaleGrid />
    </div>
  );
}

function CorPrimaria() {
  return (
    <div className="content-stretch flex flex-col gap-[20px] items-start relative shrink-0 w-full" data-name="cor-primaria">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Cor Primária — Teal Elétrico</p>
      <PrimaryLayout />
    </div>
  );
}

function ScaleInfo6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Coral 50 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FFF7ED</p>
    </div>
  );
}

function ScaleStepCoral() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 50">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fff7ed] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo6 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Coral 100 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FED7AA</p>
    </div>
  );
}

function ScaleStepCoral1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 100">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fed7aa] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo7 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Coral 300 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FDBA74</p>
    </div>
  );
}

function ScaleStepCoral2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 300">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fdba74] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo8 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">{`Coral 500 (Base)  (Primária)`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#F97316</p>
    </div>
  );
}

function ScaleStepCoral500Base() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 500 (Base)">
      <div aria-hidden className="absolute border border-[#0d9488] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#f97316] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo9 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo10() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Coral 700 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#EA580C</p>
    </div>
  );
}

function ScaleStepCoral3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 700">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#ea580c] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo10 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Coral 900 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#9A3412</p>
    </div>
  );
}

function ScaleStepCoral4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Coral 900">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#9a3412] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo11 />
        </div>
      </div>
    </div>
  );
}

function ScaleList() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="scale-list">
      <ScaleStepCoral />
      <ScaleStepCoral1 />
      <ScaleStepCoral2 />
      <ScaleStepCoral500Base />
      <ScaleStepCoral3 />
      <ScaleStepCoral4 />
    </div>
  );
}

function CoralScale() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="coral-scale">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">Coral Vivo</p>
      <ScaleList />
    </div>
  );
}

function ScaleInfo12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Âmbar 50 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FFFBEB</p>
    </div>
  );
}

function ScaleStepAmbar() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 50">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fffbeb] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo12 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo13() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Âmbar 100 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FDE68A</p>
    </div>
  );
}

function ScaleStepAmbar1() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 100">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fde68a] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo13 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo14() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Âmbar 300 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FCD34D</p>
    </div>
  );
}

function ScaleStepAmbar2() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 300">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fcd34d] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo14 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo15() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full whitespace-pre-wrap">{`Âmbar 500 (Base)  (Primária)`}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#FBBF24</p>
    </div>
  );
}

function ScaleStepAmbar500Base() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 500 (Base)">
      <div aria-hidden className="absolute border border-[#0d9488] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#fbbf24] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo15 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo16() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Âmbar 700 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#D97706</p>
    </div>
  );
}

function ScaleStepAmbar3() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 700">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#d97706] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo16 />
        </div>
      </div>
    </div>
  );
}

function ScaleInfo17() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="scale-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[14px] w-full">{`Âmbar 900 `}</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[12px] w-full">#92400E</p>
    </div>
  );
}

function ScaleStepAmbar4() {
  return (
    <div className="bg-white relative rounded-[8px] shrink-0 w-full" data-name="scale-step-Âmbar 900">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center p-[12px] relative size-full">
          <div className="bg-[#92400e] relative rounded-[6px] shrink-0 size-[40px]" data-name="scale-color">
            <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[6px]" />
          </div>
          <ScaleInfo17 />
        </div>
      </div>
    </div>
  );
}

function ScaleList1() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="scale-list">
      <ScaleStepAmbar />
      <ScaleStepAmbar1 />
      <ScaleStepAmbar2 />
      <ScaleStepAmbar500Base />
      <ScaleStepAmbar3 />
      <ScaleStepAmbar4 />
    </div>
  );
}

function AmbarScale() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-start min-w-px relative" data-name="ambar-scale">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#4b5563] text-[16px] whitespace-nowrap">Âmbar Quente</p>
      <ScaleList1 />
    </div>
  );
}

function SecondaryGrids() {
  return (
    <div className="content-stretch flex gap-[32px] items-start relative shrink-0 w-full" data-name="secondary-grids">
      <CoralScale />
      <AmbarScale />
    </div>
  );
}

function CoresSecundarias() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-name="cores-secundarias">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Cores Secundárias</p>
      <SecondaryGrids />
    </div>
  );
}

function SwatchText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Grafite 900</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#111827</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Texto principal</p>
    </div>
  );
}

function SwatchGrafite2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 top-0 w-[308px]" data-name="swatch-Grafite 900">
      <div className="bg-[#111827] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText />
    </div>
  );
}

function SwatchText1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Grafite 800</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#1F2937</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Títulos alternativos</p>
    </div>
  );
}

function SwatchGrafite1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[324px] top-0 w-[308px]" data-name="swatch-Grafite 800">
      <div className="bg-[#1f2937] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText1 />
    </div>
  );
}

function SwatchText2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Grafite 700</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#374151</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Texto secundário escuro</p>
    </div>
  );
}

function SwatchGrafite() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[648px] top-0 w-[308px]" data-name="swatch-Grafite 700">
      <div className="bg-[#374151] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText2 />
    </div>
  );
}

function SwatchText3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 600</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#4B5563</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Corpo de texto</p>
    </div>
  );
}

function SwatchCinza6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[972px] top-0 w-[308px]" data-name="swatch-Cinza 600">
      <div className="bg-[#4b5563] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText3 />
    </div>
  );
}

function SwatchText4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 500</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#6B7280</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Texto de apoio/legenda</p>
    </div>
  );
}

function SwatchCinza5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 top-[182px] w-[308px]" data-name="swatch-Cinza 500">
      <div className="bg-[#6b7280] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText4 />
    </div>
  );
}

function SwatchText5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 400</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#9CA3AF</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Bordas inativas</p>
    </div>
  );
}

function SwatchCinza4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[324px] top-[182px] w-[308px]" data-name="swatch-Cinza 400">
      <div className="bg-[#9ca3af] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText5 />
    </div>
  );
}

function SwatchText6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 300</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#D1D5DB</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Divisores sutis</p>
    </div>
  );
}

function SwatchCinza3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[648px] top-[182px] w-[308px]" data-name="swatch-Cinza 300">
      <div className="bg-[#d1d5db] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText6 />
    </div>
  );
}

function SwatchText7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 200</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#E5E7EB</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Bordas de tabelas</p>
    </div>
  );
}

function SwatchCinza2() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[972px] top-[182px] w-[308px]" data-name="swatch-Cinza 200">
      <div className="bg-[#e5e7eb] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText7 />
    </div>
  );
}

function SwatchText8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 100</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#F3F4F6</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Fundo de inputs</p>
    </div>
  );
}

function SwatchCinza1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-0 top-[364px] w-[308px]" data-name="swatch-Cinza 100">
      <div className="bg-[#f3f4f6] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText8 />
    </div>
  );
}

function SwatchText9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Cinza 50</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#F9FAFB</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Fundo alternativo de página</p>
    </div>
  );
}

function SwatchCinza() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[324px] top-[364px] w-[308px]" data-name="swatch-Cinza 50">
      <div className="bg-[#f9fafb] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText9 />
    </div>
  );
}

function SwatchText10() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Branco</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#FFFFFF</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Fundo principal de página</p>
    </div>
  );
}

function SwatchBranco() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[648px] top-[364px] w-[308px]" data-name="swatch-Branco">
      <div className="bg-white h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText10 />
    </div>
  );
}

function SwatchText11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="swatch-text">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">Off-White</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">#FFFBEB</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic overflow-hidden relative shrink-0 text-[#9ca3af] text-[12px] text-ellipsis w-full whitespace-nowrap">Fundo sutil de destaque</p>
    </div>
  );
}

function SwatchOffWhite() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[12px] items-start left-[972px] top-[364px] w-[308px]" data-name="swatch-Off-White">
      <div className="bg-[#fffbeb] h-[96px] relative rounded-[12px] shrink-0 w-full" data-name="swatch-color">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <SwatchText11 />
    </div>
  );
}

function NeutrosGrid() {
  return (
    <div className="h-[530px] relative shrink-0 w-full" data-name="neutros-grid">
      <SwatchGrafite2 />
      <SwatchGrafite1 />
      <SwatchGrafite />
      <SwatchCinza6 />
      <SwatchCinza5 />
      <SwatchCinza4 />
      <SwatchCinza3 />
      <SwatchCinza2 />
      <SwatchCinza1 />
      <SwatchCinza />
      <SwatchBranco />
      <SwatchOffWhite />
    </div>
  );
}

function NeutrosSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="neutros-section">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Neutros</p>
      <NeutrosGrid />
    </div>
  );
}

function StatusSucesso() {
  return (
    <div className="bg-[#ecfdf5] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-sucesso">
      <div aria-hidden className="absolute border border-[#10b981] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] p-[16px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#10b981] text-[16px] whitespace-nowrap">Sucesso</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#10b981] text-[13px] whitespace-nowrap">BG: #ECFDF5 · Texto: #10B981</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Utilizado para aprovações de vaga e confirmações de candidatura.</p>
      </div>
    </div>
  );
}

function StatusErro() {
  return (
    <div className="bg-[#fef2f2] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-erro">
      <div aria-hidden className="absolute border border-[#ef4444] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] p-[16px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#ef4444] text-[16px] whitespace-nowrap">Erro / Alerta Crítico</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#ef4444] text-[13px] whitespace-nowrap">BG: #FEF2F2 · Texto: #EF4444</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Mensagens de erro no preenchimento de formulário ou rejeições.</p>
      </div>
    </div>
  );
}

function StatusAlerta() {
  return (
    <div className="bg-[#fffbeb] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-alerta">
      <div aria-hidden className="absolute border border-[#f59e0b] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] p-[16px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#f59e0b] text-[16px] whitespace-nowrap">Atenção / Alerta</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#f59e0b] text-[13px] whitespace-nowrap">BG: #FFFBEB · Texto: #F59E0B</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Avisos de prazo de inscrição se encerrando ou pendências de perfil.</p>
      </div>
    </div>
  );
}

function StatusInfo() {
  return (
    <div className="bg-[#eff6ff] flex-[1_0_0] min-w-px relative rounded-[12px]" data-name="status-info">
      <div aria-hidden className="absolute border border-[#3b82f6] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] p-[16px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#3b82f6] text-[16px] whitespace-nowrap">Informação</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#3b82f6] text-[13px] whitespace-nowrap">BG: #EFF6FF · Texto: #3B82F6</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Dicas de preenchimento, orientações de processo e avisos gerais.</p>
      </div>
    </div>
  );
}

function StatusRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="status-row">
      <StatusSucesso />
      <StatusErro />
      <StatusAlerta />
      <StatusInfo />
    </div>
  );
}

function StatusSection() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="status-section">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[20px] whitespace-nowrap">Cores de Status</p>
      <StatusRow />
    </div>
  );
}

function SecaoCores() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-cores">
      <SectionHeader />
      <CorPrimaria />
      <CoresSecundarias />
      <NeutrosSection />
      <StatusSection />
    </div>
  );
}

function Eyebrow1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">02</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1250 1" width="1250">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1250" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader1() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow1 />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">Tipografia</p>
    </div>
  );
}

function SpecCol() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Display</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Outfit Bold / 40px / LH: 48px</p>
    </div>
  );
}

function TypoRowDisplay() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-display">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:Bold',sans-serif] font-bold leading-[48px] min-w-px relative text-[#111827] text-[40px]">Conectando estudantes</p>
    </div>
  );
}

function SpecCol1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Heading 1</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Outfit Semibold / 32px / LH: 40px</p>
    </div>
  );
}

function TypoRowHeading() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-heading 1">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol1 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:SemiBold',sans-serif] font-semibold leading-[40px] min-w-px relative text-[#111827] text-[32px]">Oportunidades Disponíveis</p>
    </div>
  );
}

function SpecCol2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Heading 2</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Outfit Semibold / 24px / LH: 32px</p>
    </div>
  );
}

function TypoRowHeading1() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-heading 2">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol2 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:SemiBold',sans-serif] font-semibold leading-[32px] min-w-px relative text-[#111827] text-[24px]">Monitorias e Pesquisa</p>
    </div>
  );
}

function SpecCol3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Heading 3</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Outfit Medium / 20px / LH: 28px</p>
    </div>
  );
}

function TypoRowHeading2() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-heading 3">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol3 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:Medium',sans-serif] font-medium leading-[28px] min-w-px relative text-[#111827] text-[20px]">Detalhes da Vaga</p>
    </div>
  );
}

function SpecCol4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Heading 4</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Outfit Medium / 18px / LH: 24px</p>
    </div>
  );
}

function TypoRowHeading3() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-heading 4">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol4 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:Medium',sans-serif] font-medium leading-[24px] min-w-px relative text-[#111827] text-[18px]">Informações Gerais</p>
    </div>
  );
}

function SpecCol5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Body Large</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Inter Regular / 18px / LH: 28px</p>
    </div>
  );
}

function TypoRowBodyLarge() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-body large">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol5 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[28px] min-w-px not-italic relative text-[#111827] text-[18px]">Texto de introdução ou destaque em parágrafos de abertura.</p>
    </div>
  );
}

function SpecCol6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Body</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Inter Regular / 16px / LH: 24px</p>
    </div>
  );
}

function TypoRowBody() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-body">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol6 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[24px] min-w-px not-italic relative text-[#111827] text-[16px]">Texto padrão de corpo usado em descrições gerais, parágrafos comuns e feedbacks de formulários.</p>
    </div>
  );
}

function SpecCol7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Body Small</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Inter Regular / 14px / LH: 20px</p>
    </div>
  );
}

function TypoRowBodySmall() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-body small">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol7 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[20px] min-w-px not-italic relative text-[#111827] text-[14px]">Texto secundário para rodapés, termos legais, legendas e pequenas observações de suporte.</p>
    </div>
  );
}

function SpecCol8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Caption</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Inter Medium / 12px / LH: 16px</p>
    </div>
  );
}

function TypoRowCaption() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-caption">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol8 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-w-px not-italic relative text-[#111827] text-[12px]">MONITORIA · ÁLGEBRA LINEAR · R$ 30/H</p>
    </div>
  );
}

function SpecCol9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-[280px]" data-name="spec-col">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[16px] w-full">Overline</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">Inter Bold / 11px / LH: 16px / Letter-spacing: 1px</p>
    </div>
  );
}

function TypoRowOverline() {
  return (
    <div className="content-stretch flex gap-[48px] items-center py-[16px] relative shrink-0 w-full" data-name="typo-row-overline">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <SpecCol9 />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[16px] min-w-px not-italic relative text-[#111827] text-[11px] uppercase">CATEGORIA DA VAGA</p>
    </div>
  );
}

function TypographyCard() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="typography-card">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[16px] items-start p-[32px] relative size-full">
        <TypoRowDisplay />
        <TypoRowHeading />
        <TypoRowHeading1 />
        <TypoRowHeading2 />
        <TypoRowHeading3 />
        <TypoRowBodyLarge />
        <TypoRowBody />
        <TypoRowBodySmall />
        <TypoRowCaption />
        <TypoRowOverline />
      </div>
    </div>
  );
}

function SecaoTipografia() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-tipografia">
      <SectionHeader1 />
      <TypographyCard />
    </div>
  );
}

function Eyebrow2() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">03</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1250 1" width="1250">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1250" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader2() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow2 />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">Espaçamento</p>
    </div>
  );
}

function SpacingLabelBox() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">2XS</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">4px</p>
    </div>
  );
}

function BarContainer() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] relative rounded-[4px] shrink-0 size-[16px]" data-name="spacing-bar" />
    </div>
  );
}

function Spacing2Xs() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-2xs">
      <SpacingLabelBox />
      <BarContainer />
    </div>
  );
}

function SpacingLabelBox1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">XS</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">8px</p>
    </div>
  );
}

function BarContainer1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[32px]" data-name="spacing-bar" />
    </div>
  );
}

function SpacingXs() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-xs">
      <SpacingLabelBox1 />
      <BarContainer1 />
    </div>
  );
}

function SpacingLabelBox2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">SM</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">12px</p>
    </div>
  );
}

function BarContainer2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[48px]" data-name="spacing-bar" />
    </div>
  );
}

function SpacingSm() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-sm">
      <SpacingLabelBox2 />
      <BarContainer2 />
    </div>
  );
}

function SpacingLabelBox3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">MD</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">16px</p>
    </div>
  );
}

function BarContainer3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[64px]" data-name="spacing-bar" />
    </div>
  );
}

function SpacingMd() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-md">
      <SpacingLabelBox3 />
      <BarContainer3 />
    </div>
  );
}

function SpacingLabelBox4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">LG</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">24px</p>
    </div>
  );
}

function BarContainer4() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[96px]" data-name="spacing-bar" />
    </div>
  );
}

function SpacingLg() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-lg">
      <SpacingLabelBox4 />
      <BarContainer4 />
    </div>
  );
}

function SpacingLabelBox5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">32px</p>
    </div>
  );
}

function BarContainer5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[128px]" data-name="spacing-bar" />
    </div>
  );
}

function SpacingXl() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-xl">
      <SpacingLabelBox5 />
      <BarContainer5 />
    </div>
  );
}

function SpacingLabelBox6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">2XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">48px</p>
    </div>
  );
}

function BarContainer6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[192px]" data-name="spacing-bar" />
    </div>
  );
}

function Spacing2Xl() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-2xl">
      <SpacingLabelBox6 />
      <BarContainer6 />
    </div>
  );
}

function SpacingLabelBox7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">3XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">64px</p>
    </div>
  );
}

function BarContainer7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[256px]" data-name="spacing-bar" />
    </div>
  );
}

function Spacing3Xl() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-3xl">
      <SpacingLabelBox7 />
      <BarContainer7 />
    </div>
  );
}

function SpacingLabelBox8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">4XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">80px</p>
    </div>
  );
}

function BarContainer8() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[320px]" data-name="spacing-bar" />
    </div>
  );
}

function Spacing4Xl() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-4xl">
      <SpacingLabelBox8 />
      <BarContainer8 />
    </div>
  );
}

function SpacingLabelBox9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] relative shrink-0 w-[180px]" data-name="spacing-label-box">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px] w-full">5XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px] w-full">96px</p>
    </div>
  );
}

function BarContainer9() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-start min-w-px relative" data-name="bar-container">
      <div className="bg-[#0d9488] h-[16px] relative rounded-[4px] shrink-0 w-[384px]" data-name="spacing-bar" />
    </div>
  );
}

function Spacing5Xl() {
  return (
    <div className="content-stretch flex gap-[32px] items-center relative shrink-0 w-full" data-name="spacing-5xl">
      <SpacingLabelBox9 />
      <BarContainer9 />
    </div>
  );
}

function SpacingCard() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="spacing-card">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[20px] items-start p-[32px] relative size-full">
        <Spacing2Xs />
        <SpacingXs />
        <SpacingSm />
        <SpacingMd />
        <SpacingLg />
        <SpacingXl />
        <Spacing2Xl />
        <Spacing3Xl />
        <Spacing4Xl />
        <Spacing5Xl />
      </div>
    </div>
  );
}

function SecaoEspacamento() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-espacamento">
      <SectionHeader2 />
      <SpacingCard />
    </div>
  );
}

function Eyebrow3() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">04</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1250 1" width="1250">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1250" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader3() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow3 />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">{`Grid & Layout`}</p>
    </div>
  );
}

function SpecItem() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="spec-item">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#6b7280] text-[14px] uppercase w-full">Colunas</p>
      <p className="font-['Outfit:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111827] text-[24px] w-full">12 Colunas</p>
    </div>
  );
}

function SpecItem1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="spec-item">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#6b7280] text-[14px] uppercase w-full">Gutter</p>
      <p className="font-['Outfit:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111827] text-[24px] w-full">24px</p>
    </div>
  );
}

function SpecItem2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="spec-item">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#6b7280] text-[14px] uppercase w-full">Margem Externa</p>
      <p className="font-['Outfit:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111827] text-[24px] w-full">80px (Desktop)</p>
    </div>
  );
}

function SpecItem3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-w-px relative" data-name="spec-item">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#6b7280] text-[14px] uppercase w-full">Container Máximo</p>
      <p className="font-['Outfit:ExtraBold',sans-serif] font-extrabold relative shrink-0 text-[#111827] text-[24px] w-full">1280px</p>
    </div>
  );
}

function GridSpecs() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[32px] items-start leading-[normal] relative shrink-0 w-full" data-name="grid-specs">
      <SpecItem />
      <SpecItem1 />
      <SpecItem2 />
      <SpecItem3 />
    </div>
  );
}

function TableRowHdr() {
  return (
    <div className="content-stretch flex items-start py-[8px] relative shrink-0 w-full" data-name="table-row-hdr">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[14px] w-[200px]">DISPOSITIVO</p>
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[14px] w-[200px]">LARGURA MÍNIMA</p>
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#6b7280] text-[14px] w-[150px]">COLUNAS</p>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] min-w-px relative text-[#6b7280] text-[14px]">MARGENS</p>
    </div>
  );
}

function TableRow() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0 w-full" data-name="table-row-1">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] w-[200px]">Desktop</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[200px]">≥ 1440px</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[150px]">12</p>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#4b5563] text-[14px]">80px margem, 24px gutter</p>
    </div>
  );
}

function TableRow1() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0 w-full" data-name="table-row-2">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] w-[200px]">Laptop</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[200px]">≥ 1024px</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[150px]">12</p>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#4b5563] text-[14px]">48px margem, 20px gutter</p>
    </div>
  );
}

function TableRow2() {
  return (
    <div className="content-stretch flex items-start py-[12px] relative shrink-0 w-full" data-name="table-row-3">
      <div aria-hidden className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] not-italic relative shrink-0 text-[#111827] text-[14px] w-[200px]">Tablet</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[200px]">≥ 768px</p>
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#4b5563] text-[14px] w-[150px]">8</p>
      <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[normal] min-w-px not-italic relative text-[#4b5563] text-[14px]">32px margem, 16px gutter</p>
    </div>
  );
}

function TableRow3() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start leading-[normal] not-italic py-[12px] relative shrink-0 text-[14px] w-full" data-name="table-row-4">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold relative shrink-0 text-[#111827] w-[200px]">Mobile</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4b5563] w-[200px]">≥ 375px</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4b5563] w-[150px]">4</p>
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal min-w-px relative text-[#4b5563]">16px margem, 12px gutter</p>
    </div>
  );
}

function BreakpointsBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="breakpoints-block">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">Breakpoints Recomandados</p>
      <TableRowHdr />
      <TableRow />
      <TableRow1 />
      <TableRow2 />
      <TableRow3 />
    </div>
  );
}

function ColsRow() {
  return (
    <div className="bg-[#f9fafb] h-[80px] relative rounded-[12px] shrink-0 w-full" data-name="cols-row">
      <div className="content-stretch flex gap-[24px] items-start p-[12px] relative size-full">
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-1">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-2">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-3">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-4">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-5">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-6">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-7">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-8">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-9">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-10">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-11">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
        <div className="bg-[rgba(13,148,136,0.1)] flex-[1_0_0] h-full min-w-px relative rounded-[6px]" data-name="grid-col-12">
          <div aria-hidden className="absolute border border-[rgba(13,148,136,0.25)] border-solid inset-0 pointer-events-none rounded-[6px]" />
        </div>
      </div>
    </div>
  );
}

function GridVisualMock() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="grid-visual-mock">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#111827] text-[16px] whitespace-nowrap">Visualização Esquemática de 12 Colunas (Desktop)</p>
      <ColsRow />
    </div>
  );
}

function GridCard() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="grid-card">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex flex-col gap-[24px] items-start p-[32px] relative size-full">
        <GridSpecs />
        <div className="h-0 relative shrink-0 w-full" data-name="grid-divider">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1216 1" width="1216">
              <line id="grid-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1216" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <BreakpointsBlock />
        <div className="h-0 relative shrink-0 w-full" data-name="grid-divider-2">
          <div className="absolute inset-[-1px_0_0_0]">
            <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1216 1" width="1216">
              <line id="grid-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1216" y1="0.5" y2="0.5" />
            </svg>
          </div>
        </div>
        <GridVisualMock />
      </div>
    </div>
  );
}

function SecaoGrid() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-grid">
      <SectionHeader3 />
      <GridCard />
    </div>
  );
}

function Eyebrow4() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">05</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1250 1" width="1250">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1250" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader4() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow4 />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">Arredondamento (Border Radius)</p>
    </div>
  );
}

function RadiusInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">None</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">{`0px `}</p>
    </div>
  );
}

function RadiusNone() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-None">
      <div className="bg-[#f9fafb] h-[100px] relative shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none" />
      </div>
      <RadiusInfo />
    </div>
  );
}

function RadiusInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">Small</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">{`4px `}</p>
    </div>
  );
}

function RadiusSmall() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-Small">
      <div className="bg-[#f9fafb] h-[100px] relative rounded-[4px] shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[4px]" />
      </div>
      <RadiusInfo1 />
    </div>
  );
}

function RadiusInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">Medium</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">{`8px `}</p>
    </div>
  );
}

function RadiusMedium() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-Medium">
      <div className="bg-[#f9fafb] h-[100px] relative rounded-[8px] shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[8px]" />
      </div>
      <RadiusInfo2 />
    </div>
  );
}

function RadiusInfo3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">Large</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">{`12px `}</p>
    </div>
  );
}

function RadiusLarge() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-Large">
      <div className="bg-[#f9fafb] h-[100px] relative rounded-[12px] shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      </div>
      <RadiusInfo3 />
    </div>
  );
}

function RadiusInfo4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">XL</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">{`16px `}</p>
    </div>
  );
}

function RadiusXl() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-XL">
      <div className="bg-[#f9fafb] h-[100px] relative rounded-[16px] shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      </div>
      <RadiusInfo4 />
    </div>
  );
}

function RadiusInfo5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[2px] items-center leading-[normal] relative shrink-0 whitespace-nowrap" data-name="radius-info">
      <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[15px]">Full</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal not-italic relative shrink-0 text-[#6b7280] text-[13px]">9999px (Pílula)</p>
    </div>
  );
}

function RadiusFull() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[12px] items-center min-w-px relative" data-name="radius-Full">
      <div className="bg-[#f9fafb] h-[100px] relative rounded-[9999px] shrink-0 w-full" data-name="radius-visual">
        <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      </div>
      <RadiusInfo5 />
    </div>
  );
}

function RadiusCard() {
  return (
    <div className="bg-white relative rounded-[16px] shrink-0 w-full" data-name="radius-card">
      <div aria-hidden className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="content-stretch flex gap-[24px] items-start p-[32px] relative size-full">
        <RadiusNone />
        <RadiusSmall />
        <RadiusMedium />
        <RadiusLarge />
        <RadiusXl />
        <RadiusFull />
      </div>
    </div>
  );
}

function SecaoArredondamento() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-arredondamento">
      <SectionHeader4 />
      <RadiusCard />
    </div>
  );
}

function Eyebrow5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="eyebrow">
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[14px] uppercase whitespace-nowrap">06</p>
      <div className="flex-[1_0_0] h-0 min-w-px relative" data-name="header-divider">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1250 1" width="1250">
            <line id="header-divider" stroke="var(--stroke-0, #E5E7EB)" x2="1250" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SectionHeader5() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="section-header">
      <Eyebrow5 />
      <p className="[word-break:break-word] font-['Outfit:ExtraBold',sans-serif] font-extrabold leading-[normal] relative shrink-0 text-[#111827] text-[32px] w-full">Elevação (Shadows)</p>
    </div>
  );
}

function ShadowCard() {
  return (
    <div className="bg-white drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="shadow-card-0">
      <div aria-hidden className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] p-[24px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Shadow SM</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content]">0px 1px 2px rgba(0,0,0,0.05)</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Ideal para layouts de cards sutilmente elevados e menus dropdown.</p>
      </div>
    </div>
  );
}

function ShadowCard1() {
  return (
    <div className="bg-white drop-shadow-[0px_4px_3px_rgba(0,0,0,0.07)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="shadow-card-1">
      <div aria-hidden className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] p-[24px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Shadow MD</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content]">0px 4px 6px rgba(0,0,0,0.07)</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Ideal para layouts de cards sutilmente elevados e menus dropdown.</p>
      </div>
    </div>
  );
}

function ShadowCard2() {
  return (
    <div className="bg-white drop-shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="shadow-card-2">
      <div aria-hidden className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] p-[24px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Shadow LG</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content]">0px 10px 15px rgba(0,0,0,0.1)</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Ideal para layouts de cards sutilmente elevados e menus dropdown.</p>
      </div>
    </div>
  );
}

function ShadowCard3() {
  return (
    <div className="bg-white drop-shadow-[0px_20px_12.5px_rgba(0,0,0,0.1)] flex-[1_0_0] min-w-px relative rounded-[16px]" data-name="shadow-card-3">
      <div aria-hidden className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] p-[24px] relative size-full">
        <p className="font-['Outfit:Bold',sans-serif] font-bold relative shrink-0 text-[#111827] text-[18px] whitespace-nowrap">Shadow XL</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#6b7280] text-[13px] w-[min-content]">0px 20px 25px rgba(0,0,0,0.1)</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal min-w-full not-italic relative shrink-0 text-[#4b5563] text-[13px] w-[min-content]">Ideal para layouts de cards sutilmente elevados e menus dropdown.</p>
      </div>
    </div>
  );
}

function ShadowsRow() {
  return (
    <div className="content-stretch flex gap-[24px] items-start relative shrink-0 w-full" data-name="shadows-row">
      <ShadowCard />
      <ShadowCard1 />
      <ShadowCard2 />
      <ShadowCard3 />
    </div>
  );
}

function SecaoSombras() {
  return (
    <div className="content-stretch flex flex-col gap-[40px] items-start relative shrink-0 w-full" data-name="secao-sombras">
      <SectionHeader5 />
      <ShadowsRow />
    </div>
  );
}

function GuideFooter() {
  return (
    <div className="content-stretch flex items-center justify-between pt-[24px] relative shrink-0 w-full" data-name="guide-footer">
      <div aria-hidden className="absolute border-[#e5e7eb] border-solid border-t inset-0 pointer-events-none" />
      <p className="[word-break:break-word] font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#6b7280] text-[13px] whitespace-nowrap">Manual de Diretrizes de Marca ITERI © 2026. Todos os direitos reservados.</p>
      <p className="[word-break:break-word] font-['Outfit:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#0d9488] text-[13px] whitespace-nowrap">{`Teal & Coral — Minimalismo Acadêmico`}</p>
    </div>
  );
}

export default function IteriDsTokens() {
  return (
    <div className="bg-[#f9fafb] content-stretch flex flex-col gap-[80px] items-start p-[80px] relative size-full" data-name="iteri-ds-tokens">
      <BrandHeader />
      <SecaoCores />
      <SecaoTipografia />
      <SecaoEspacamento />
      <SecaoGrid />
      <SecaoArredondamento />
      <SecaoSombras />
      <GuideFooter />
    </div>
  );
}