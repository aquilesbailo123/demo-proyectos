import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CreateProjectData, ValueProposition, FundsUsage, KeyMetric, ProjectMember } from '@/hooks/useProject';

// Serializable file representation for persistence
interface SerializableFile {
  name: string;
  type: string;
  size: number;
  lastModified: number;
  data: string; // Base64 encoded file data
}

export interface ProjectCreationState {
  currentStage: number;
  
  // Stage 1: Identidad del Proyecto
  name: string;
  slogan: string;
  resumen_ejecutivo: string;
  industry_id: number | null;
  logo: File | null;
  website: string;
  twitter: string;
  linkedin: string;
  
  // Stage 2: Propuesta de Valor
  value_proposition: ValueProposition;
  
  // Stage 3: El Equipo
  equipo: Omit<ProjectMember, 'id' | 'created' | 'updated'>[];
  memberPhotos: { [key: number]: File };
  
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
  documento_traccion: File | null;
  
  // Stage 6: Impacto y Sostenibilidad
  relevant_sdg: string[];
  metricas_clave: Omit<KeyMetric, 'id' | 'created' | 'updated'>[];
  
  // Stage 7: Documentación Legal
  acta_constitutiva: File | null;
  identificacion_representante: File | null;
  whitepaper: File | null;
  cap_table: File | null;
}

interface ProjectStoreActions {
  setCurrentStage: (stage: number) => void;
  updateProject: (data: Partial<ProjectCreationState>) => void;
  addMember: (member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => void;
  updateMember: (index: number, member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => void;
  removeMember: (index: number) => void;
  setMemberPhoto: (index: number, file: File | null) => void;
  addMetric: (metric: KeyMetric) => void;
  updateMetric: (index: number, metric: KeyMetric) => void;
  removeMetric: (index: number) => void;
  getProjectData: () => CreateProjectData;
  getProjectFiles: () => { logo: File | null; documento_traccion: File | null; acta_constitutiva: File | null; identificacion_representante: File | null; whitepaper: File | null; cap_table: File | null; };
  getMemberPhotos: () => { [key: number]: File };
  validateStage: (stage: number) => boolean;
  resetProject: () => void;
}

const initialState: ProjectCreationState = {
  currentStage: 1,
  
  // Stage 1
  name: '',
  slogan: '',
  resumen_ejecutivo: '',
  industry_id: null,
  logo: null,
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
  memberPhotos: {},
  
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
  documento_traccion: null,
  
  // Stage 6
  relevant_sdg: [],
  metricas_clave: [],
  
  // Stage 7
  acta_constitutiva: null,
  identificacion_representante: null,
  whitepaper: null,
  cap_table: null
};

// File conversion utilities
const fileToSerializable = async (file: File): Promise<SerializableFile> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
        data: reader.result as string
      });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const serializableToFile = (serializable: SerializableFile): File => {
  // Convert base64 back to blob
  const byteCharacters = atob(serializable.data.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: serializable.type });
  
  return new File([blob], serializable.name, {
    type: serializable.type,
    lastModified: serializable.lastModified
  });
};

