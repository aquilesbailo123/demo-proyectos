import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateProjectData, ValueProposition, FundsUsage, KeyMetric, ProjectMember } from '@/hooks/useProject';

export interface ProjectCreationState {
  currentStage: number;
  
  // Stage 1: Identidad del Proyecto
  name: string;
  slogan: string;
  resumen_ejecutivo: string;
  industry_id: number | null;
  logo: string;
  website: string;
  twitter: string;
  linkedin: string;
  
  // Stage 2: Propuesta de Valor
  value_proposition: ValueProposition;
  
  // Stage 3: El Equipo
  equipo: Omit<ProjectMember, 'id' | 'created' | 'updated'>[];
  
  // Stage 4: Financiamiento
  objective_amount: string;
  financing_type_id: number | null;
  funds_usage: FundsUsage;
  end_date: string;
  
  // Stage 5: Tracción y Validación
  etapa_actual: string;
  usuarios_activos: number | null;
  ingresos_mensuales: string;
  numero_clientes: number | null;
  tamano_comunidad: number | null;
  documento_traccion: string;
  
  // Stage 6: Impacto y Sostenibilidad
  relevant_sdg: string[];
  metricas_clave: Omit<KeyMetric, 'id' | 'created' | 'updated'>[];
  
  // Stage 7: Documentación Legal
  acta_constitutiva: string;
  identificacion_representante: string;
  whitepaper: string;
  cap_table: string;
}