export const useProjectStore = create<ProjectCreationState & ProjectStoreActions>()(
  persist(
    (set, get) => ({
      ...initialState,
      
      setCurrentStage: (stage: number) => set({ currentStage: stage }),
      
      updateProject: (data: Partial<ProjectCreationState>) => set((state) => ({ ...state, ...data })),
      
      addMember: (member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => {
        set((state) => ({
          equipo: [...state.equipo, member]
        }));
      },

      updateMember: (index: number, member: Omit<ProjectMember, 'id' | 'created' | 'updated'>) => {
        set((state) => ({
          equipo: state.equipo.map((m, i) => i === index ? member : m)
        }));
      },

      removeMember: (index: number) => {
        set((state) => {
          const newMemberPhotos = { ...state.memberPhotos };
          delete newMemberPhotos[index];
          
          // Reindex photos for remaining members
          const reindexedPhotos: { [key: number]: File } = {};
          Object.entries(newMemberPhotos).forEach(([key, file]) => {
            const oldIndex = parseInt(key);
            if (oldIndex > index) {
              reindexedPhotos[oldIndex - 1] = file;
            } else {
              reindexedPhotos[oldIndex] = file;
            }
          });

          return {
            equipo: state.equipo.filter((_, i) => i !== index),
            memberPhotos: reindexedPhotos
          };
        });
      },

      setMemberPhoto: (index: number, file: File | null) => {
        set((state) => {
          const newMemberPhotos = { ...state.memberPhotos };
          if (file) {
            newMemberPhotos[index] = file;
          } else {
            delete newMemberPhotos[index];
          }
          return { memberPhotos: newMemberPhotos };
        });
      },
      addMetric: (metric: KeyMetric) => set((state) => ({
        metricas_clave: [...state.metricas_clave, metric]
      })),
      
      updateMetric: (index: number, metric: KeyMetric) => set((state) => ({
        metricas_clave: state.metricas_clave.map((m, i) => i === index ? metric : m)
      })),
      
      removeMetric: (index: number) => set((state) => ({
        metricas_clave: state.metricas_clave.filter((_, i) => i !== index)
      })),
      
      resetProject: () => set({ ...initialState, memberPhotos: {} }),
      
      getProjectData: () => {
        const state = get();
        return {
          name: state.name,
          slogan: state.slogan,
          resumen_ejecutivo: state.resumen_ejecutivo,
          industry_id: state.industry_id || 0,
          financing_type_id: state.financing_type_id || 0,
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
          relevant_sdg: state.relevant_sdg,
          metricas_clave: state.metricas_clave
        };
      },

      getProjectFiles: () => {
        const state = get();
        return {
          logo: state.logo,
          documento_traccion: state.documento_traccion,
          acta_constitutiva: state.acta_constitutiva,
          identificacion_representante: state.identificacion_representante,
          whitepaper: state.whitepaper,
          cap_table: state.cap_table
        };
      },

      getMemberPhotos: () => {
        const state = get();
        return state.memberPhotos;
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
            return !!(state.etapa_actual && state.usuarios_activos && state.ingresos_mensuales && state.numero_clientes && state.tamano_comunidad);
          case 6:
            return state.relevant_sdg.length > 0;
          case 7:
            return !!(state.acta_constitutiva && state.identificacion_representante);
          default:
            return false;
        }
      },
      
      
      removeKeyMetric: (index: number) => set((state) => ({
        metricas_clave: state.metricas_clave.filter((_, i) => i !== index)
      }))
    }),
    {
      name: 'project-creation-storage',
      storage: {
        getItem: async (name: string) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          
          const data = JSON.parse(str);
          
          // Convert serialized files back to File objects
          const fileFields = ['logo', 'documento_traccion', 'acta_constitutiva', 'identificacion_representante', 'whitepaper', 'cap_table'];
          for (const field of fileFields) {
            if (data.state[field] && typeof data.state[field] === 'object' && data.state[field].data) {
              data.state[field] = serializableToFile(data.state[field]);
            }
          }
          
          // Convert member photos back to File objects
          if (data.state.memberPhotos) {
            const memberPhotos: { [key: number]: File } = {};
            for (const [index, serializedFile] of Object.entries(data.state.memberPhotos)) {
              if (serializedFile && typeof serializedFile === 'object' && (serializedFile as any).data) {
                memberPhotos[parseInt(index)] = serializableToFile(serializedFile as SerializableFile);
              }
            }
            data.state.memberPhotos = memberPhotos;
          }
          
          return data;
        },
        setItem: async (name: string, value: any) => {
          const data = { ...value };
          
          // Convert File objects to serializable format
          const fileFields = ['logo', 'documento_traccion', 'acta_constitutiva', 'identificacion_representante', 'whitepaper', 'cap_table'];
          for (const field of fileFields) {
            if (data.state[field] instanceof File) {
              data.state[field] = await fileToSerializable(data.state[field]);
            }
          }
          
          // Convert member photo Files to serializable format
          if (data.state.memberPhotos) {
            const serializedMemberPhotos: { [key: number]: SerializableFile } = {};
            for (const [index, file] of Object.entries(data.state.memberPhotos)) {
              if (file instanceof File) {
                serializedMemberPhotos[parseInt(index)] = await fileToSerializable(file);
              }
            }
            data.state.memberPhotos = serializedMemberPhotos;
          }
          
          localStorage.setItem(name, JSON.stringify(data));
        },
        removeItem: (name: string) => {
          localStorage.removeItem(name);
        }
      }
    }
  )
);