interface ProjectStoreActions {
  setCurrentStage: (stage: number) => void;
  updateProjectData: (data: Partial<ProjectCreationState>) => void;
  resetProject: () => void;
  getProjectData: () => CreateProjectData;
  validateStage: (stage: number) => boolean;
  addTeamMember: (member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => void;
  updateTeamMember: (index: number, member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => void;
  removeTeamMember: (index: number) => void;
  addKeyMetric: (metric: Omit<KeyMetric, 'id' | 'created' | 'updated'>) => void;
  updateKeyMetric: (index: number, metric: Omit<KeyMetric, 'id' | 'created' | 'updated'>) => void;
  removeKeyMetric: (index: number) => void;
}

const initialState: ProjectCreationState = {
  currentStage: 1,
  
  // Stage 1
  name: '',
  slogan: '',
  resumen_ejecutivo: '',
  industry_id: null,
  logo: '',
  website: '',
  twitter: '',
  linkedin: '',
  
  // Stage 2
  value_proposition: {
    problema: '',
    solucion: '',
    propuesta_unica_valor: '',
    modelo_negocio: ''
  },
  
  // Stage 3
  equipo: [],
  
  // Stage 4
  objective_amount: '',
  financing_type_id: null,
  funds_usage: {
    desarrollo_producto: 0,
    marketing_ventas: 0,
    expansion_operaciones: 0,
    gastos_operativos: 0
  },
  end_date: '',
  
  // Stage 5
  etapa_actual: '',
  usuarios_activos: null,
  ingresos_mensuales: '',
  numero_clientes: null,
  tamano_comunidad: null,
  documento_traccion: '',
  
  // Stage 6
  relevant_sdg: [],
  metricas_clave: [],
  
  // Stage 7
  acta_constitutiva: '',
  identificacion_representante: '',
  whitepaper: '',
  cap_table: ''
};

export const useProjectStore = create<ProjectCreationState & ProjectStoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setCurrentStage: (stage: number) => set({ currentStage: stage }),
      
      updateProjectData: (data: Partial<ProjectCreationState>) => set((state) => ({ ...state, ...data })),
      
      resetProject: () => set(initialState),
      
      getProjectData: (): CreateProjectData => {
        const state = get();
        return {
          name: state.name,
          slogan: state.slogan,
          resumen_ejecutivo: state.resumen_ejecutivo,
          industry_id: state.industry_id || 0,
          financing_type_id: state.financing_type_id || 0,
          logo: state.logo,
          website: state.website,
          twitter: state.twitter,
          linkedin: state.linkedin,
          value_proposition: state.value_proposition,
          equipo: state.equipo,
          objective_amount: state.objective_amount,
          funds_usage: state.funds_usage,
          end_date: state.end_date,
          etapa_actual: state.etapa_actual,
          usuarios_activos: state.usuarios_activos ?? undefined,
          ingresos_mensuales: state.ingresos_mensuales,
          numero_clientes: state.numero_clientes ?? undefined,
          tamano_comunidad: state.tamano_comunidad ?? undefined,
          documento_traccion: state.documento_traccion,
          relevant_sdg: state.relevant_sdg,
          metricas_clave: state.metricas_clave,
          acta_constitutiva: state.acta_constitutiva,
          identificacion_representante: state.identificacion_representante,
          whitepaper: state.whitepaper,
          cap_table: state.cap_table
        };
      },
      
      validateStage: (stage: number): boolean => {
        const state = get();
        
        switch (stage) {
          case 1:
            return !!(state.name && state.slogan && state.resumen_ejecutivo && state.industry_id);
          case 2:
            return !!(state.value_proposition.problema && state.value_proposition.solucion && 
                     state.value_proposition.propuesta_unica_valor && state.value_proposition.modelo_negocio);
          case 3:
            return state.equipo.length > 0 && state.equipo.every(member => member.name);
          case 4:
            return !!(state.objective_amount && state.financing_type_id && state.end_date &&
                     Math.abs(Object.values(state.funds_usage).reduce((a, b) => a + b, 0) - 1) < 0.01);
          case 5:
            return !!(state.etapa_actual);
          case 6:
            return state.relevant_sdg.length > 0;
          case 7:
            return state.relevant_sdg.length > 0; // Legal documents are optional
          default:
            return false;
        }
      },
      
      addTeamMember: (member) => set((state) => ({
        equipo: [...state.equipo, member]
      })),
      
      updateTeamMember: (index, member) => set((state) => ({
        equipo: state.equipo.map((m, i) => i === index ? member : m)
      })),
      
      removeTeamMember: (index) => set((state) => ({
        equipo: state.equipo.filter((_, i) => i !== index)
      })),
      
      addKeyMetric: (metric) => set((state) => ({
        metricas_clave: [...state.metricas_clave, metric]
      })),
      
      updateKeyMetric: (index, metric) => set((state) => ({
        metricas_clave: state.metricas_clave.map((m, i) => i === index ? metric : m)
      })),
      
      removeKeyMetric: (index) => set((state) => ({
        metricas_clave: state.metricas_clave.filter((_, i) => i !== index)
      }))
    }),
    {
      name: 'project-creation-storage',
      partialize: (state) => ({
        currentStage: state.currentStage,
        name: state.name,
        slogan: state.slogan,
        resumen_ejecutivo: state.resumen_ejecutivo,
        industry_id: state.industry_id,
        logo: state.logo,
        website: state.website,
        twitter: state.twitter,
        linkedin: state.linkedin,
        value_proposition: state.value_proposition,
        equipo: state.equipo,
        objective_amount: state.objective_amount,
        financing_type_id: state.financing_type_id,
        funds_usage: state.funds_usage,
        end_date: state.end_date,
        etapa_actual: state.etapa_actual,
        usuarios_activos: state.usuarios_activos,
        ingresos_mensuales: state.ingresos_mensuales,
        numero_clientes: state.numero_clientes,
        tamano_comunidad: state.tamano_comunidad,
        documento_traccion: state.documento_traccion,
        relevant_sdg: state.relevant_sdg,
        metricas_clave: state.metricas_clave,
        acta_constitutiva: state.acta_constitutiva,
        identificacion_representante: state.identificacion_representante,
        whitepaper: state.whitepaper,
        cap_table: state.cap_table
      })
    }
  )
);
